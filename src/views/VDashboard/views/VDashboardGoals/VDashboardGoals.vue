<script lang="ts" setup>
import { CheckboxField } from '@/components/@fields';
import { MarkIcon, PlusIcon } from "@/components/@icons";
import { Task, useMainStore } from '@/store';
import { computed, ref } from 'vue';

const store = useMainStore()
const tasks = computed(() => store.getAllTasks)
const newTask = ref('');
const editingTask = ref<Task | undefined>(undefined)

function createNewTask() {
  store.createNewTask(newTask.value)
  newTask.value = ''
}

function deleteTask(task_id: Task['id']) {
  store.deleteTask(task_id)
}

function handleKeyDownEvent(e: KeyboardEvent) {
  console.log('editingtask:', editingTask.value)
  if (!editingTask.value) return

  if (e.key === 'Tab') {
    e.preventDefault()

    if (e.shiftKey) {
      return store.decreaseTabCount(editingTask.value.id)
    }
    return store.increaseTabCount(editingTask.value.id)
  }
}

function taskStyling(tab_count: Task['tab_count']) {
  const tabCountSpacing = {
    0: '',
    1: 'ml-10',
    2: 'ml-20'
  }

  return `text-lg mb-3 group relative ${tabCountSpacing[tab_count]}`
}
</script>

<template>
  <div class="text-white pl-4">
    <div class="flex items-center justify-between mb-10 p-20 pb-0">
      <div>
        <h1 class="text-4xl font-bold">Goals for today</h1>
      </div>
    </div>

    <div class="flex self-start justify-between w-96 mb-10 ml-20 bg-[#1A1C27] overflow-hidden rounded-lg shadow-inner border border-[#151722]">
      <input class="pl-5 w-full rounded-l-xl bg-transparent outline-none placeholder:text-[#717481] text-white" placeholder="Task for today..." v-model="newTask" @keydown.enter="createNewTask" />
      <button class="w-14 h-12 bg-transparent flex items-center justify-center text-white hover:bg-gray-800 active:bg-gray-700" @click="createNewTask">
        <PlusIcon class="w-4" />
      </button>
    </div>

    <div class="pr-24 pb-20 ml-5">
      <div :class="taskStyling(task.tab_count)" v-for="task in tasks" :key="task.id">
        <div class="px-3 flex gap-4 relative">
          <div class="pl-4 flex gap-2 items-center h-6">
            <MarkIcon @mousedown="deleteTask(task.id)" class="opacity-0 text-[#A2A2BC] h-6 group-hover:opacity-100 cursor-pointer hover:text-white" />
          </div>

          <CheckboxField v-model="task.is_done" />

          <div class="transition-colors w-full">
            <div class="grow-wrap grid relative" :data-replicated-value="task.content">
              <textarea @keydown="handleKeyDownEvent" v-model="task.content" @focus="editingTask = task" placeholder="To do..." class="resize-none overflow-hidden bg-transparent focus:outline-none" :id="String(task.id) + '-textarea'"  rows="1"></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
