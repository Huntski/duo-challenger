import { defineStore } from 'pinia'

// other_users: [],

export type URL = string

export interface User {
  id: number
  user_name: string
  timezone?: string
  avatar?: URL
}

export interface OtherUser {
  id: User['id']
  user_name: User['user_name']
  avatar: URL
}

export interface DailyTask {
  id: number
  user_id: string
  challenge_id: string
  rest_day?: boolean
}

export interface Task {
  id: number
  dailytask_id?: number
  tab_count: 0 | 1 | 2
  order?: number
  content?: string
  is_done?: boolean
}

export type RootState = {
  account: User
  other_users: OtherUser[]
  tasks: Task[]
  // dailyTasks?: DailyTask[]
}

export const useMainStore = defineStore({
  id: 'mainStore',
  state: () =>
    ({
      account: {
        id: 1,
        user_name: 'Wieb',
        timezone: 'UTC',
        avatar:
          'https://i.pinimg.com/736x/67/1d/8a/671d8a97e745f81fb1ec50d7fb339d3c.jpg',
      },

      other_users: [
        {
          id: 2,
          user_name: 'Weeb',
          avatar:
            'https://i.pinimg.com/736x/67/1d/8a/671d8a97e745f81fb1ec50d7fb339d3c.jpg',
        },
        {
          id: 3,
          user_name: 'Umi',
          avatar:
            'https://i.pinimg.com/736x/67/1d/8a/671d8a97e745f81fb1ec50d7fb339d3c.jpg',
        },
        {
          id: 4,
          user_name: 'Korey',
          avatar:
            'https://i.pinimg.com/736x/67/1d/8a/671d8a97e745f81fb1ec50d7fb339d3c.jpg',
        },
        {
          id: 5,
          user_name: 'Weeb',
          avatar:
            'https://i.pinimg.com/736x/67/1d/8a/671d8a97e745f81fb1ec50d7fb339d3c.jpg',
        },
      ],

      tasks: [
        {
          id: 1,
          dailytask_id: 1,
          order: 1,
          content:
            'Make it more obvious that the data shown on the album is about the actual album we have stored.',
          is_done: false,
          tab_count: 0,
        },
        {
          id: 2,
          dailytask_id: 1,
          order: 2,
          content: '🚀 API Migrations',
          is_done: false,
          tab_count: 0,
        },
        {
          id: 3,
          dailytask_id: 1,
          order: 3,
          content: 'When it was bought.',
          is_done: false,
          tab_count: 1,
        },
        {
          id: 4,
          dailytask_id: 1,
          order: 4,
          content: 'Create required API calls list',
          is_done: false,
          tab_count: 1,
        },
        {
          id: 5,
          dailytask_id: 1,
          order: 5,
          content: 'Add user list.',
          is_done: false,
          tab_count: 1,
        },
      ],
    } as RootState),

  actions: {
    createNewTask(newTask: Task['content']) {
      const newTaskId = !this.tasks.length
        ? 1
        : this.tasks[this.tasks.length - 1].id + 1

      this.tasks.push({
        id: newTaskId,
        content: newTask,
        tab_count: 0,
        order: this.tasks.length,
        is_done: false,
      })
    },

    editTaskContent(
      task_id: Task['id'],
      { content, order, is_done }: Pick<Task, 'order' | 'content' | 'is_done'>
    ) {
      this.tasks = this.tasks?.filter((task) => {
        if (task.id === task_id) {
          task.order = order
          task.content = content
          task.is_done = is_done
          return task
        }
        return task
      })
    },

    deleteTask(task_id: Task['id']) {
      this.tasks = this.tasks.filter((task) => task.id !== task_id)
    },

    increaseTabCount(task_id: Task['id']) {
      this.tasks = this.tasks?.filter((task) => {
        if (task.id === task_id && task.tab_count < 2) task.tab_count++
        return task
      })
    },

    decreaseTabCount(task_id: Task['id']) {
      console.log('task edit')
      this.tasks = this.tasks?.filter((task) => {
        if (task.id === task_id && task.tab_count > 0) task.tab_count--
        return task
      })
    },
  },

  getters: {
    account: (state) => state.account,
    otherUsers: (state) => state.other_users,
    getAllTasks: (state) => state.tasks,
  },
})
