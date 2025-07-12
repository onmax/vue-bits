<template>
  <div class="image-trail-demo">
    <TabbedLayout>
      <template #preview>
        <h2 class="demo-title-extra">Basic Image Trail</h2>
        <div class="demo-container relative">
          <p class="demo-description">Move your mouse around to see the image trail effect</p>
          <ImageTrail
            :images="basicImages"
            :max-trail-length="8"
            :trail-spacing="40"
            :fade-out-duration="1000"
            :scale-effect="true"
            :image-size="60"
            class-name="demo-trail"
          >
            <div class="demo-content">
              <div class="demo-text">Hover and move your mouse here!</div>
            </div>
          </ImageTrail>
        </div>

        <h2 class="demo-title-extra">Emoji Trail</h2>
        <div class="demo-container relative">
          <p class="demo-description">Fun emoji trail with rotation effect</p>
          <ImageTrail
            :images="emojiImages"
            :max-trail-length="6"
            :trail-spacing="30"
            :fade-out-duration="800"
            :scale-effect="true"
            :rotation-effect="true"
            :image-size="50"
            class-name="demo-trail"
          >
            <div class="demo-content">
              <div class="demo-text">🎉 Move around for emoji magic! 🎉</div>
            </div>
          </ImageTrail>
        </div>

        <h2 class="demo-title-extra">Customizable Trail</h2>
        <div class="demo-container relative">
          <div class="controls-panel">
            <div class="control-group">
              <label>Max Trail Length: {{ maxTrailLength }}</label>
              <input
                v-model.number="maxTrailLength"
                type="range"
                min="3"
                max="15"
                class="slider"
              />
            </div>
            <div class="control-group">
              <label>Trail Spacing: {{ trailSpacing }}</label>
              <input
                v-model.number="trailSpacing"
                type="range"
                min="20"
                max="80"
                class="slider"
              />
            </div>
            <div class="control-group">
              <label>Fade Duration: {{ fadeOutDuration }}ms</label>
              <input
                v-model.number="fadeOutDuration"
                type="range"
                min="500"
                max="2000"
                step="100"
                class="slider"
              />
            </div>
            <div class="control-group">
              <label>Image Size: {{ imageSize }}px</label>
              <input
                v-model.number="imageSize"
                type="range"
                min="30"
                max="100"
                step="5"
                class="slider"
              />
            </div>
            <div class="control-group">
              <label>
                <input
                  v-model="scaleEffect"
                  type="checkbox"
                  class="checkbox"
                />
                Scale Effect
              </label>
            </div>
            <div class="control-group">
              <label>
                <input
                  v-model="rotationEffect"
                  type="checkbox"
                  class="checkbox"
                />
                Rotation Effect
              </label>
            </div>
            <div class="control-group">
              <label>Image Set:</label>
              <select v-model="selectedImageSet" class="select">
                <option value="nature">Nature</option>
                <option value="geometric">Geometric</option>
                <option value="animals">Animals</option>
              </select>
            </div>
          </div>
          
          <ImageTrail
            :key="customTrailKey"
            :images="currentImageSet"
            :max-trail-length="maxTrailLength"
            :trail-spacing="trailSpacing"
            :fade-out-duration="fadeOutDuration"
            :scale-effect="scaleEffect"
            :rotation-effect="rotationEffect"
            :image-size="imageSize"
            class-name="demo-trail"
          >
            <div class="demo-content large">
              <div class="demo-text">Customizable Trail Demo</div>
              <div class="demo-subtext">Adjust the controls above and move your mouse!</div>
            </div>
          </ImageTrail>
        </div>

        <PropTable :data="propData" />
      </template>

      <template #code>
        <CodeExample :code-object="imageTrail" />
      </template>

      <template #cli>
        <CliInstallation :command="imageTrail.cli" />
      </template>
    </TabbedLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import TabbedLayout from '../../components/common/TabbedLayout.vue'
import PropTable from '../../components/common/PropTable.vue'
import CliInstallation from '../../components/code/CliInstallation.vue'
import CodeExample from '../../components/code/CodeExample.vue'
import ImageTrail from '../../content/Animations/ImageTrail/ImageTrail.vue'
import { imageTrail } from '@/constants/code/Animations/imageTrailCode'

// Demo images - using data URLs for simple geometric shapes and patterns
const basicImages = [
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiNGRjZBOTUiLz4KPHN2Zz4K',
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiM2QTlFRkYiLz4KPHN2Zz4K',
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiM2QUZGNkEiLz4KPHN2Zz4K',
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiNGRkY2NkEiLz4KPHN2Zz4K'
]

const emojiImages = [
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiNGRkQ3MDAiLz4KPHRleHQgeD0iMzAiIHk9IjM4IiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5mAPC90ZXh0Pgo8L3N2Zz4K',
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiNGRkQ3MDAiLz4KPHRleHQgeD0iMzAiIHk9IjM4IiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5mJPC90ZXh0Pgo8L3N2Zz4K',
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiNGRkQ3MDAiLz4KPHRleHQgeD0iMzAiIHk9IjM4IiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5qAPC90ZXh0Pgo8L3N2Zz4K',
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiNGRkQ3MDAiLz4KPHRleHQgeD0iMzAiIHk9IjM4IiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5mEPC90ZXh0Pgo8L3N2Zz4K'
]

const imageSetOptions = {
  nature: [
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiM0QUY0NjQiLz4KPHN2Zz4K',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiNGNEEzNEEiLz4KPHN2Zz4K',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiNGNEY0NEEiLz4KPHN2Zz4K'
  ],
  geometric: [
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTUiIHk9IjE1IiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IiNGRjZBOTUiLz4KPHN2Zz4K',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBvbHlnb24gcG9pbnRzPSIzMCwxMCA0NSw0NSAxNSw0NSIgZmlsbD0iIzZBOUVGRiIvPgo8L3N2Zz4K',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBvbHlnb24gcG9pbnRzPSIzMCwxNSA0NSwyNSAzNyw0NSAyMyw0NSAxNSwyNSIgZmlsbD0iIzZBRkY2QSIvPgo8L3N2Zz4K'
  ],
  animals: [
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiNGRkI4NkMiLz4KPHRleHQgeD0iMzAiIHk9IjM4IiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5CBPC90ZXh0Pgo8L3N2Zz4K',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiNGRkI4NkMiLz4KPHRleHQgeD0iMzAiIHk9IjM4IiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5CxPC90ZXh0Pgo8L3N2Zz4K',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiNGRkI4NkMiLz4KPHRleHQgeD0iMzAiIHk9IjM4IiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7wn5CuPC90ZXh0Pgo8L3N2Zz4K'
  ]
}

// Interactive controls
const maxTrailLength = ref(8)
const trailSpacing = ref(40)
const fadeOutDuration = ref(1000)
const imageSize = ref(60)
const scaleEffect = ref(true)
const rotationEffect = ref(false)
const selectedImageSet = ref<'nature' | 'geometric' | 'animals'>('nature')
const customTrailKey = ref(0)

const currentImageSet = computed(() => {
  return imageSetOptions[selectedImageSet.value]
})

// Force re-render when options change
watch([maxTrailLength, trailSpacing, fadeOutDuration, imageSize, scaleEffect, rotationEffect, selectedImageSet], () => {
  customTrailKey.value++
}, { deep: true })

const propData = [
  {
    name: 'images',
    type: 'string[]',
    default: '—',
    description: 'Array of image URLs to be used in the trail effect.'
  },
  {
    name: 'maxTrailLength',
    type: 'number',
    default: '8',
    description: 'Maximum number of images that can be displayed in the trail at once.'
  },
  {
    name: 'trailSpacing',
    type: 'number',
    default: '40',
    description: 'Minimum distance in pixels between trail images.'
  },
  {
    name: 'fadeOutDuration',
    type: 'number',
    default: '1000',
    description: 'Duration in milliseconds for the fade-out animation of trail images.'
  },
  {
    name: 'scaleEffect',
    type: 'boolean',
    default: 'true',
    description: 'Whether to apply scaling animation to trail images.'
  },
  {
    name: 'rotationEffect',
    type: 'boolean',
    default: 'false',
    description: 'Whether to apply random rotation to trail images.'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether to disable the trail effect.'
  },
  {
    name: 'className',
    type: 'string',
    default: "''",
    description: 'CSS class to apply to the container for additional styling.'
  },
  {
    name: 'imageSize',
    type: 'number',
    default: '60',
    description: 'Size of trail images in pixels (width and height).'
  },
  {
    name: 'zIndex',
    type: 'number',
    default: '1000',
    description: 'Z-index value for trail images.'
  }
]
</script>

<style scoped>
.demo-container {
  min-height: 300px;
  position: relative;
  border: 1px solid var(--colors-neutral-6);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.demo-description {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 0.875rem;
  color: var(--colors-neutral-11);
  z-index: 10;
  background: var(--colors-neutral-2);
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid var(--colors-neutral-6);
}

.demo-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 200px;
  text-align: center;
  padding: 2rem;
}

.demo-content.large {
  min-height: 300px;
}

.demo-text {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--colors-neutral-12);
  margin-bottom: 0.5rem;
}

.demo-subtext {
  font-size: 1rem;
  color: var(--colors-neutral-11);
}

.controls-panel {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--colors-neutral-2);
  border: 1px solid var(--colors-neutral-6);
  border-radius: 8px;
  padding: 1rem;
  z-index: 10;
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.control-group label {
  font-size: 0.875rem;
  color: var(--colors-neutral-11);
  font-weight: 500;
}

.slider {
  width: 100%;
  height: 4px;
  background: var(--colors-neutral-6);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  background: var(--colors-neutral-12);
  border-radius: 50%;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: var(--colors-neutral-12);
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

.checkbox {
  margin-right: 0.5rem;
}

.select {
  padding: 0.25rem;
  border: 1px solid var(--colors-neutral-6);
  border-radius: 4px;
  background: var(--colors-neutral-1);
  color: var(--colors-neutral-12);
  font-size: 0.875rem;
}

.select:focus {
  outline: none;
  border-color: var(--colors-neutral-8);
}

@media (max-width: 768px) {
  .controls-panel {
    position: static;
    width: 100%;
    margin-bottom: 1rem;
  }
  
  .demo-content {
    padding: 1rem;
  }
  
  .demo-text {
    font-size: 1.25rem;
  }
}
</style>