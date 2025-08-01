<template>
  <div ref="containerRef" class="w-full h-full relative" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch, useTemplateRef } from 'vue';
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';
import type { OGLRenderingContext } from 'ogl';

interface Props {
  color?: [number, number, number];
  amplitude?: number;
  distance?: number;
  enableMouseInteraction?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  color: () => [1, 1, 1] as [number, number, number],
  amplitude: 1,
  distance: 0,
  enableMouseInteraction: false
});

const containerRef = useTemplateRef<HTMLDivElement>('containerRef');

let renderer: Renderer | null = null;
let gl: OGLRenderingContext | null = null;
let program: Program | null = null;
let mesh: Mesh | null = null;
let animationId: number | null = null;
let currentMouse = [0.5, 0.5];
let targetMouse = [0.5, 0.5];

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec3 iResolution;
uniform vec3 uColor;
uniform float uAmplitude;
uniform float uDistance;
uniform vec2 uMouse;

#define PI 3.1415926538

const int u_line_count = 40;
const float u_line_width = 7.0;
const float u_line_blur = 10.0;

float Perlin2D(vec2 P) {
    vec2 Pi = floor(P);
    vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
    vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
    Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
    Pt += vec2(26.0, 161.0).xyxy;
    Pt *= Pt;
    Pt = Pt.xzxz * Pt.yyww;
    vec4 hash_x = fract(Pt * (1.0 / 951.135664));
    vec4 hash_y = fract(Pt * (1.0 / 642.949883));
    vec4 grad_x = hash_x - 0.49999;
    vec4 grad_y = hash_y - 0.49999;
    vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
        * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
    grad_results *= 1.4142135623730950;
    vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
               * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
    vec4 blend2 = vec4(blend, vec2(1.0 - blend));
    return dot(grad_results, blend2.zxzx * blend2.wwyy);
}

float pixel(float count, vec2 resolution) {
    return (1.0 / max(resolution.x, resolution.y)) * count;
}

float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance) {
    float split_offset = (perc * 0.4);
    float split_point = 0.1 + split_offset;

    float amplitude_normal = smoothstep(split_point, 0.7, st.x);
    float amplitude_strength = 0.5;
    float finalAmplitude = amplitude_normal * amplitude_strength
                           * amplitude * (1.0 + (mouse.y - 0.5) * 0.2);

    float time_scaled = time / 10.0 + (mouse.x - 0.5) * 1.0;
    float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc;

    float xnoise = mix(
        Perlin2D(vec2(time_scaled, st.x + perc) * 2.5),
        Perlin2D(vec2(time_scaled, st.x + time_scaled) * 3.5) / 1.5,
        st.x * 0.3
    );

    float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

    float line_start = smoothstep(
        y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        y,
        st.y
    );

    float line_end = smoothstep(
        y,
        y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
        st.y
    );

    return clamp(
        (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
        0.0,
        1.0
    );
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;

    float line_strength = 1.0;
    for (int i = 0; i < u_line_count; i++) {
        float p = float(i) / float(u_line_count);
        line_strength *= (1.0 - lineFn(
            uv,
            u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p),
            p,
            (PI * 1.0) * p,
            uMouse,
            iTime,
            uAmplitude,
            uDistance
        ));
    }

    float colorVal = 1.0 - line_strength;
    fragColor = vec4(uColor * colorVal, colorVal);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

const resize = () => {
  if (!containerRef.value || !renderer || !program) return;

  const container = containerRef.value;
  const { clientWidth, clientHeight } = container;
  renderer.setSize(clientWidth, clientHeight);
  program.uniforms.iResolution.value.r = clientWidth;
  program.uniforms.iResolution.value.g = clientHeight;
  program.uniforms.iResolution.value.b = clientWidth / clientHeight;
};

const handleMouseMove = (e: MouseEvent) => {
  if (!containerRef.value) return;

  const rect = containerRef.value.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = 1.0 - (e.clientY - rect.top) / rect.height;
  targetMouse = [x, y];
};

const handleMouseLeave = () => {
  targetMouse = [0.5, 0.5];
};

const update = (t: number) => {
  if (!program || !renderer || !mesh) return;

  if (props.enableMouseInteraction) {
    const smoothing = 0.05;
    currentMouse[0] += smoothing * (targetMouse[0] - currentMouse[0]);
    currentMouse[1] += smoothing * (targetMouse[1] - currentMouse[1]);
    program.uniforms.uMouse.value[0] = currentMouse[0];
    program.uniforms.uMouse.value[1] = currentMouse[1];
  } else {
    program.uniforms.uMouse.value[0] = 0.5;
    program.uniforms.uMouse.value[1] = 0.5;
  }

  program.uniforms.iTime.value = t * 0.001;
  renderer.render({ scene: mesh });
  animationId = requestAnimationFrame(update);
};

const initializeScene = () => {
  if (!containerRef.value) return;

  cleanup();

  const container = containerRef.value;
  renderer = new Renderer({ alpha: true });
  gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  const geometry = new Triangle(gl);
  program = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    uniforms: {
      iTime: { value: 0 },
      iResolution: {
        value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
      },
      uColor: { value: new Color(...props.color) },
      uAmplitude: { value: props.amplitude },
      uDistance: { value: props.distance },
      uMouse: { value: new Float32Array([0.5, 0.5]) }
    }
  });

  mesh = new Mesh(gl, { geometry, program });

  const canvas = gl.canvas as HTMLCanvasElement;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';

  container.appendChild(canvas);

  window.addEventListener('resize', resize);
  if (props.enableMouseInteraction) {
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
  }

  resize();
  animationId = requestAnimationFrame(update);
};

const cleanup = () => {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  window.removeEventListener('resize', resize);

  if (containerRef.value) {
    containerRef.value.removeEventListener('mousemove', handleMouseMove);
    containerRef.value.removeEventListener('mouseleave', handleMouseLeave);

    const canvas = containerRef.value.querySelector('canvas');
    if (canvas) {
      containerRef.value.removeChild(canvas);
    }
  }

  if (gl) {
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  }

  renderer = null;
  gl = null;
  program = null;
  mesh = null;
  currentMouse = [0.5, 0.5];
  targetMouse = [0.5, 0.5];
};

onMounted(() => {
  initializeScene();
});

onUnmounted(() => {
  cleanup();
});

watch(
  [() => props.color, () => props.amplitude, () => props.distance, () => props.enableMouseInteraction],
  () => {
    initializeScene();
  },
  { deep: true }
);
</script>
