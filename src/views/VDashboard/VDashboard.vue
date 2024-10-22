<script setup lang="ts">
import ActivityBox from './ActivityBox'
import SideNavigation from './SideNavigation/index';
</script>

<template>
  <div class="grid grid-cols-4 items-start gap-10 p-20 max-w-[2000px] mx-auto">
    <div class="bg-gradient-to-b from-[#25273370] to-[#17192560] col-span-3 border-[5px] rounded-[1.5rem] border-[#1A1D27] shadow-xl flex h-full">
      <SideNavigation />

      <router-view />
    </div>

    <ActivityBox />
  </div>
</template>
