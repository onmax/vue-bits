<template>
  <div
    v-if="!isMobile"
    ref="containerRef"
    :style="{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      width: '100vw',
      height: '100vh'
    }"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, useTemplateRef } from 'vue';
import { Renderer, Camera, Transform, Program, Mesh, Geometry } from 'ogl';

interface Props {
  xOffset?: number;
  yOffset?: number;
  rotationDeg?: number;
  focalLength?: number;
  speed1?: number;
  speed2?: number;
  dir2?: number;
  bend1?: number;
  bend2?: number;
  fadeInDuration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  xOffset: 0,
  yOffset: 0,
  rotationDeg: 0,
  focalLength: 0.8,
  speed1: 0.1,
  speed2: 0.1,
  dir2: 1.0,
  bend1: 0.9,
  bend2: 0.6,
  fadeInDuration: 2000
});

const vertex = /* glsl */ `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = /* glsl */ `
precision mediump float;
uniform float iTime;
uniform vec2  iResolution;
uniform vec2  uOffset;
uniform float uRotation;
uniform float focalLength;
uniform float speed1;
uniform float speed2;
uniform float dir2;
uniform float bend1;
uniform float bend2;
uniform float bendAdj1;
uniform float bendAdj2;
uniform float uOpacity;

const float lt   = 0.05;
const float pi   = 3.141592653589793;
const float pi2  = pi * 2.0;
const float pi_2 = pi * 0.5;
#define MAX_STEPS 15
#define A(v) mat2(cos(m.v + radians(vec4(0.0,-90.0,90.0,0.0))))

void mainImage(out vec4 C, in vec2 U) {
  float t = iTime * pi;
  float s = 1.0;
  float d = 0.0;
  vec2  R = iResolution;
  vec2  m = vec2(0.0);

  vec3 o = vec3(0.0, 0.0, -7.0);
  vec3 u = normalize(vec3((U - 0.5 * R) / R.y, focalLength));
  vec3 k = vec3(0.0);
  vec3 p;

  mat2 v = A(y), h = A(x);

  float t1 = t * 0.7;
  float t2 = t * 0.9;
  float tSpeed1 = t * speed1;
  float tSpeed2 = t * speed2 * dir2;

  for (int step = 0; step < MAX_STEPS; ++step) {
    p = o + u * d;
    p.yz *= v;
    p.xz *= h;
    p.x  -= 15.0;

    float px = p.x;
    float wob1 = bend1 + bendAdj1 + sin(t1 + px * 0.8) * 0.1;
    float wob2 = bend2 + bendAdj2 + cos(t2 + px * 1.1) * 0.1;

    vec2 baseOffset = vec2(px, px + pi_2);
    vec2 sinOffset  = sin(baseOffset + tSpeed1) * wob1;
    vec2 cosOffset  = cos(baseOffset + tSpeed2) * wob2;

    float wSin = length(p.yz - sinOffset) - lt;
    float wCos = length(p.yz - cosOffset) - lt;

    k.x = max(px + lt, wSin);
    k.y = max(px + lt, wCos);

    s = min(s, min(k.x, k.y));
    if (s < 0.001 || d > 400.0) break;
    d += s * 0.7;
  }

  vec3 c = max(cos(d * pi2) - s * sqrt(d) - k, 0.0);
  
  vec3 vueGreen = vec3(0.259, 0.722, 0.514);  // #42B883
  vec3 vueDark = vec3(0.208, 0.286, 0.369);   // #35495e
  
  vec3 finalColor = vec3(0.0);
  if (k.x < k.y) {
    finalColor = vueGreen * c.x;
  } else {
    finalColor = vueDark * c.y;
  }
  
  float intensity = max(finalColor.r, max(finalColor.g, finalColor.b));
  if (intensity < 0.15) discard;
  C = vec4(finalColor * (0.4 + intensity * 0.6), uOpacity);
}

void main() {
  vec2 coord = gl_FragCoord.xy + uOffset;
  coord -= 0.5 * iResolution;
  float c = cos(uRotation), s = sin(uRotation);
  coord = mat2(c, -s, s, c) * coord;
  coord += 0.5 * iResolution;

  vec4 color;
  mainImage(color, coord);
  gl_FragColor = color;
}
`;

const isMobile = ref(false);
const isVisible = ref(true);
const containerRef = useTemplateRef<HTMLDivElement>('containerRef');
const uniformOffset = ref(new Float32Array([props.xOffset, props.yOffset]));
const uniformResolution = ref(new Float32Array([1, 1]));
const rendererRef = ref<Renderer | null>(null);
const fadeStartTime = ref<number | null>(null);
const lastTimeRef = ref(0);
const pausedTimeRef = ref(0);
const rafId = ref<number | null>(null);
const resizeObserver = ref<ResizeObserver | null>(null);
const intersectionObserver = ref<IntersectionObserver | null>(null);

const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

const resize = () => {
  if (!containerRef.value || !rendererRef.value) return;

  const { width, height } = containerRef.value.getBoundingClientRect();
  rendererRef.value.setSize(width, height);
  uniformResolution.value[0] = width * rendererRef.value.dpr;
  uniformResolution.value[1] = height * rendererRef.value.dpr;

  const gl = rendererRef.value.gl;
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clear(gl.COLOR_BUFFER_BIT);
};

const initWebGL = () => {
  if (isMobile.value || !containerRef.value) return;

  const renderer = new Renderer({
    alpha: true,
    dpr: Math.min(window.devicePixelRatio, 1),
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'high-performance'
  });
  rendererRef.value = renderer;

  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);
  containerRef.value.appendChild(gl.canvas);

  const camera = new Camera(gl);
  const scene = new Transform();

  const geometry = new Geometry(gl, {
    position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) }
  });

  const program = new Program(gl, {
    vertex,
    fragment,
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: uniformResolution.value },
      uOffset: { value: uniformOffset.value },
      uRotation: { value: 0 },
      focalLength: { value: props.focalLength },
      speed1: { value: props.speed1 },
      speed2: { value: props.speed2 },
      dir2: { value: props.dir2 },
      bend1: { value: props.bend1 },
      bend2: { value: props.bend2 },
      bendAdj1: { value: 0 },
      bendAdj2: { value: 0 },
      uOpacity: { value: 0 }
    }
  });
  new Mesh(gl, { geometry, program }).setParent(scene);

  resize();

  resizeObserver.value = new ResizeObserver(resize);
  resizeObserver.value.observe(containerRef.value);

  const loop = (now: number) => {
    if (isVisible.value) {
      if (lastTimeRef.value === 0) {
        lastTimeRef.value = now - pausedTimeRef.value;
      }

      const t = (now - lastTimeRef.value) * 0.001;

      if (fadeStartTime.value === null && t > 0.1) {
        fadeStartTime.value = now;
      }

      let opacity = 0;
      if (fadeStartTime.value !== null) {
        const fadeElapsed = now - fadeStartTime.value;
        opacity = Math.min(fadeElapsed / props.fadeInDuration, 1);
        opacity = 1 - Math.pow(1 - opacity, 3);
      }

      uniformOffset.value[0] = props.xOffset;
      uniformOffset.value[1] = props.yOffset;

      program.uniforms.iTime.value = t;
      program.uniforms.uRotation.value = (props.rotationDeg * Math.PI) / 180;
      program.uniforms.focalLength.value = props.focalLength;
      program.uniforms.uOpacity.value = opacity;

      renderer.render({ scene, camera });
    } else {
      if (lastTimeRef.value !== 0) {
        pausedTimeRef.value = now - lastTimeRef.value;
        lastTimeRef.value = 0;
      }
    }

    rafId.value = requestAnimationFrame(loop);
  };

  rafId.value = requestAnimationFrame(loop);
};

const setupIntersectionObserver = () => {
  if (!containerRef.value || isMobile.value) return;

  intersectionObserver.value = new IntersectionObserver(
    ([entry]) => {
      isVisible.value = entry.isIntersecting;
    },
    {
      rootMargin: '50px',
      threshold: 0.1
    }
  );

  intersectionObserver.value.observe(containerRef.value);
};

const cleanup = () => {
  if (rafId.value) {
    cancelAnimationFrame(rafId.value);
    rafId.value = null;
  }

  if (resizeObserver.value) {
    resizeObserver.value.disconnect();
    resizeObserver.value = null;
  }

  if (intersectionObserver.value) {
    intersectionObserver.value.disconnect();
    intersectionObserver.value = null;
  }

  if (rendererRef.value) {
    rendererRef.value.gl.canvas.remove();
    rendererRef.value = null;
  }

  window.removeEventListener('resize', checkIsMobile);
};

onMounted(() => {
  checkIsMobile();
  window.addEventListener('resize', checkIsMobile);

  if (!isMobile.value) {
    initWebGL();
    setupIntersectionObserver();
  }
});

onUnmounted(() => {
  cleanup();
});

watch(isMobile, newIsMobile => {
  if (newIsMobile) {
    cleanup();
  } else {
    initWebGL();
    setupIntersectionObserver();
  }
});
</script>
