import { createRouter, createWebHistory } from 'vue-router'
import auth from './auth'
import admin from './admin'
import director from './director'
import financier from './financier'
import student from './student'
import teacher from './teacher'
import page_not_fount from './page_not_fount'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    auth,
    admin,
    director,
    financier,
    student,
    teacher,
    page_not_fount
  ]
})
export default router