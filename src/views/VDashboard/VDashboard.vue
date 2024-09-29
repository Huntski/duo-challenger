<script setup lang="ts">
import OtherUserStatesField from './OtherUserStatesField.vue'
</script>

<template>
  <div class="grid grid-cols-4 gap-20 p-20">
    <div class="bg-[#46467A] col-span-3 border-[5px] rounded-3xl rounded-l-[4rem] border-white shadow-xl">
      <router-view/>
    </div>

    <div class="bg-white">
      <OtherUserStatesField />
    </div>
  </div>
</template>
