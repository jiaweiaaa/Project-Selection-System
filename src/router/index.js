import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Layout from '../layout/index.vue'
import openTimeApi from '../api/oenTime'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
      path: '/home',
      name: 'Home',
      component: Layout,
      redirect: '/home/index',
      children: [
        {
          path: 'index',
          name: 'HomeIndex',
          component: () => import('@/views/home/index'),
        }
      ]
  },
  {
    path: '/PersonalInformation',
    name: 'PersonalInformation',
    component: Layout,
    redirect: '/PersonalInformation/index',
    children: [
      {
        path: 'index',
        name: 'PersonalInformation',
        component: () => import('@/views/PersonalInformation/index'),
      }
    ]
},
{
  path: '/ChangePassword',
  name: 'ChangePassword',
  component: Layout,
  redirect: '/ChangePassword/index',
  children: [
    {
      path: 'index',
      name: 'ChangePassword',
      component: () => import('@/views/ChangePassword/index'),
    }
  ]
},
  {
    path: '/groups',
    name: 'Groups',
    component: Layout,
    redirect: '/groups/index',
    children: [
      {
        path: 'index',
        name: 'HomeIndex',
        component: () => import('@/views/groups/index'),
      }
    ]
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Layout,
    redirect: '/projects/index',
    children: [
      {
        path: 'index',
        name: 'HomeIndex',
        component: () => import('@/views/projects/index'),
      }
    ]
  },
  {
    path: '/announcement',
    name: 'Announcement',
    component: Layout,
    children: [
      {
        path: 'detail/:id',
        name: 'AnnouncementDetail',
        component: () => import ('@/views/announcement/detail')
      }
    ]
  },
  {
    path: '/notOpen',
    name: 'NotOpen',
    component: () => import ('@/views/NotOpen')
  }
  

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


let whiteList = [
  'NotOpen'
]

router.beforeEach((to, from, next) => {

  if (whiteList.indexOf(to.name) != -1) {
    next()
  }

  openTimeApi.isStudentSystemOpen().then(response => {
    if (response.data.isOpen) {
      next()
    } else {
      next({
        name: 'NotOpen'
      })
    }
  })
})

export default router
