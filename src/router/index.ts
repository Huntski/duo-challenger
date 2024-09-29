import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {VDashboard, VDashboardGoals} from '../views'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: VDashboard,
    children: [
      {
        path: '/',
        name: 'DashboardGoals',
        component: VDashboardGoals
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
