const animations = {
  'fade-content': () => import("../demo/Animations/FadeContentDemo.vue"),
  'animated-content': () => import("../demo/Animations/AnimatedContentDemo.vue"),
  'pixel-transition': () => import("../demo/Animations/PixelTransitionDemo.vue"),
  'glare-hover': () => import("../demo/Animations/GlareHoverDemo.vue"),
  'magnet-lines': () => import("../demo/Animations/MagnetLinesDemo.vue"),
  'click-spark': () => import("../demo/Animations/ClickSparkDemo.vue"),
  'magnet': () => import("../demo/Animations/MagnetDemo.vue"),
  'cubes': () => import("../demo/Animations/CubesDemo.vue"),
  'count-up': () => import("../demo/Animations/CountUpDemo.vue"),
};

const textAnimations = {
  'split-text': () => import("../demo/TextAnimations/SplitTextDemo.vue"),
  'blur-text': () => import("../demo/TextAnimations/BlurTextDemo.vue"),
  'circular-text': () => import("../demo/TextAnimations/CircularTextDemo.vue"),
  'shiny-text': () => import("../demo/TextAnimations/ShinyTextDemo.vue"),
  'text-pressure': () => import("../demo/TextAnimations/TextPressureDemo.vue"),
  'curved-loop': () => import("../demo/TextAnimations/CurvedLoopDemo.vue"),
  'fuzzy-text': () => import("../demo/TextAnimations/FuzzyTextDemo.vue"),
  'gradient-text': () => import("../demo/TextAnimations/GradientTextDemo.vue"),
  'text-trail': () => import("../demo/TextAnimations/TextTrailDemo.vue"),
  'falling-text': () => import("../demo/TextAnimations/FallingTextDemo.vue"),
  'text-cursor': () => import("../demo/TextAnimations/TextCursorDemo.vue"),
  'decrypted-text': () => import("../demo/TextAnimations/DecryptedTextDemo.vue"),
  'variable-proximity': () => import("../demo/TextAnimations/VariableProximityDemo.vue"),
};

const components = {
  'masonry': () => import("../demo/Components/MasonryDemo.vue"),
  'profile-card': () => import("../demo/Components/ProfileCardDemo.vue"),
  'dock': () => import("../demo/Components/DockDemo.vue"),
  'gooey-nav': () => import("../demo/Components/GooeyNavDemo.vue"),
  'pixel-card': () => import("../demo/Components/PixelCardDemo.vue"),
  'carousel': () => import("../demo/Components/CarouselDemo.vue"),
  'spotlight-card': () => import("../demo/Components/SpotlightCardDemo.vue"),
  'flying-posters': () => import("../demo/Components/FlyingPostersDemo.vue"),
  'card-swap': () => import("../demo/Components/CardSwapDemo.vue"),
  'infinite-scroll': () => import("../demo/Components/InfiniteScrollDemo.vue"),
  'glass-icons': () => import("../demo/Components/GlassIconsDemo.vue"),
  'decay-card': () => import("../demo/Components/DecayCardDemo.vue"),
  'flowing-menu': () => import("../demo/Components/FlowingMenuDemo.vue"),
  'elastic-slider': () => import("../demo/Components/ElasticSliderDemo.vue"),
  'tilted-card': () => import("../demo/Components/TiltedCardDemo.vue"),
};

const backgrounds = {
  'dot-grid': () => import("../demo/Backgrounds/DotGridDemo.vue"),
  'silk': () => import("../demo/Backgrounds/SilkDemo.vue"),
  'lightning': () => import("../demo/Backgrounds/LightningDemo.vue"),
  'letter-glitch': () => import("../demo/Backgrounds/LetterGlitchDemo.vue"),
  'particles': () => import("../demo/Backgrounds/ParticlesDemo.vue"),
  'waves': () => import("../demo/Backgrounds/WavesDemo.vue"),
  'squares': () => import("../demo/Backgrounds/SquaresDemo.vue"),
  'iridescence': () => import("../demo/Backgrounds/IridescenceDemo.vue"),
  'threads': () => import("../demo/Backgrounds/ThreadsDemo.vue"),
  'aurora': () => import("../demo/Backgrounds/AuroraDemo.vue"),
  'beams': () => import("../demo/Backgrounds/BeamsDemo.vue"),
};

export const componentMap = {
  ...animations,
  ...textAnimations,
  ...components,
  ...backgrounds,
};
