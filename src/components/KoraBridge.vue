<template>
  <div class="my-8 max-w-full">

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 181.58 300">
      <g id="Layer_2" data-name="Layer 2">
        <g id="Direction" transform="translate(12 0) scale(0.9)">
          <g v-for="el in koraTextElements" :key="el.id">
            <circle
              :cx="el.x"
              :cy="el.y - 5"
              r="20"
              class="hover-circle"
              @mouseenter="setNote(koraStrings[el.id].midi, true)"
            />
            <g :transform="`translate(${el.x} ${el.y})`">
              <text
                stroke-width="1"
                paint-order="stroke"
                text-anchor="middle"
                class="cls-1"
                :class="{ isOn: koraStrings[el.id].on }"
              >
                {{ koraStrings[el.id].notes[selectedKey] }}
              </text>
            </g>
          </g>

          <line class="cls-2" x1="42.79" y1="30.97" x2="25.36" y2="30.97" />
          <line class="cls-2" x1="42.79" y1="56.87" x2="25.36" y2="56.87" />
          <line class="cls-2" x1="42.79" y1="82.77" x2="25.36" y2="82.77" />
          <line class="cls-2" x1="42.79" y1="108.68" x2="25.36" y2="108.68" />
          <line class="cls-2" x1="42.79" y1="134.58" x2="25.36" y2="134.58" />
          <line class="cls-2" x1="42.79" y1="160.49" x2="25.36" y2="160.49" />
          <line class="cls-2" x1="42.79" y1="186.39" x2="25.36" y2="186.39" />
          <line class="cls-2" x1="42.79" y1="212.3" x2="25.36" y2="212.3" />
          <line class="cls-2" x1="42.79" y1="238.2" x2="25.36" y2="238.2" />
          <line class="cls-2" x1="42.79" y1="264.11" x2="25.36" y2="264.11" />
          <line class="cls-2" x1="42.79" y1="290.01" x2="25.36" y2="290.01" />
          <line class="cls-3" x1="133.53" y1="82.77" x2="47.79" y2="30.97" />
          <line class="cls-3" x1="133.53" y1="108.68" x2="47.79" y2="56.87" />
          <line class="cls-3" x1="133.53" y1="134.58" x2="47.79" y2="82.77" />
          <line class="cls-3" x1="133.53" y1="160.49" x2="47.79" y2="108.68" />
          <line class="cls-3" x1="133.53" y1="186.39" x2="47.79" y2="134.58" />
          <line class="cls-3" x1="133.53" y1="212.3" x2="47.79" y2="160.49" />
          <line class="cls-3" x1="133.53" y1="238.2" x2="47.79" y2="186.39" />
          <line class="cls-3" x1="133.53" y1="264.11" x2="47.79" y2="212.3" />
          <line class="cls-2" x1="155.95" y1="30.97" x2="138.53" y2="30.97" />
          <line class="cls-2" x1="155.95" y1="56.87" x2="138.53" y2="56.87" />
          <line class="cls-2" x1="155.95" y1="82.77" x2="138.53" y2="82.77" />
          <line class="cls-2" x1="155.95" y1="108.68" x2="138.53" y2="108.68" />
          <line class="cls-2" x1="155.95" y1="134.58" x2="138.53" y2="134.58" />
          <line class="cls-2" x1="155.95" y1="160.49" x2="138.53" y2="160.49" />
          <line class="cls-2" x1="155.95" y1="186.39" x2="138.53" y2="186.39" />
          <line class="cls-2" x1="155.95" y1="212.3" x2="138.53" y2="212.3" />
          <line class="cls-2" x1="155.95" y1="238.2" x2="138.53" y2="238.2" />
          <line class="cls-2" x1="155.95" y1="264.11" x2="138.53" y2="264.11" />
          <polygon
            class="cls-2 bridge__outline"
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

<style>
.scroll-container {
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
}

.bridge__scene {
  min-width: 200px;
  width: 100%;
  height: 500px;
  margin: auto;
  perspective: 800px;
  perspective-origin: center;
}
.bridge {
  min-width: 200px;
  width: 100%;
  margin: auto;
  transform: rotateX(60deg) translate3d(0px, 190px, -10px);
}
.notes {
  position: fixed;
  right: 20px;
  top: 100px;
  height: calc(100vh - 100px);
  overflow: scroll;
}

.hover-circle {
  fill: rgba(0, 0, 0, 0);
  transition: all 0.2s;
  pointer-events: all;
  cursor: pointer;
  stroke: transparent;
  transform-origin: center;
}
.hover-circle:hover {
  fill: transparent;
  stroke: rgba(255, 239, 209, 0.5);
  
}

.cls-1 {
  font-size: 14px;
  fill: #ffe66d;
  stroke: none;
  font-family:
    ChalkboardSE-Regular,
    Chalkboard SE;
  transition: all 2s;
  stroke: transparent;
  pointer-events: none;
  transform-origin: center;
  transform-box: fill-box;
  transform-origin: center;
}

.cls-1.isOn {
  transition: all 0s;
  fill: #ff0000;
  stroke: #ff0000;
  transform: scale(1.8);
  pointer-events: none;
}

.cls-2,
.cls-3 {
  fill: none;
  stroke-miterlimit: 10;
}
.cls-2 {
  stroke: var(--color-kora-strings);
  stroke-width: 3px;
}
.cls-3 {
  stroke: var(--color-kora-strings);
}
.bridge__outline {
filter: drop-shadow(0px 4px 4px #060606);
  fill: rgba(0, 0, 0, 0.1);


}
</style>
