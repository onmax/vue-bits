const animations = {
  'fade-content': () => import("../demo/Animations/FadeContentDemo.vue"),
};

const textAnimations = {
  'split-text': () => import("../demo/TextAnimations/SplitTextDemo.vue"),
};

const components = {

};

const backgrounds = {
  'dot-grid': () => import("../demo/Backgrounds/DotGridDemo.vue"),
};

export const componentMap = {
  ...animations,
  ...textAnimations,
  ...components,
  ...backgrounds,
};
