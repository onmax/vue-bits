<template>
  <div class="features-section">
    <div class="features-container">
      <div class="features-header">
        <h3 class="features-title">Zero cost, all the cool.</h3>
        <p class="features-subtitle">Everything you need to add flair to your websites</p>
      </div>

      <GlobalSpotlight v-if="gridRef" :grid-ref="gridRef" :disable-animations="isMobile" />

      <div class="bento-grid" ref="gridRef">
        <ParticleCard class="feature-card card1" :disable-animations="isMobile">
          <div className="messages-gif-wrapper">
            <img src="/assets/messages.gif" alt="Messages animation" className="messages-gif" />
          </div>
          <h2>
            <template v-if="isMobile">100</template>
            <CountUp v-else :to="100" />%
          </h2>
          <h3>Free &amp; Open Source</h3>
          <p>Loved by developers around the world</p>
        </ParticleCard>

        <ParticleCard class="feature-card card2" :disable-animations="isMobile">
          <div className="components-gif-wrapper">
            <img src="/assets/components.gif" alt="Components animation" className="components-gif" />
          </div>
          <h2>
            <template v-if="isMobile">40</template>
            <CountUp v-else :to="40" />+
          </h2>
          <h3>Curated Components</h3>
          <p>Growing weekly &amp; only getting better</p>
        </ParticleCard>

        <ParticleCard class="feature-card card4" :disable-animations="isMobile">
          <h2>
            Modern
          </h2>
          <h3>Technologies</h3>
          <p>TypeScript + Tailwind, ready to ship</p>
        </ParticleCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineComponent, h } from 'vue'
import { gsap } from 'gsap'
import CountUp from '../../../content/Animations/CountUp/CountUp.vue'
import './FeatureCards.css'

const isMobile = ref(false)
const gridRef = ref<HTMLDivElement | null>(null)

const checkIsMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkIsMobile)
})

const ParticleCard = defineComponent({
  name: 'ParticleCard',
  props: {
    disableAnimations: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots }) {
    const cardRef = ref<HTMLDivElement | null>(null)
    const particlesRef = ref<HTMLDivElement[]>([])
    const timeoutsRef = ref<number[]>([])
    const isHoveredRef = ref(false)
    const memoizedParticles = ref<HTMLDivElement[]>([])
    const particlesInit = ref(false)

    const createParticle = (x: number, y: number): HTMLDivElement => {
      const el = document.createElement('div')
      el.className = 'particle'
      el.style.cssText = `
        position:absolute;width:4px;height:4px;border-radius:50%;
        background:rgba(132,0,255,1);box-shadow:0 0 6px rgba(132,0,255,.6);
        pointer-events:none;z-index:100;left:${x}px;top:${y}px;
      `
      return el
    }

    const memoizeParticles = () => {
      if (particlesInit.value || !cardRef.value) return
      const { width, height } = cardRef.value.getBoundingClientRect()
      Array.from({ length: 12 }).forEach(() => {
        memoizedParticles.value.push(createParticle(Math.random() * width, Math.random() * height))
      })
      particlesInit.value = true
    }

    const clearParticles = () => {
      timeoutsRef.value.forEach(clearTimeout)
      timeoutsRef.value = []
      particlesRef.value.forEach(p =>
        gsap.to(p, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: "back.in(1.7)",
          onComplete: () => {
            if (p.parentNode) {
              p.parentNode.removeChild(p)
            }
          },
        })
      )
      particlesRef.value = []
    }

    const animateParticles = () => {
      if (!cardRef.value || !isHoveredRef.value) return
      if (!particlesInit.value) memoizeParticles()

      memoizedParticles.value.forEach((particle, i) => {
        const id = setTimeout(() => {
          if (!isHoveredRef.value || !cardRef.value) return
          const clone = particle.cloneNode(true) as HTMLDivElement
          cardRef.value.appendChild(clone)
          particlesRef.value.push(clone)

          gsap.set(clone, { scale: 0, opacity: 0 })
          gsap.to(clone, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" })
          gsap.to(clone, {
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
            rotation: Math.random() * 360,
            duration: 2 + Math.random() * 2,
            ease: "none",
            repeat: -1,
            yoyo: true,
          })
          gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: "power2.inOut", repeat: -1, yoyo: true })
        }, i * 100)
        timeoutsRef.value.push(id)
      })
    }

    const handleMouseEnter = () => {
      isHoveredRef.value = true
      animateParticles()
    }

    const handleMouseLeave = () => {
      isHoveredRef.value = false
      clearParticles()
    }

    onMounted(() => {
      if (props.disableAnimations || !cardRef.value) return

      const node = cardRef.value
      node.addEventListener('mouseenter', handleMouseEnter)
      node.addEventListener('mouseleave', handleMouseLeave)
    })

    onUnmounted(() => {
      if (cardRef.value) {
        cardRef.value.removeEventListener('mouseenter', handleMouseEnter)
        cardRef.value.removeEventListener('mouseleave', handleMouseLeave)
      }
      isHoveredRef.value = false
      clearParticles()
    })

    return () => h('div', {
      ref: cardRef,
      class: 'particle-container',
      style: { position: 'relative', overflow: 'hidden' }
    }, slots.default?.())
  }
})

const GlobalSpotlight = defineComponent({
  name: 'GlobalSpotlight',
  props: {
    gridRef: {
      type: Object,
      required: true
    },
    disableAnimations: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const spotlightRef = ref<HTMLDivElement | null>(null)
    const isInsideSectionRef = ref(false)

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.value || !props.gridRef.value) return
      const section = props.gridRef.value.closest('.features-section')
      const rect = section?.getBoundingClientRect()
      const inside =
        rect &&
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom

      isInsideSectionRef.value = inside
      const cards = props.gridRef.value.querySelectorAll('.feature-card')

      if (!inside) {
        gsap.to(spotlightRef.value, { opacity: 0, duration: 0.3, ease: "power2.out" })
        cards.forEach((card: HTMLElement) => card.style.setProperty('--glow-intensity', '0'))
        return
      }

      let minDist = Infinity
      const prox = 100, fade = 150
      cards.forEach((card: HTMLElement) => {
        const r = card.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const d = Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(r.width, r.height) / 2
        const ed = Math.max(0, d)
        minDist = Math.min(minDist, ed)

        const rx = ((e.clientX - r.left) / r.width) * 100
        const ry = ((e.clientY - r.top) / r.height) * 100
        let glow = 0
        if (ed <= prox) glow = 1
        else if (ed <= fade) glow = (fade - ed) / (fade - prox)
        card.style.setProperty('--glow-x', `${rx}%`)
        card.style.setProperty('--glow-y', `${ry}%`)
        card.style.setProperty('--glow-intensity', String(glow))
      })

      gsap.to(spotlightRef.value, { left: e.clientX, top: e.clientY, duration: 0.1, ease: "power2.out" })
      const target = minDist <= prox ? 0.8 : minDist <= fade ? ((fade - minDist) / (fade - prox)) * 0.8 : 0
      gsap.to(spotlightRef.value, { opacity: target, duration: target > 0 ? 0.2 : 0.5, ease: "power2.out" })
    }

    const handleMouseLeave = () => {
      isInsideSectionRef.value = false
      props.gridRef.value
        ?.querySelectorAll('.feature-card')
        .forEach((card: HTMLElement) => card.style.setProperty('--glow-intensity', '0'))
      if (spotlightRef.value) {
        gsap.to(spotlightRef.value, { opacity: 0, duration: 0.3, ease: "power2.out" })
      }
    }

    onMounted(() => {
      if (props.disableAnimations || !props.gridRef?.value) return

      const spotlight = document.createElement('div')
      spotlight.className = 'global-spotlight'
      spotlight.style.cssText = `
        position:fixed;width:800px;height:800px;border-radius:50%;pointer-events:none;
        background:radial-gradient(circle,rgba(132,0,255,.15) 0%,rgba(132,0,255,.08) 15%,
        rgba(132,0,255,.04) 25%,rgba(132,0,255,.02) 40%,rgba(132,0,255,.01) 65%,transparent 70%);
        z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;
      `
      document.body.appendChild(spotlight)
      spotlightRef.value = spotlight

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseleave', handleMouseLeave)
    })

    onUnmounted(() => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (spotlightRef.value?.parentNode) {
        spotlightRef.value.parentNode.removeChild(spotlightRef.value)
      }
    })

    return () => null
  }
})
</script>