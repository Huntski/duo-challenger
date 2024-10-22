<script lang="ts" setup>
import { defineProps } from 'vue';
import { URL } from '@/store';

const props = defineProps<{src: URL}>()
</script>

<template>
  <div class="w-12 shrink-0 aspect-square bg-blue-500 rounded-full overflow-hidden">
    <img :src="props.src" alt="">
  </div>
</template>
