import { createRouter, createWebHistory } from "vue-router"
import BlogRoutes from './blog-routes'

import Home from '../components/Home.vue'
import Egghead from '../components/Egghead.vue'
import PageNotFound from '../components/PageNotFound.vue'
import FailedAuth from '../components/FailedAuth.vue'

const routes = [
  ...BlogRoutes,
  {
    //show home path, only one of these can exist
    path: '/',
    component: Home,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/egghead',
    component: Egghead,
    meta: {
      requiresAuth: true,
    },
  },
  { path: '/failed', component: FailedAuth },
  { path: '/:pathMatch(.*)*', alias: '/pageNotFound', component: PageNotFound },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (isAuthenticated()) {
      next()
      return
    }
    next('/failed')
  }
  next()
})

function isAuthenticated() {
  return true
}

export default router