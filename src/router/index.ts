import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const loadView = (path: string) => {
  return () =>
    import(/* webpackChunkName: "view-[request]" */ `@/views/${path}.vue`)
}

const routes: Array<RouteRecordRaw> = [
  // Default route: fetch all countries
  {
    path: '/',
    name: 'home',
    component: loadView('HomeView'),
    props: true,
  },
  // Detail route: fetch country details
  {
    path: '/details/:countryName',
    name: 'detail',
    component: loadView('DetailView'),
    props: true,
  },
  // Filter route: fetch countries by region
  {
    path: '/region/:region',
    name: 'region',
    component: loadView('HomeView'),
  },
  // Search route: fetch countries matching the search query
  {
    path: '/search/:search',
    name: 'search',
    component: loadView('HomeView'),
  },
  // Catch all route: catch invalid path
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: loadView('NotFound'),
  },
  // 404 route: resource not found error
  {
    path: '/404/:resource',
    name: '404Resource',
    component: loadView('NotFound'),
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
