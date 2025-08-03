<script setup lang="ts">
import { RouterView } from 'vue-router'
import  Header  from './components/HeaderView.vue'
import  Footer  from './components/FooterView.vue'

</script>

<template>

<div class="flex flex-col min-h-screen">
  <Header>Header</header>
  <div class="flex flex-col md:flex-row flex-grow m-auto ">
  <RouterView />
  </div>
  <Footer class="padding-md"></Footer>
</div>





</template>
