import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '/products',
          name: 'Products',
          component: () => import('@/views/products/ProductView.vue'),
        },
        {
          path: '/products/create',
          name: 'CreateProduct',
          component: () => import('@/views/products/CreateProductView.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const token = localStorage.getItem('authToken')

  if (requiresAuth && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
