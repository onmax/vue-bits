<template>
    <component :is="as" class="star-border-container" :class="customClass" v-bind="restAttrs" :style="componentStyle">
        <div class="border-gradient-bottom" :style="{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed
        }"></div>
        <div class="border-gradient-top" :style="{
            background: `radial-gradient(circle, ${color}, transparent 10%)`,
            animationDuration: speed
        }"></div>
        <div class="inner-content">
            <slot />
        </div>
    </component>
</template>

<script setup lang="ts">
import { computed, defineProps, useAttrs } from 'vue';

interface StarBorderProps {
    as?: string;
    customClass?: string;
    color?: string;
    speed?: string;
    thickness?: number;
}

const props = withDefaults(defineProps<StarBorderProps>(), {
    as: 'button',
    customClass: '',
    color: 'white',
    speed: '6s',
    thickness: 1
});

const restAttrs = useAttrs();

const componentStyle = computed(() => {
    const base = {
        padding: `${props.thickness}px 0`
    };
    const userStyle = (restAttrs.style as Record<string, string>) || {};
    return { ...base, ...userStyle };
});
</script>

<style scoped>
.star-border-container {
    all: unset;
    display: inline-block;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
}

.border-gradient-bottom {
    position: absolute;
    width: 300%;
    height: 50%;
    opacity: 0.7;
    bottom: -12px;
    right: -250%;
    border-radius: 50%;
    animation: star-movement-bottom linear infinite alternate;
    z-index: 0;
}

.border-gradient-top {
    position: absolute;
    opacity: 0.7;
    width: 300%;
    height: 50%;
    top: -12px;
    left: -250%;
    border-radius: 50%;
    animation: star-movement-top linear infinite alternate;
    z-index: 0;
}

.inner-content {
    position: relative;
    border: 1px solid #222;
    background: #000;
    color: white;
    font-size: 16px;
    text-align: center;
    padding: 16px 26px;
    border-radius: 20px;
    z-index: 1;
}

@keyframes star-movement-bottom {
    0% {
        transform: translate(0%, 0%);
        opacity: 1;
    }

    100% {
        transform: translate(-100%, 0%);
        opacity: 0;
    }
}

@keyframes star-movement-top {
    0% {
        transform: translate(0%, 0%);
        opacity: 1;
    }

    100% {
        transform: translate(100%, 0%);
        opacity: 0;
    }
}
</style>
