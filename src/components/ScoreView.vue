<template>
  <div class="score-container">
    <div class="playhead"></div>
    <div ref="stageRef" class="stage">
      <div ref="containerRef" class="canvas-wrapper">
        <div class="canvas-section">
          <div ref="sheetRef" class="sheet-wrapper"></div>
        </div>
      </div>
    </div>
    <div ref="outputRef" class="position-display">0%</div>
  </div>
</template>

<script setup lang="ts">
import { useKoraStrings } from '@/composables/useKoraStrings'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Renderer, Stave, StaveNote, Formatter, Annotation, Voice } from 'vexflow'
import { WrapAroundSlider } from '../js/WrapSlider'
import { debounce } from 'lodash-es'

const emit = defineEmits<{
  (e: 'update:currentNoteTime', value: number): void
  (e: 'update:isDragging', value: boolean): void
  (e: 'seek', time: number): void
  (e: 'onDragStart', event: any): void
  (e: 'onDragEnd', event: any): void
}>()

const currentTime = ref(0)
const containerRef = ref<HTMLElement>()
const stageRef = ref<HTMLElement>()
const outputRef = ref<HTMLElement>()
const scrollContainerRef = ref<HTMLElement | null>(null)
const sheetRef = ref<HTMLDivElement | null>(null)
const noteElements = ref<SVGElement[]>([])
const closestTime = ref<number | null>()
const slider = ref<WrapAroundSlider | null>(null)
const { koraStrings } = useKoraStrings()

const props = defineProps<{
  notes: Array<{
    time: number
    duration: number
    midi: number
    name: string
  }>
  isPlaying: boolean
  currentTime: number | null
  currentNoteTime: number | null
  totalDuration: number
}>()

const isRendering = ref(false)
const renderError = ref<string | null>(null)

onMounted(() => {
  if (containerRef.value && stageRef.value) {
    slider.value = new WrapAroundSlider(
      containerRef.value,
      stageRef.value,
      {
        deceleration: 0.95,
        sensitivity: 0.05,
        outputElement: outputRef.value || null,
      },
      () => {
        debouncedUpdateCurrentTimeFromScroll()
      }, // onUpdateScrollOffset not needed
      () => {
        onDragStart(null)
      },
      () => {
        onDragEnd(null)
      },
    )
  }

  if (scrollContainerRef.value) {
    scrollContainerRef.value.addEventListener('scroll', () => {
      updateCurrentTimeFromScroll()
    })
  }
})

onBeforeUnmount(() => {
  if (slider.value) {
    // slider.value.destroy();
  }
})

const onDragStart = (event: any) => {
  emit('onDragStart', event)
  emit('update:isDragging', true)
}

const onDragEnd = (event: any) => {
  updateCurrentTimeFromScroll(true) // Trigger 'seek'
  emit('onDragEnd', event)
  emit('update:isDragging', false)
}

function toVexflowKey(noteName: string) {
  const letter = noteName[0].toLowerCase()
  const octave = noteName.slice(1)
  return `${letter}/${octave}`
}

function highlightNote(time: number | null) {
  noteElements.value.forEach((el) => {
    const noteheadPaths = el.querySelectorAll('.vf-notehead path')
    noteheadPaths.forEach((el) =>
      el.setAttribute('fill', el.getAttribute('data-base-color') || 'black'),
    )

    const annotations = el.querySelectorAll('.vf-annotation text')
    annotations.forEach((el) =>
      el.setAttribute('fill', el.getAttribute('data-base-color') || 'black'),
    )

    el.classList.remove('highlighted')
  })

  if (time !== null) {
    const el = noteElements.value.find((el) => {
      return parseFloat(el.getAttribute('data-time') || '-1') === time
    })

    if (el) {
      const noteheadPaths = el.querySelectorAll('.vf-notehead path')
      noteheadPaths.forEach((el) => el.setAttribute('fill', '#b28d2b'))

      const annotations = el.querySelectorAll('.vf-annotation text')
      annotations.forEach((el) => el.setAttribute('fill', '#b28d2b'))
      el.classList.add('highlighted')
    }
  }
}

function updateCurrentTimeFromScroll(emitSeek = false) {
  if (!stageRef.value || !noteElements.value.length) return

  const containerRect = stageRef.value.getBoundingClientRect()
  const centerX = containerRect.left + containerRect.width / 2
  const threshold = 20

  const notesInCenter = noteElements.value.filter((el) => {
    const box = el.getBoundingClientRect()
    const noteCenterX = box.left + box.width / 2
    return Math.abs(noteCenterX - centerX) <= threshold
  })

  if (!notesInCenter.length) return

  const centerTimes = notesInCenter
    .map((el) => parseFloat(el.getAttribute('data-time') || '-1'))
    .filter((t) => t >= 0)

  const firstTime = centerTimes[0]
  if (firstTime !== undefined && firstTime !== props.currentNoteTime) {
    closestTime.value = firstTime
    currentTime.value = closestTime.value
    emit('update:currentNoteTime', firstTime)
    if (emitSeek) {
      emit('seek', firstTime)
    }
  }
}

// Improve the render function with error handling
function renderTrebleStaff(container: HTMLDivElement, notes: typeof props.notes) {
  if (isRendering.value) return

  try {
    isRendering.value = true
    renderError.value = null

    container.innerHTML = ''
    noteElements.value = []

    if (!notes.length) {
      container.innerHTML = '<div class="text-center p-8">No notes to display</div>'
      return
    }

    // Add a maximum notes limit for performance
    const maxNotes = 1000
    const notesToRender = notes.slice(0, maxNotes)

    if (notes.length > maxNotes) {
      console.warn(`Limiting display to ${maxNotes} notes for performance`)
    }

    const renderer = new Renderer(container, Renderer.Backends.SVG)
    const measureWidth = 200
    const groupsPerMeasure = 4

    const timeGroups = new Map<number, typeof props.notes>()
    for (const note of notesToRender) {
      const group = timeGroups.get(note.time) || []
      group.push(note)
      timeGroups.set(note.time, group)
    }

    const groupedNotes = Array.from(timeGroups.entries())
      .sort(([a], [b]) => a - b)
      .map(([time, group]) => ({ time, group }))

    const staveCount = Math.ceil(groupedNotes.length / groupsPerMeasure)
    const totalWidth = staveCount * measureWidth + 20

    renderer.resize(totalWidth, 250)
    const context = renderer.getContext()

    for (let i = 0; i < staveCount; i++) {
      const xPos = 10 + i * measureWidth
      const trebleStave = new Stave(xPos, 40, measureWidth)
      if (i === 0) trebleStave.addClef('treble')
      trebleStave.setContext(context).draw()

      const slice = groupedNotes.slice(i * groupsPerMeasure, (i + 1) * groupsPerMeasure)
      const trebleNotes: StaveNote[] = []

      for (const { time, group } of slice) {
        const keys = group.map((n) => toVexflowKey(n.name))
        const staveNote = new StaveNote({
          clef: 'treble',
          keys,
          duration: 'q',
        })

        group.forEach((note, idx) => {
          const annotation = new Annotation(`${note.name}: ${time.toFixed(0)}`)
            .setFont('Arial', 10)
            .setVerticalJustification(Annotation.VerticalJustify.BOTTOM)
          staveNote.addModifier(annotation, idx)
        })

        trebleNotes.push(staveNote)
      }

      while (trebleNotes.length < groupsPerMeasure) {
        trebleNotes.push(new StaveNote({ clef: 'treble', keys: ['b/4'], duration: 'qr' }))
      }

      const voice = new Voice({ numBeats: 4, beatValue: 4 }).addTickables(trebleNotes)
      new Formatter().joinVoices([voice]).format([voice], measureWidth - 20)
      voice.draw(context, trebleStave)

      const svgNotes = container.querySelectorAll('g.vf-stavenote')
      for (let j = 0; j < slice.length; j++) {
        const noteEl = svgNotes[svgNotes.length - slice.length + j] as SVGElement
        const time = slice[j].time
        noteEl.setAttribute('data-time', String(time))
        noteElements.value.push(noteEl)

        const notesInGroup = slice[j].group
        notesInGroup.forEach((note, idx) => {
          const entry = Object.values(koraStrings).find((s) => s.midi === note.midi)
          const color = entry?.side === 0 ? '#3a6a7b' : '#b3472f'

          const noteheadPaths = noteEl.querySelectorAll('.vf-notehead')
          if (noteheadPaths[idx]) {
            const path = noteheadPaths[idx] as SVGElement
            path.setAttribute('fill', color)
            path.setAttribute('data-base-color', color)
          }

          const annotations = noteEl.querySelectorAll('.vf-annotation text')
          if (annotations[idx]) {
            const text = annotations[idx] as SVGElement
            text.setAttribute('fill', color)
            text.setAttribute('data-base-color', color)
          }
        })
      }
    }

    highlightNote(props.currentNoteTime)

  } catch (error) {
    console.error('Error rendering score:', error)
    renderError.value = 'Failed to render musical score'
    container.innerHTML = `<div class="text-red-500 p-8">Error: ${renderError.value}</div>`
  } finally {
    isRendering.value = false
  }
}

// Debounce the rendering function
const debouncedRender = debounce((container: HTMLDivElement, notes: typeof props.notes) => {
  renderTrebleStaff(container, notes)
}, 300)

watch(
  () => props.notes,
  (newNotes) => {
    if (sheetRef.value) {
      debouncedRender(sheetRef.value, newNotes)
    }
  },
  { immediate: true },
)

watch(
  () => props.currentNoteTime,
  (newTime) => {
    if (typeof newTime !== 'number' || !props.totalDuration || !slider.value) return
    const el = noteElements.value.find((el) => {
      return parseFloat(el.getAttribute('data-time') || '-1') === newTime
    }) as SVGGElement
    highlightNote(newTime)
    if (el) {
      if (props.isPlaying && !slider.value.isDragging()) slider.value.scrollToElement(el)
    }
  },
)

const debouncedUpdateCurrentTimeFromScroll = () => {
  updateCurrentTimeFromScroll(false)
}
</script>

<style scoped>
.score-container {
  width: 100%;
  height: 300px;
  position: relative;
  border-radius: 16px;
  border: 2px solid #5b3924;
  padding: 24px 0;
  box-shadow: var(--shadow-kora);
  background: linear-gradient(to bottom, #fef3dc, #f7e6b4);
  overflow: hidden;
}

.score-container::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url('/textures/paper-fiber.jpg');
  background-size: cover;
  opacity: 0.7;
  pointer-events: none;
}

.playhead {
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  background: rgba(255, 0, 0, 0.6);
  z-index: 10;
  pointer-events: none;
  transform: translateX(-50%);
}

.stage {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.canvas-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
}

.canvas-section {
  min-width: 400px;
  height: 300px;
  margin: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sheet-wrapper {
  display: inline-block;
  padding: 0 50%;
}

.position-display {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
}

.highlighted {
  transform: scale(1.2);
  transition: transform 0.2s ease;
}

:deep(svg) {
  filter: drop-shadow(2px 2px 1px rgba(0, 0, 0, 0.25));
}
</style>
