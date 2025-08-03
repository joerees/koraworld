<template>
  <div class="flex flex-col md:flex-row max-w-5xl m-auto w-full relative">
    <template v-if="!started">
      <main class="w-full self-center">
        <section class="w-full flex flex-col items-center justify-center">
          <h1
            class="text-5xl md:text-7xl lg:text-[8vw] font-extrabold tracking-tight text-center"
          >
            Kora World
          </h1>
          <p class="block font-extrabold tracking-tight text-center">
            Part of the Music notes platform
          </p>
          <p class="mt-3 block text-center">
            <button class="button-earthy mt-8" @click="onStartApp">
              Start Music Player
            </button>
          </p>
        </section>
      </main>
    </template>

    <template v-else>
      <aside class="w-full md:w-80 max-h-screen p-4 sticky top-10 self-start">
        <PanelTextured>
          <KoraBridge @play-note="playNote" />
          <template #citation>21 string Kora Bridge</template>
        </PanelTextured>
      </aside>

      <main class="p-4 overflow-auto max-w-full w-full flex-grow order-2">
        <PanelTextured class="sticky mb-8">
          <div class="mt-4 relative">
            <ScoreView
              v-model:isDragging="isDragging"
              :notes="noteData"
              :isPlaying="isPlaying"
              :total-duration="totalDuration"
              v-model:currentNoteTime="currentNoteTime"
              @seek="onSeek"
              :current-time="currentTime"
              @on-drag-start="onDragStart"
              @on-drag-end="onDragEnd"
            />
          </div>
          <template #citation>
            <div class="flex flex-col">
              <!-- MIDI File Selection Dropdown -->
              <div class="w-full flex flex-col py-2 mb-4">
                <label class="block mb-2 text-sm font-medium">Select MIDI File:</label>
                <select
                  v-model="selectedMidiFile"
                  @change="onMidiSelect"
                  class="w-full rounded-xl bg-blue-500/20 hover:bg-white/10 text-white/90 px-4 py-2 text-sm font-medium transition-colors duration-200 shadow-md backdrop-blur-sm border border-white/20"
                >
                  <option value="">Choose from library...</option>
                  <option v-for="file in midiFiles" :key="file.value" :value="file.value">
                    {{ file.label }}
                  </option>
                </select>
                <div v-if="currentFileName" class="mt-2 text-xs text-white/60">
                  Currently loaded: {{ currentFileName }}
                </div>
              </div>

              <div class="w-full flex flex-col py-2">
                <label class="block">Speed: {{ playbackSpeed.toFixed(2) }}x</label>
                <input
                  type="range"
                  min="0.01"
                  max="1"
                  step=".001"
                  v-model.number="playbackSpeed"
                />
              </div>

              <div class="flex flex-row">
                <div class="flex flex-row items-start gap-2">
                  <label
                    for="midi-upload"
                    class="cursor-pointer inline-block rounded-xl bg-blue-500/40 hover:bg-white/20 text-white/90 px-4 py-2 text-sm font-medium transition-colors duration-200 shadow-md backdrop-blur-sm"
                  >
                    Upload MIDI
                  </label>
                  <input
                    id="midi-upload"
                    type="file"
                    accept=".mid,.midi"
                    class="hidden"
                    @change="onMidiUpload"
                  />
                  <LiquidButton
                    class="mr-2"
                    @click="startPlayback(currentNoteTime ?? 0)"
                    >Play</LiquidButton
                  >
                  <LiquidButton @click="stopPlayback">Pause</LiquidButton>
                </div>

                <span
                  class="ml-auto text-sm text-muted-foreground tabular-nums"
                >
                {{ formatSecondsToTime(currentNoteTime||0) }} : {{  formatSecondsToTime(totalDuration) }}
       
                </span>
              </div>
            </div>
          </template>
        </PanelTextured>

        <LiquidPanel>
          <template #heading>Kora Music Player</template>
          <template #subheading>Learn to play</template>
          <template #body>
            Learn to play the kora by reading sheet music and visual aids to
            indicate the string to be played by highlighting its position on the
            Kora Bridge.
          </template>
          <template #citation>Music, 2025</template>
        </LiquidPanel>
        <div class="absolute p-4 w-8 h-8">
          <GlassCard>X</GlassCard>
        </div>
      </main>
    </template>
  </div>
</template>

<script setup lang="ts">
import * as Tone from "tone";
import { Midi } from "@tonejs/midi";
import { computed, ref, watch } from "vue";

import GlassCard from "././GlassCard.vue";
import LiquidPanel from "./LiquidPanel.vue";
import PanelTextured from "./PanelTextured.vue";
import LiquidButton from "./LiquidButton.vue";
import KoraBridge from "@/components/KoraBridge.vue";
import ScoreView from "./ScoreView.vue";
import { useKoraStrings, type KoraString } from "@/composables/useKoraStrings";

const { koraStrings, info } = useKoraStrings();
const currentTime = ref(0);
const noteData = ref<any[]>([]);
const currentNoteTime = ref<number | null>(null);
const totalDuration = ref(0);
const playbackSpeed = ref(1);

const started = ref(false);
const isPlaying = ref(false);
const scheduledIds: number[] = [];
let sampler: Tone.Sampler;

// MIDI file selection
const selectedMidiFile = ref('');
const currentFileName = ref('');

const midiFiles = [
  { value: 'yeyengo (1).mid', label: 'Yeyengo' },
  { value: 'alalake-1.mid', label: 'Alalake 1' },
  { value: 'alalake-2.mid', label: 'Alalake 2' },
  { value: 'alalake-3.mid', label: 'Alalake 3' },
  { value: 'alalake.mid', label: 'Alalake' },
  { value: 'bakotema.mid', label: 'Bakotema' },
  { value: 'balankul.mid', label: 'Balankul' },
  { value: 'bambaboj.mid', label: 'Bambaboj' },
  { value: 'guilan.mid', label: 'Guilan' },
  { value: 'kaira.mid', label: 'Kaira' },
  { value: 'kele.mid', label: 'Kele' },
  { value: 'konkoba.mid', label: 'Konkoba' },
  { value: 'miniyamba.mid', label: 'Miniyamba' },
  { value: 'nteriato.mid', label: 'Nteriato' },
  { value: 'rega.mid', label: 'Rega' },
  { value: 'isabunima.mid', label: 'Isabunima' },
  { value: 'sutukung.mid', label: 'Sutukung' },
  { value: 'tabara.mid', label: 'Tabara' },
  { value: 'itoutou.mid', label: 'Itoutou' },
  { value: 'toutou2.mid', label: 'Toutou 2' }
];

const onStartApp = () => {
  started.value = true;
  init();
};

const init = () => {
  sampler = new Tone.Sampler({
    urls: {
      C4: "F1.mp3",
      D4: "A3.mp3",
      E4: "A3.mp3",
    },
    baseUrl: "/mp3/",
    onload: () => console.log("Sampler loaded"),
  }).toDestination();
};

const noteMap = computed(() => {
  const map = new Map<
    number,
    Array<{ midi: number; name: string; duration: number }>
  >();
  noteData.value.forEach((note) => {
    const existing = map.get(note.time) || [];
    existing.push({
      midi: note.midi,
      name: note.name,
      duration: note.duration,
    });
    map.set(note.time, existing);
  });
  return map;
});

const isDragging = ref(false);
watch(isDragging, (val) => {
 //  console.log("Dragging state changed:", val);
});

watch(currentNoteTime, (newTime) => {
  if (!newTime || isPlaying.value) return;
  const notes = noteMap.value.get(newTime) || [];
  notes.forEach((n) => playNote(n.midi));
});

watch(playbackSpeed, (newSpeed) => {
  Tone.getTransport().bpm.value = newSpeed;
  const lastNote = noteData.value.at(-1);
  const midiEndTime = lastNote ? lastNote.time + lastNote.duration : 0;
  totalDuration.value = Tone.Time(midiEndTime).toSeconds();
});

const playNote = async (midiNote: number) => {
  await Tone.start();
  const matching = Object.values(koraStrings).find(
    (s: KoraString) => s.midi === midiNote
  );

  if (!matching) {
    console.warn("No matching string for MIDI note:", midiNote);
    return;
  }

  const noteName = matching.note + matching.info.slice(-1);
  sampler.triggerAttackRelease(noteName, "4n");
  matching.on = true;
  setTimeout(() => {
    matching.on = false;
  }, 200);
};

const onSeek = (o: number) => {
  //console.log("onSeek", o);
};

const onDragStart = (o: number) => {
  stopPlayback();
};

const onDragEnd = (o: number) => {
  // console.log("onDragEnd :: startPlayback", o);
};

// Handle MIDI file selection from dropdown
async function onMidiSelect() {
  if (!selectedMidiFile.value) return;

  try {
    const response = await fetch(`/midi/${selectedMidiFile.value}`);
    if (!response.ok) {
      throw new Error(`Failed to load MIDI file: ${response.statusText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const midi = new Midi(arrayBuffer);

    noteData.value = midi.tracks.flatMap((track) =>
      track.notes.map((note) => ({
        time: note.time,
        duration: note.duration,
        midi: note.midi,
        name: note.name,
        info: info(note.midi)?.info,
      })),
    );

    const last = noteData.value.at(-1);
    totalDuration.value = last ? last.time + last.duration : 0;

    const selectedFile = midiFiles.find(f => f.value === selectedMidiFile.value);
    currentFileName.value = selectedFile ? selectedFile.label : selectedMidiFile.value;

    stopPlayback();
    currentNoteTime.value = 0;
    
    console.log(`Loaded MIDI file: ${currentFileName.value}`);
  } catch (error) {
    console.error('Error loading MIDI file:', error);
    alert(`Failed to load MIDI file: ${error.message}`);
  }
}

async function onMidiUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const arrayBuffer = await file.arrayBuffer();
  const midi = new Midi(arrayBuffer);

  noteData.value = midi.tracks.flatMap((track) =>
    track.notes.map((note) => ({
      time: note.time,
      duration: note.duration,
      midi: note.midi,
      name: note.name,
      info: info(note.midi)?.info,
    }))
  );

  const last = noteData.value.at(-1);
  totalDuration.value = last ? last.time + last.duration : 0;

  // Update filename and clear dropdown selection
  currentFileName.value = file.name;
  selectedMidiFile.value = '';

  stopPlayback();
  currentNoteTime.value = 0;
}

async function startPlayback(fromTime = 0) {
  await Tone.start();
  stopPlayback();

  Tone.getTransport().bpm.value = playbackSpeed.value;
  Tone.getTransport().seconds = fromTime;

  Object.values(koraStrings).forEach((str) => (str.on = false));
  scheduledIds.length = 0;

  noteData.value.forEach((note) => {
    if (note.time < fromTime) return;

    const matching = Object.values(koraStrings).find(
      (s: KoraString) => s.midi === note.midi
    );
    if (!matching) return;

    const noteName = matching.note + matching.info.slice(-1);

    Tone.getTransport().schedule((time) => {
      sampler.triggerAttackRelease(noteName, note.duration, time);
    }, note.time);

    Tone.getTransport().schedule((time) => {
      Tone.Draw.schedule(() => {
        matching.on = true;
        currentNoteTime.value = note.time;
      }, time);
    }, note.time);

    Tone.getTransport().schedule((time) => {
      Tone.Draw.schedule(() => {
        matching.on = false;
      }, time);
    }, note.time + 0.2);
  });

  const last = noteData.value.at(-1)?.time ?? 0;
  Tone.getTransport().schedule((time) => {
    Tone.Draw.schedule(() => {
      Object.values(koraStrings).forEach((s) => (s.on = false));
      currentNoteTime.value = null;
    }, time);
  }, last + 1);

  isPlaying.value = true;
  Tone.getTransport().start();
}

function stopPlayback() {
  Tone.getTransport().stop();
  Tone.getTransport().cancel();
  sampler.releaseAll();
  Object.values(koraStrings).forEach((s) => (s.on = false));
  currentNoteTime.value = null;
  isPlaying.value = false;
}

function formatSecondsToTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  const millis = Math.round((seconds % 1) * 1000)
  return `${minutes}:${secs.toString().padStart(2, '0')}.${millis.toString().padStart(2, '0')}`
}

</script>
