<template>
  <div class="kora-panel">
    <slot />
  </div>
</template>

<script setup lang="ts">
// No logic needed — purely presentational
</script>

<style scoped>
.kora-panel {
  /* Background: rich wood gradient */
  background-image: linear-gradient(to bottom right, #3a220f, #482c14);
  border: 1px solid #6b4c2c;
  border-radius: 1rem;         /* ~rounded-2xl */
  padding: 1.5rem;             /* 24px */
  color: #f6dca6;
  position: relative;

  /* 3D effect: bevel and emboss */
  box-shadow:
    inset 0 4px 6px rgba(255, 255, 255, 0.08),   /* highlight at top */
    inset 0 -4px 6px rgba(0, 0, 0, 0.35),        /* shadow at bottom */
    0 8px 20px rgba(0, 0, 0, 0.4);               /* outer lift */
  overflow: hidden;
}

/* Optional wood grain overlay */
.kora-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: url('/textures/wood-grain.png'); /* optional */
  background-size: cover;
  opacity: 0.05;
  pointer-events: none;
  z-index: 0;
}

/* Optional soft gloss layer */
.kora-panel::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.05),
    transparent 30%,
    transparent 70%,
    rgba(0, 0, 0, 0.1)
  );
  pointer-events: none;
  z-index: 0;
}

/* Keep slotted content on top */
.kora-panel > * {
  position: relative;
  z-index: 1;
}
</style>
