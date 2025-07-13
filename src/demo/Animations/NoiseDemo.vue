<template>
    <div>
        <TabbedLayout>
            <template #preview>
                <div class="demo-container" style="min-height: 500px; position: relative; overflow: hidden;">
                    <div class="text-[#2ea043] text-[6rem] font-extrabold text-center opacity-50">
                        Ooh, edgy!
                    </div>
                    <Noise :pattern-size="patternSize" :pattern-scale-x="patternScaleX" :pattern-scale-y="patternScaleY"
                        :pattern-alpha="patternAlpha" />
                </div>

                <Customize>
                    <PreviewSlider title="pattern Size" value-unit="px" v-model="patternSize" :min="50" :max="500"
                        :step="10" />
                    <PreviewSlider title="Scale X" v-model="patternScaleX" :min="0.1" :max="5" :step="0.1" />
                    <PreviewSlider title="Scale Y" v-model="patternScaleY" :min="0.1" :max="5" :step="0.1" />
                    <PreviewSlider title="pattern Alpha" v-model="patternAlpha" :min="0" :max="25" :step="5" />
                </Customize>

                <PropTable :data="propData" />
            </template>

            <template #code>
                <CodeExample :code-object="noise" />
            </template>

            <template #cli>
                <CliInstallation :command="noise.cli" />
            </template>
        </TabbedLayout>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TabbedLayout from '../../components/common/TabbedLayout.vue'
import PropTable from '../../components/common/PropTable.vue'
import CliInstallation from '../../components/code/CliInstallation.vue'
import CodeExample from '../../components/code/CodeExample.vue'
import Customize from '../../components/common/Customize.vue'
import PreviewSlider from '../../components/common/PreviewSlider.vue'
import Noise from '../../content/Animations/Noise/Noise.vue'
import { noise } from '@/constants/code/Animations/noiseCode'

const patternSize = ref(250)
const patternScaleX = ref(2)
const patternScaleY = ref(2)
const patternAlpha = ref(10)

const propData = [
    {
        name: 'patternSize',
        type: 'number',
        default: '-',
        description: 'Defines the size of the grain pattern.'
    },
    {
        name: 'patternScaleX',
        type: 'number',
        default: '-',
        description: 'Scaling factor for the X-axis of the grain pattern.'
    },
    {
        name: 'patternScaleY',
        type: 'number',
        default: '-',
        description: 'Scaling factor for the Y-axis of the grain pattern.'
    },
    {
        name: 'patternRefreshInterval',
        type: 'number',
        default: '2',
        description: 'Number of frames before the grain pattern refreshes.'
    },
    {
        name: 'patternAlpha',
        type: 'number',
        default: '10',
        description: 'Opacity of the grain pattern (0-255).'
    }
]
</script>
