import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/dashboard'
import CloudResources from '../views/systemManagement/cloudResources' // 系统管理-云资源
import User from '../views/systemManagement/user' // 系统管理-用户管理

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    hidden: true
  }, {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    hidden: true
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    hidden: true
  },
  {
    path: '/cloudResources',
    name: 'CloudResources',
    component: CloudResources,
    hidden: true
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    hidden: true
  },
]

export const asyncRouterMap = routes

const originaPlush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originaPlush.call(this, location).catch((err) => err)
}

const router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
