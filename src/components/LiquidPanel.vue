<template>
  <div class="liquid-panel">
    <div class="panel-content">
      <header v-if="$slots.heading || $slots.subheading" class="panel-header">
        <h1 v-if="$slots.heading" class="panel-title">
          <slot name="heading" />
        </h1>
        <h2 v-if="$slots.subheading" class="panel-subtitle">
          <slot name="subheading" />
        </h2>
      </header>

      <div class="panel-body">
        <slot name="body" />
      </div>

      <div v-if="$slots.default" class="panel-default">
        <slot />
      </div>

      <footer v-if="$slots.citation" class="panel-citation">
        <slot name="citation" />
      </footer>
    </div>
  </div>
</template>

<style scoped>
.liquid-panel {
  position: relative;
  backdrop-filter: blur(8px);
  border-radius: 24px;
  padding: 1px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.05));
  margin-bottom: 2rem;
}

.panel-content {
  border-radius: 23px;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.1);
  color: white;
}

.panel-header {
  margin-bottom: 1rem;
}

.panel-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.25rem;
}

.panel-subtitle {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
}

.panel-body {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.panel-default {
  margin-bottom: 1rem;
}

.panel-citation {
  text-align: right;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.75rem;
}
</style>
