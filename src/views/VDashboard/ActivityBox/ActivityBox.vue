<script setup lang="ts">
import UserAvatar from './UserAvatar.vue'
import { BedIcon, ArrowRightIcon } from '@/components/@icons';
import { OtherUser, useMainStore } from '@/store';
import { computed } from 'vue';
import ActivityBox from './index';

const store = useMainStore()
const otherUsers = computed(() => store.otherUsers)

function doneAllTasks(userActivity: OtherUser) {
  return userActivity.tasks_count === userActivity.tasks_done
}

type activityState = 'done' | 'rest' | 'empty' | 'busy'

// TODO: The function is now run multible times to get the same Object; need to change this.
function createStatus(userActivity: OtherUser): { state: activityState, message: string } {
  if (userActivity.rest_day) return { state: 'rest', message: 'Resting today' }

  if (doneAllTasks(userActivity)) return { state: 'done', message: 'DONE FOR TODAY' }

  if (!userActivity.tasks_count) return { state: 'empty', message: 'No tasks' }

  return {
    state: 'busy',
    message: `${userActivity.tasks_done} out of ${userActivity.tasks_count} tasks left`
  }
}

// const ActivityState = {
//   Done: 'done',
//   Rest: 'rest',
//   Empty: 'empty',
//   Busy: 'busy',
// } as const

// type Test = keyof typeof ActivityState

const activityStyles: Record<activityState, string> = {
  'done': 'text-[#3CFF9A]',
  'rest': 'text-[#4E8FFF]',
  'empty': 'text-white',
  'busy': 'text-white',
} as const

console.log(activityStyles['done'])

function stateMessageStyling(state: activityState) {
  const styles = {
    'done': 'text-[#3CFF9A]',
    'rest': 'text-[#4E8FFF]',
    'empty': 'text-white',
    'busy': 'text-white'
  } as const

  return styles[state]
}
</script>

<template>
  <div class="bg-[#1B1D25] rounded-2xl py-10 px-12 text-white shadow-lg">
    <div class="flex items-center justify-between mb-12">
      <h2 class="text-2xl font-bold">Activity</h2>

      <button class="w-5 h-5 aspect-square cursor-pointer hover:scale-95 transition-transform">
        <ArrowRightIcon class="w-4" />
      </button>
    </div>

    <div class="grid gap-6">
      <div class="flex items-center gap-5" v-for="user in otherUsers" :key="user.id">
        <UserAvatar :src="user.avatar" />
        <div>
          <h3 class="text-xl font-bold">{{ user.user_name }}</h3>
          <span :class="stateMessageStyling(createStatus(user).state)">{{ createStatus(user).message }}</span>
        </div>

        <BedIcon class="ml-auto w-6 text-white" v-if="user.rest_day" />
      </div>
    </div>
  </div>
</template>
