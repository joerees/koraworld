<template>
    <footer class="footer">


        <div class="w-full mx-auto px-4 sm:px-6 lg:px-8 py-2 self-end">
          <div class="flex flex-col md:flex-row justify-between items-center alsolute w-full top-0 right-0 left-0">
            <!-- Logo and Brand -->
            <div class="flex items-center space-x-3 mb-4 md:mb-0">
              <Logo />
            </div>

            <!-- Copyright -->
            <div class="text-center md:text-right">
              <p class="text-sm">
                © 2024 Music Notes Platform. All rights reserved.
              </p>
              <p class="text-xs mt-1">
                Empowering musicians through education
              </p>
            </div>
          </div>
        </div>


    </footer>
  </template>
<style>
.footer {
  color: #fcf1bf;
  position: relative;
  bottom:0;
  background-image: url('@/assets/footer.svg');
  background-repeat: no-repeat;
  background-position-y: bottom;
  background-position-x: right;
  background-size: cover;
  min-height: 50vh;
  display: flex;
  width: 100%;
}

.footer-logo {
    background: transparent;

}
</style>

  <script lang="ts" setup>

import Logo from '@/components/Logo.vue';

  </script>
