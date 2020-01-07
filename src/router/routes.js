
const routes = [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { name: 'home', path: '/', component: () => import('components/Venues'), meta: { auth: true } }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
