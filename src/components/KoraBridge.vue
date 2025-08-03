<template>
  <div class="kora-bridge">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 181.58 300">
      <g id="Layer_2" data-name="Layer 2">
        <g id="Direction" transform="translate(12 0) scale(0.9)">
          <g v-for="el in koraTextElements" :key="el.id">
            <circle
              :cx="el.x"
              :cy="el.y - 5"
              r="20"
              class="string-trigger"
              @mouseenter="setNote(koraStrings[el.id].midi, true)"
            />
            <g :transform="`translate(${el.x} ${el.y})`">
              <text
                text-anchor="middle"
                class="string-label"
                :class="{ active: koraStrings[el.id].on }"
              >
                {{ koraStrings[el.id].notes[selectedKey] }}
              </text>
            </g>
          </g>

          <!-- String lines - simplified -->
          <g class="string-lines">
            <line v-for="i in 11" :key="`left-${i}`" 
                  class="string" 
                  :x1="42.79" 
                  :y1="30.97 + (i-1) * 25.9" 
                  :x2="25.36" 
                  :y2="30.97 + (i-1) * 25.9" />
            
            <line v-for="i in 8" :key="`diagonal-${i}`" 
                  class="string diagonal" 
                  :x1="133.53" 
                  :y1="82.77 + (i-1) * 25.9" 
                  :x2="47.79" 
                  :y2="30.97 + (i-1) * 25.9" />
            
            <line v-for="i in 10" :key="`right-${i}`" 
                  class="string" 
                  :x1="155.95" 
                  :y1="30.97 + (i-1) * 25.9" 
                  :x2="138.53" 
                  :y2="30.97 + (i-1) * 25.9" />
          </g>

          <polygon
            class="bridge-outline"
            points="25.36 1.5 25.36 310.28 75.9 310.28 87.9 334.31 93.22 334.31 105.22 310.28 155.95 310.28 155.95 1.5 25.36 1.5"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { useKoraStrings } from '@/composables/useKoraStrings'
const { koraStrings } = useKoraStrings()

const koraTextElements = [
  { id: 18, x: 0, y: 32.97 },
  { id: 16, x: 0.35, y: 60.01 },
  { id: 14, x: 0.71, y: 86.05 },
  { id: 12, x: 1.06, y: 111.1 },
  { id: 10, x: 1.42, y: 137.14 },
  { id: 8, x: 1.77, y: 163.18 },
  { id: 6, x: 2.12, y: 189.23 },
  { id: 4, x: 2.48, y: 215.27 },
  { id: 3, x: 2.83, y: 241.31 },
  { id: 2, x: 3.18, y: 267.35 },
  { id: 1, x: 3.54, y: 292.4 },
  { id: 21, x: 169.71, y: 32.97 },
  { id: 20, x: 170.07, y: 60.01 },
  { id: 19, x: 170.42, y: 86.05 },
  { id: 17, x: 170.78, y: 111.1 },
  { id: 15, x: 171.13, y: 137.14 },
  { id: 13, x: 171.48, y: 163.18 },
  { id: 11, x: 171.84, y: 189.23 },
  { id: 9, x: 172.19, y: 215.27 },
  { id: 7, x: 172.55, y: 241.31 },
  { id: 5, x: 172.9, y: 267.35 },
]

// Emits
const emit = defineEmits<{
  playNote: [note: number]
}>()

const selectedKey = 0
const setNote = (note: number, isOn: boolean) => {
  emit('playNote', note)
}
</script>

<style scoped>
.kora-bridge {
  margin: 2rem 0;
  max-width: 100%;
}

.string-trigger {
  fill: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.string-trigger:hover {
  stroke: rgba(255, 239, 209, 0.5);
  stroke-width: 2;
}

.string-label {
  font-size: 14px;
  fill: #ffe66d;
 
  font-family:
    ChalkboardSE-Regular,
    Chalkboard SE;  transition: all 0.3s ease;
  pointer-events: none;
}

.string-label.active {
  fill: #ff0000;
  transform: scale(1.8);
  transition-duration: 0.1s;
}

.string {
  fill: none;
  stroke: var(--color-kora-strings);
  stroke-width: 3px;
  stroke-miterlimit: 10;
}

.string.diagonal {
  stroke-width: 1px;
}

.bridge-outline {
  fill: rgba(0, 0, 0, 0.1);
  stroke: var(--color-kora-strings);
  stroke-width: 2px;
  filter: drop-shadow(0px 4px 4px #060606);
}
</style>
