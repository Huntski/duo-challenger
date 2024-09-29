<script setup lang="ts">
import { uuidv7 } from "uuidv7"
import { defineModel } from "vue"

const inputId = uuidv7();

const model = defineModel<boolean>({default: false});
</script>

<template>
  <div class="w-6 h-6 border-2 rounded-sm border-white relative bg-transparent shrink-0" :class="{ 'bg-white' : model}">
    <label :for="inputId" class="absolute cursor-pointer top-0 w-full h-full"></label>
    <input type="checkbox" :id="inputId" class="hidden" v-model="model">
  </div>
</template>
