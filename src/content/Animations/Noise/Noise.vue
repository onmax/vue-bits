<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

interface NoiseProps {
    patternSize?: number;
    patternScaleX?: number;
    patternScaleY?: number;
    patternRefreshInterval?: number;
    patternAlpha?: number;
}

const props = withDefaults(defineProps<NoiseProps>(), {
    patternSize: 250,
    patternScaleX: 1,
    patternScaleY: 1,
    patternRefreshInterval: 2,
    patternAlpha: 10,
});

const grainRef = ref<HTMLCanvasElement | null>(null);

let animationId = 0;
let frame = 0;
const canvasSize = 1024;

const resize = () => {
    const canvas = grainRef.value;
    if (!canvas) return;

    canvas.width = canvasSize;
    canvas.height = canvasSize;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
};

const drawGrain = (ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.createImageData(canvasSize, canvasSize);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = props.patternAlpha;
    }

    ctx.putImageData(imageData, 0, 0);
};

const loop = (ctx: CanvasRenderingContext2D) => {
    if (frame % props.patternRefreshInterval === 0) {
        drawGrain(ctx);
    }
    frame++;
    animationId = requestAnimationFrame(() => loop(ctx));
};

onMounted(() => {
    const canvas = grainRef.value;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    resize();
    loop(ctx);
    window.addEventListener('resize', resize);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', resize);
    cancelAnimationFrame(animationId);
});
</script>

<template>
    <canvas ref="grainRef" class="pointer-events-none absolute top-0 left-0 h-screen w-screen"
        style="image-rendering: pixelated">
    </canvas>
</template>
