<template>
  <Button :style="{
    fontWeight: 500,
    borderRadius: '0.75rem',
    border: '1px solid #142216',
    padding: '1rem',
    position: 'fixed',
    right: '2.3em',
    zIndex: 98,
    boxShadow: '10px 0 25px rgba(0, 0, 0, 0.2)',
    transition: '0.3s ease',
    opacity: visible ? 1 : 0,
    bottom: visible ? '2.5em' : '1em',
    cursor: visible ? 'pointer' : 'default'
  }" class="back-to-top" @click="visible && scrollToTop()">
    <i class="pi pi-arrow-up" style="color: #fff; font-size: 1rem;"></i>
  </Button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useToast } from 'primevue/usetoast'
import Button from 'primevue/button'

const toast = useToast()
const visible = ref(false)

const messages = [
  '🐴  Country roads, take me home!',
  '🚀  To infinity and beyond!',
  '🦾  Get to the choppa!',
  '🚕  Grove Street, home...',
  '🐉  Fus Ro Dah!',
  '🍄  The princess is in another castle!',
  '🦸‍♂️  Avengers, assemble!',
  '🗡️  It\'s dangerous to go alone! Take this.',
  '📜  A wizard is never late.',
  '💍  Foul Tarnished, in search of the Elden Ring!',
  '🐊  See you later, alligator.',
  '🔥  Dracarys!'
]

const getRandomMessage = (messages: string[]) =>
  messages[Math.floor(Math.random() * messages.length)]

const scrollToTop = () => {
  window.scrollTo(0, 0)
  toast.add({
    severity: 'secondary',
    summary: getRandomMessage(messages),
    life: 3000
  })
}

const onScroll = () => {
  visible.value = window.scrollY > 500
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>