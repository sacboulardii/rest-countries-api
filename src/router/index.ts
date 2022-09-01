import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFound from '@/views/HomeView.vue'
import DetailView from '@/views/DetailView.vue'

const routes: Array<RouteRecordRaw> = [
  // Default route: fetch all countries
  {
    path: '/',
    name: 'home',
    component: HomeView,
    props: true,
  },
  // Detail route: fetch country details
  {
    path: '/details/:countryName',
    name: 'detail',
    component: DetailView,
    props: true,
  },
  // Filter route: fetch countries by region
  {
    path: '/:region',
    name: 'region',
    component: HomeView,
  },
  // Search route: fetch countries matching the search query
  {
    path: '/search/:search',
    name: 'search',
    component: HomeView,
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

/* A router hook that is called after each navigation. It is used to store the last route name in local
storage. */
router.afterEach((to, from): void => {
  const lastRouteName = from.name as string
  localStorage.setItem('LAST_ROUTE_NAME', lastRouteName)
})

export default router
