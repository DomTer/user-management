import Vue        from 'vue'
import VueRouter  from 'vue-router'
import Home       from '../views/Home.vue'
import Login      from '../views/Login.vue'
import Users      from '../views/Users.vue'
import Roles      from '../views/Roles.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/roles',
    name: 'Roles',
    component: Roles
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
