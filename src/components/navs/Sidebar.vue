<template>
  <!-- Mobile Drawer -->
  <div v-if="isDrawerOpen" class="drawer-overlay" @click="closeDrawer">
    <div class="drawer-content" :class="{ 'drawer-open': isDrawerOpen }" @click.stop>
      <div class="drawer-header sidebar-logo">
        <div class="drawer-header-content">
          <router-link to="/" @click="closeDrawer">
            <img :src="Logo" alt="Logo" class="drawer-logo" />
          </router-link>
          <button class="icon-button" aria-label="Close" @click="closeDrawer">
            <i class="pi pi-times"></i>
          </button>
        </div>
      </div>

      <div class="drawer-body">
        <div class="categories-container">
          <Category v-for="cat in CATEGORIES" :key="cat.name" :category="cat" :location="route"
            :pending-active-path="pendingActivePath ?? undefined" :handle-click="onNavClick"
            :handle-transition-navigation="handleMobileTransitionNavigation" :on-item-mouse-enter="() => { }"
            :on-item-mouse-leave="() => { }" :is-transitioning="isTransitioning" />
        </div>

        <div class="separator"></div>
        <div class="useful-links">
          <p class="useful-links-title">Useful Links</p>
          <div class="links-container">
            <a href="https://github.com/DavidHDev/vue-bits" target="_blank" @click="closeDrawer" class="useful-link">
              <span>GitHub</span>
              <i class="pi pi-arrow-up-right arrow-icon"></i>
            </a>
            <router-link to="/text-animations/split-text" @click="closeDrawer" class="useful-link">
              <span>Docs</span>
              <i class="pi pi-arrow-up-right arrow-icon"></i>
            </router-link>
            <a href="https://davidhaz.com/" target="_blank" @click="closeDrawer" class="useful-link">
              <span>Who made this?</span>
              <i class="pi pi-arrow-up-right arrow-icon"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Desktop Sidebar -->
  <nav ref="sidebarContainerRef" class="sidebar" :class="{ 'sidebar-no-fade': isScrolledToBottom }"
    @scroll="handleScroll">
    <div ref="sidebarRef" class="sidebar-content">
      <!-- Active line indicator -->
      <div class="active-line" :style="{
        transform: isLineVisible && linePosition !== null
          ? `translateY(${linePosition - 8}px)`
          : 'translateY(-100px)',
        opacity: isLineVisible ? 1 : 0
      }"></div>

      <!-- Hover line indicator -->
      <div class="hover-line" :style="{
        transform: hoverLinePosition !== null
          ? `translateY(${hoverLinePosition - 8}px)`
          : 'translateY(-100px)',
        opacity: isHoverLineVisible ? 1 : 0
      }"></div>

      <div class="categories-list">
        <Category v-for="cat in CATEGORIES" :key="cat.name" :category="cat" :location="route"
          :pending-active-path="pendingActivePath ?? undefined" :handle-click="scrollToTop"
          :handle-transition-navigation="handleTransitionNavigation" :on-item-mouse-enter="onItemEnter"
          :on-item-mouse-leave="onItemLeave" :is-transitioning="isTransitioning" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch, defineComponent, h, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CATEGORIES, NEW, UPDATED } from '../../constants/Categories'
import Logo from '../../assets/logos/vue-bits-logo.svg'
import '../../css/sidebar.css'

const HOVER_TIMEOUT_DELAY = 150

// Reactive data
const isDrawerOpen = ref(false)
const linePosition = ref<number | null>(null)
const isLineVisible = ref(false)
const hoverLinePosition = ref<number | null>(null)
const isHoverLineVisible = ref(false)
const pendingActivePath = ref<string | null>(null)
const isScrolledToBottom = ref(false)
const isTransitioning = ref(false)

const sidebarRef = ref<HTMLDivElement>()
const sidebarContainerRef = ref<HTMLDivElement>()

// Timeouts
let hoverTimeoutRef: number | null = null
let hoverDelayTimeoutRef: number | null = null

const route = useRoute()
const router = useRouter()

// Helper functions
const scrollToTop = () => window.scrollTo(0, 0)
const slug = (str: string) => str.replace(/\s+/g, "-").toLowerCase()

const findActiveElement = () => {
  const activePath = pendingActivePath.value || route.path

  for (const category of CATEGORIES) {
    const activeItem = category.subcategories.find((sub: string) => {
      const expectedPath = `/${slug(category.name)}/${slug(sub)}`
      return activePath === expectedPath
    })
    if (activeItem) {
      // Try to find the element within the sidebar
      const selector = `.sidebar a[href="${activePath}"]`
      const element = document.querySelector(selector) as HTMLElement
      return element
    }
  }
  return null
}

const updateLinePosition = (el: HTMLElement | null) => {
  if (!el || !sidebarRef.value || !sidebarRef.value.offsetParent) return null
  const sidebarRect = sidebarRef.value.getBoundingClientRect()
  const elRect = el.getBoundingClientRect()
  return elRect.top - sidebarRect.top + elRect.height / 2
}

const closeDrawer = () => {
  isDrawerOpen.value = false
}

const onNavClick = () => {
  closeDrawer()
  scrollToTop()
}

const handleTransitionNavigation = async (path: string) => {
  if (isTransitioning.value || route.path === path) return

  pendingActivePath.value = path

  // Simple navigation without transition for now
  // TODO: Implement transition when available
  await router.push(path)
  scrollToTop()
  pendingActivePath.value = null
}

const handleMobileTransitionNavigation = async (path: string) => {
  if (isTransitioning.value || route.path === path) return

  closeDrawer()
  pendingActivePath.value = path

  // Simple navigation without transition for now
  // TODO: Implement transition when available
  await router.push(path)
  scrollToTop()
  pendingActivePath.value = null
}

const onItemEnter = (path: string, e: Event) => {
  if (hoverTimeoutRef) clearTimeout(hoverTimeoutRef)
  if (hoverDelayTimeoutRef) clearTimeout(hoverDelayTimeoutRef)

  const targetElement = e.currentTarget as HTMLElement
  const pos = updateLinePosition(targetElement)

  if (pos !== null) {
    hoverLinePosition.value = pos
  }

  hoverDelayTimeoutRef = setTimeout(() => {
    isHoverLineVisible.value = true
  }, 200)
}

const onItemLeave = () => {
  if (hoverDelayTimeoutRef) clearTimeout(hoverDelayTimeoutRef)

  hoverTimeoutRef = setTimeout(() => {
    isHoverLineVisible.value = false
  }, HOVER_TIMEOUT_DELAY)
}

const handleScroll = () => {
  const sidebarElement = sidebarContainerRef.value
  if (!sidebarElement) return

  const { scrollTop, scrollHeight, clientHeight } = sidebarElement
  const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10
  isScrolledToBottom.value = isAtBottom
}

const updateActiveLine = async () => {
  await nextTick()

  // Wait a bit more to ensure DOM is fully updated
  setTimeout(() => {
    const activeEl = findActiveElement()

    if (!activeEl) {
      isLineVisible.value = false
      return
    }

    const pos = updateLinePosition(activeEl)
    if (pos !== null) {
      linePosition.value = pos
      isLineVisible.value = true
    } else {
      isLineVisible.value = false
    }
  }, 100)
}

// Category Component
const Category = defineComponent({
  name: 'Category',
  props: {
    category: {
      type: Object,
      required: true
    },
    location: {
      type: Object,
      required: true
    },
    pendingActivePath: {
      type: String,
      default: null
    },
    handleClick: {
      type: Function,
      required: true
    },
    handleTransitionNavigation: {
      type: Function,
      required: true
    },
    onItemMouseEnter: {
      type: Function,
      required: true
    },
    onItemMouseLeave: {
      type: Function,
      required: true
    },
    isTransitioning: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    interface ItemType {
      sub: string
      path: string
      isActive: boolean
      isNew: boolean
      isUpdated: boolean
    }

    const items = computed(() =>
      props.category.subcategories.map((sub: string): ItemType => {
        const path = `/${slug(props.category.name)}/${slug(sub)}`
        const activePath = props.pendingActivePath || props.location.path
        return {
          sub,
          path,
          isActive: activePath === path,
          isNew: (NEW as string[]).includes(sub),
          isUpdated: (UPDATED as string[]).includes(sub),
        }
      })
    )

    return () => h('div', { class: 'category' }, [
      h('p', { class: 'category-name' }, props.category.name),
      h('div', { class: 'category-items' },
        items.value.map(({ sub, path, isActive, isNew, isUpdated }: ItemType) => {
          return h('router-link', {
            key: path,
            to: path,
            class: [
              'sidebar-item',
              { 'active-sidebar-item': isActive },
              { 'transitioning': props.isTransitioning }
            ],
            onClick: (e: Event) => {
              e.preventDefault()
              props.handleTransitionNavigation(path)
            },
            onMouseenter: (e: Event) => props.onItemMouseEnter(path, e),
            onMouseleave: props.onItemMouseLeave
          }, {
            default: () => [
              sub,
              isNew ? h('span', { class: 'new-tag' }, 'New') : null,
              isUpdated ? h('span', { class: 'updated-tag' }, 'Updated') : null
            ].filter(Boolean)
          })
        })
      )
    ])
  }
})

// Watchers
watch(() => route.path, updateActiveLine)
watch(pendingActivePath, updateActiveLine)

// Lifecycle
onMounted(() => {
  updateActiveLine()
  if (sidebarContainerRef.value) {
    sidebarContainerRef.value.addEventListener('scroll', handleScroll)
    handleScroll()
  }
})

onUnmounted(() => {
  if (hoverTimeoutRef) clearTimeout(hoverTimeoutRef)
  if (hoverDelayTimeoutRef) clearTimeout(hoverDelayTimeoutRef)
  if (sidebarContainerRef.value) {
    sidebarContainerRef.value.removeEventListener('scroll', handleScroll)
  }
})
</script>