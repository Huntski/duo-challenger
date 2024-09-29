<script lang="ts" setup>
import {CheckboxField} from '@/components/@fields'
import { PlusIcon, MarkIcon, BedIcon, ArrowRightIcon } from "@/components/@icons";
import { ref } from 'vue';

export interface Task {
  id: number;
  dailytask_id: number;
  order?: number;
  content?: string;
  is_done?: boolean;
  inline?: boolean;
}

const dailyTaskId = 1;

export interface DailyTask {
  id: number;
  user_id: string;
  challenge_id: number;
  rest_day: boolean;
}

const dailyTask = {
  id: 33,
  user_id: 1,
  challenge_id: 1,
  rest_day: false
}

const editingTaskId = ref<number | undefined>(undefined)

const tasks = ref<Task[]>([
  {
    id: 1,
    dailytask_id: dailyTaskId,
    order: 1,
    content: 'Make it more obvious that the data shown on the album is about the actual album we have stored. Esse ea aute exercitation id. Irure qui est non consectetur veniam enim cupidatat cupidatat occaecat id aliquip dolore est veniam ipsum. Duis cupidatat irure consequat ad non nisi id. Minim ut sunt voluptate do velit aliquip in eiusmod non. Aliqua consectetur aliqua fugiat. Nisi enim nulla cupidatat veniam non nostrud ea eiusmod.',
    is_done: false,
    inline: false
  },
  {
    id: 2,
    dailytask_id: dailyTaskId,
    order: 2,
    content: '🚀 API Migrations',
    is_done: false,
    inline: false
  },
  {
    id: 3,
    dailytask_id: dailyTaskId,
    order: 3,
    content: 'When it was bought.',
    is_done: false,
    inline: true
  },
  {
    id: 4,
    dailytask_id: dailyTaskId,
    order: 4,
    content: 'Create required API calls list',
    is_done: false,
    inline: true
  },
  {
    id: 5,
    dailytask_id: dailyTaskId,
    order: 5,
    content: 'Add user list.',
    is_done: false,
    inline: true
  }
])

const newTask = ref('');

function createNewTask() {
  // Create new task and send to API

  tasks.value.push({
    id: 5,
    dailytask_id: dailyTaskId,
    order: tasks.value.length,
    content: newTask.value,
    is_done: false,
  })

  newTask.value = ''
}

function deleteTask(task_id: Task['id']) {
  // Delete existing task via ID

  console.log()

  tasks.value = tasks.value.filter(task => task.id !== task_id);
}

function toggleTaskTab(task: Task) {
  task.inline = !task.inline
}
</script>

<style lang="css">
.grow-wrap {
  /* easy way to plop the elements on top of each other and have them both sized based on the tallest one's height */
  display: grid;
  width: 100%;
  position: relative;
}
.grow-wrap::after {
  /* Note the weird space! Needed to preventy jumpy behavior */
  content: attr(data-replicated-value) " ";

  /* This is how textarea text behaves */
  white-space: pre-wrap;

  visibility: hidden;
}
.grow-wrap > textarea {
  resize: none;
  overflow: hidden;
}
.grow-wrap > textarea,
.grow-wrap::after {
  grid-area: 1 / 1 / 2 / 2;
}

.task-content-container:focus-within label {
  display: none;
}
.task-content-container:focus-within .grow-wrap {
  display: grid;
}
</style>

<template>
  <div class="text-white pl-4">
    <div class="flex items-center justify-between mb-10 p-20 pb-0">
      <div>
        <h1 class="text-2xl font-major">Good Morning!</h1>
        <h2 class="text-5xl font-extrabold uppercase">Today's Goals</h2>
      </div>

      <button class="bg-[#F9B0C3] text-[#46467A] font-regular font-bold px-5 py-3 rounded-lg flex gap-4">
        <span>Rest for today</span>
        <BedIcon class="w-6" />
      </button>
    </div>

    <div class="flex mb-10 px-20">
      <input class="pl-5 w-96 rounded-l-xl placeholder:text-[#6A6AAE] text-white font-bold bg-[#343464]" placeholder="Task for today..." v-model="newTask" @keydown.enter="createNewTask" />
      <button class="w-14 h-14 bg-[#675CAB] hover:bg-[#746abb] active:bg-[#5e54a0] flex items-center justify-center text-white rounded-r-xl">
        <PlusIcon class="w-5" />
      </button>
    </div>

    <div class="pr-24 pb-20">
      <div class="text-lg mb-3 group relative" :class="{'ml-10' : task.inline }" v-for="task in tasks" :key="task.id">
        <div class="px-3 flex gap-4 relative">
          <div class="pl-4 flex gap-2 items-center h-6">
            <MarkIcon @mousedown="deleteTask(task.id)" class="opacity-0 text-[#A2A2BC] h-6 group-hover:opacity-100 cursor-pointer hover:text-white" />

            <ArrowRightIcon @mousedown="toggleTaskTab(task)" class="opacity-0 text-[#A2A2BC] h-5 group-hover:opacity-100 cursor-pointer hover:text-white" :class="{ 'rotate-180' : task.inline }" />
          </div>

          <CheckboxField v-model="task.is_done" />

          <div class="transition-colors">
            <div class="grow-wrap grid w-full relative" :data-replicated-value="task.content">
              <textarea @keydown.tab.prevent="toggleTaskTab(task)" class="resize-none overflow-hidden w-full bg-transparent focus:outline-none" :id="String(task.id) + '-textarea'" v-model="task.content" rows="1"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
