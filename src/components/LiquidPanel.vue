<template>
  <div
    class="relative  backdrop-blur-md  rounded-3xl padding-xs overflow-hidden bg-gradient-to-br from-black/20 to-black/5 mb-8"
  >
    <!-- Inner glass panel -->
    <div
      class="rounded-3xl text-white padding-xs"
    >
      <header v-if="$slots.heading || $slots.subheading" class="mb-4 space-y-1">
        <h1 v-if="$slots.heading" class="text-xl font-semibold text-white/90">
          <slot name="heading" />
        </h1>
        <h2 v-if="$slots.subheading" class="text-sm text-white/60">
          <slot name="subheading" />
        </h2>
      </header>

      <div class="text-white/80 text-base leading-relaxed mb-4">
        <slot name="body" />
      </div>

      <div v-if="$slots.default" class="mb-4">
        <slot />
      </div>


      <footer v-if="$slots.citation" class="text-right text-white/40 text-xs">
        <slot name="citation" />
      </footer>
    </div>
  </div>
</template>
