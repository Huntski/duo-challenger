<script setup lang="ts">
import ActivityBox from './ActivityBox.vue'
</script>

<template>
  <div class="grid grid-cols-4 gap-20 p-20">
    <div class="bg-gradient-to-b from-[#25273370] to-[#17192560] col-span-3 border-[5px] rounded-[1rem] border-[#1A1D27] shadow-xl">
      <router-view/>
    </div>

    <ActivityBox />
  </div>
</template>
