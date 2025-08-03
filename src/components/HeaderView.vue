<template>
  <header class="text-white shadow-elegant border-b border-border">
    <div class="max-w-5xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <router-link to="/">  <Logo /></router-link>
        
        </div>

        <!-- Navigation Links -->
        <nav class="hidden md:flex space-x-8">
          <router-link to="/">Home</router-link>
          <router-link to="/kora">Music Player</router-link>
          <router-link to="/about">Kora</router-link>

        </nav>

        <!-- Mobile Menu Button -->
        <button class="md:hidden text-primary-foreground">MUSIC</button>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import Logo from "@/components/Logo.vue";
</script>
