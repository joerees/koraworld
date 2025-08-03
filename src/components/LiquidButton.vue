<template>
  <button
    v-bind="$attrs"
    class="cursor-pointer inline-block rounded-xl bg-blue-500/40 hover:bg-white/20 text-white/90 px-4 py-2 text-sm font-medium transition-colors duration-200 shadow-md backdrop-blur-sm"
  >
    <slot />
  </button>
</template>

