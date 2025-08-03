<script setup lang="ts">
import LiquidPanel from '../components/LiquidPanel.vue'
</script>

<template>
  <main>
    <div class="p-4">
      <LiquidPanel class="bg-[url(/koras.jpg)]! bg-cover!">
        <section class="w-full h-[60vh] flex flex-col items-center justify-center ">
          <h1 class="text-5xl md:text-7xl lg:text-[8vw] font-extrabold tracking-tight text-center">
            Kora World
          </h1>
          <p class="block font-extrabold tracking-tight text-center">
            Part of the Music notes platform
          </p>
          <p class="mt-3 block text-center">
            
            <router-link to="/">Shop</router-link> •
          <router-link to="/kora">Play</router-link> •
          <router-link to="/about">Learn</router-link>
          
         </p>
        </section>
      </LiquidPanel>
    </div>

    <div
      class="max-w-5xl m-auto w-full relative min-h-screen m-auto"
    >
      <main
        class="p-4 overflow-auto max-w-full w-full flex-grow order-2 md:grid md:grid-flow-row-dense md:grid-cols-3  md:gap-4"
      >
        <LiquidPanel>
          <template #heading> Learn to Play the Kora </template>

          <template #subheading>
            Upload MIDI, see notation, hear playback, and follow every pluck.
          </template>

          <template #body>
            Our tool turns solo kora MIDI into interactive sheet music. As notes play, they’re
            highlighted on a virtual kora bridge—showing exactly which string is plucked. Explore
            kora music, learn techniques, and connect tradition with technology.

            <button class="mt-4 w-full button-earthy">Play</button>

          </template>

          <template #citation> Rooted in tradition. Built for learning. </template>
        </LiquidPanel>

        <LiquidPanel>
          <template #heading> Buy Koras & Parts </template>

          <template #subheading> Instruments and accessories made by master builders. </template>

          <template #body>
            Browse handcrafted koras, strings, tuning rings, and more. Everything you need to start
            playing or keep your instrument in tune.
          </template>

          <template #citation> Artisan-built. Music-ready. </template>
        </LiquidPanel>

        <LiquidPanel>
          <template #heading> The History of the Kora </template>

          <template #subheading> From griot tradition to global stage. </template>

          <template #body>
            Discover the origins, evolution, and impact of the kora. Learn how this 21-string
            harp-lute shaped West African music and continues to inspire today.
          </template>

          <template #citation> Preserving the past. Inspiring the present. </template>
        </LiquidPanel>

      </main>
    </div>
  </main>
</template>
