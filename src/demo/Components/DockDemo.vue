<template>
  <div class="dock-demo">
    <TabbedLayout>
      <template #preview>
        <div class="demo-container" style="min-height: 400px; position: relative;">
          <div class="demo-content">
            <Dock :key="rerenderKey" :items="items" :panel-height="panelHeight" :base-item-size="baseItemSize"
              :magnification="magnification" :distance="200" :dock-height="256"
              :spring="{ mass: 0.1, stiffness: 150, damping: 12 }" />
          </div>

          <div
            class="absolute inset-0 flex items-center justify-center pointer-events-none text-[4rem] font-[900] text-[#222] select-none">
            Try It!
          </div>
        </div>

        <Customize>
          <PreviewSlider title="Background Height" :min="30" :max="200" :step="10" :model-value="panelHeight"
            @update:model-value="(val: number) => { panelHeight = val; forceRerender(); }" />

          <PreviewSlider title="Item Size" :min="20" :max="60" :step="10" :model-value="baseItemSize"
            @update:model-value="(val: number) => { baseItemSize = val; forceRerender(); }" />

          <PreviewSlider title="Magnification" :min="50" :max="100" :step="10" :model-value="magnification"
            @update:model-value="(val: number) => { magnification = val; forceRerender(); }" />
        </Customize>

        <PropTable :data="propData" />
        <Dependencies :dependency-list="['motion-v']" />
      </template>

      <template #code>
        <CodeExample :code-object="dock" />
      </template>

      <template #cli>
        <CliInstallation :command="dock.cli" />
      </template>
    </TabbedLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'
import TabbedLayout from '../../components/common/TabbedLayout.vue'
import PropTable from '../../components/common/PropTable.vue'
import CliInstallation from '../../components/code/CliInstallation.vue'
import CodeExample from '../../components/code/CodeExample.vue'
import Dependencies from '../../components/code/Dependencies.vue'
import Customize from '../../components/common/Customize.vue'
import PreviewSlider from '../../components/common/PreviewSlider.vue'
import Dock from '../../content/Components/Dock/Dock.vue'
import { dock } from '@/constants/code/Components/dockCode'
import { useToast } from 'primevue/usetoast'
import { useForceRerender } from '@/composables/useForceRerender'

const panelHeight = ref(68)
const baseItemSize = ref(50)
const magnification = ref(70)

const toast = useToast()
const { rerenderKey, forceRerender } = useForceRerender()

const HomeIcon = () => h('i', { class: 'pi pi-home', style: { fontSize: '18px', color: 'white' } })
const ArchiveIcon = () => h('i', { class: 'pi pi-inbox', style: { fontSize: '18px', color: 'white' } })
const ProfileIcon = () => h('i', { class: 'pi pi-user', style: { fontSize: '18px', color: 'white' } })
const SettingsIcon = () => h('i', { class: 'pi pi-cog', style: { fontSize: '18px', color: 'white' } })

const showAlert = (message: string) => {
  toast.add({
    severity: 'secondary',
    summary: `${message} button was clicked`,
    life: 3000
  })
}

const items = [
  { icon: HomeIcon, label: 'Home', onClick: () => showAlert('Home') },
  { icon: ArchiveIcon, label: 'Archive', onClick: () => showAlert('Archive') },
  { icon: ProfileIcon, label: 'Profile', onClick: () => showAlert('Profile') },
  { icon: SettingsIcon, label: 'Settings', onClick: () => showAlert('Settings') },
]

const propData = [
  {
    name: "items",
    type: "DockItemData[]",
    default: "[]",
    description: "Array of dock items. Each item should include an icon, label, onClick handler, and an optional className."
  },
  {
    name: "className",
    type: "string",
    default: '""',
    description: "Additional CSS classes for the dock panel."
  },
  {
    name: "distance",
    type: "number",
    default: "200",
    description: "Pixel distance used to calculate the magnification effect based on mouse proximity."
  },
  {
    name: "panelHeight",
    type: "number",
    default: "68",
    description: "Height (in pixels) of the dock panel."
  },
  {
    name: "baseItemSize",
    type: "number",
    default: "50",
    description: "The base size (in pixels) for each dock item."
  },
  {
    name: "dockHeight",
    type: "number",
    default: "256",
    description: "Maximum height (in pixels) of the dock container."
  },
  {
    name: "magnification",
    type: "number",
    default: "70",
    description: "The magnified size (in pixels) applied to a dock item when hovered."
  },
  {
    name: "spring",
    type: "SpringOptions",
    default: "{ mass: 0.1, stiffness: 150, damping: 12 }",
    description: "Configuration options for the spring animation."
  }
]
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
}

.demo-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
  max-width: 800px;
}

.demo-title {
  font-size: 2rem;
  font-weight: 900;
  color: #271E37;
  margin: 0;
  text-align: center;
}
</style>