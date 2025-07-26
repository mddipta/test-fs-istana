<template>
  <div class="min-h-screen bg-gray-100 font-sans">
    <header class="bg-white shadow-sm sticky top-0 z-10">
      <nav class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <div class="flex items-center space-x-8">
            <!-- Navigation Links for Desktop -->
            <div class="hidden md:flex space-x-4">
              <router-link
                to="/products"
                class="px-3 py-2 text-gray-600 rounded-md text-sm font-medium hover:text-indigo-600 hover:bg-gray-50 transition-colors"
                active-class="text-indigo-600 bg-indigo-50"
              >
                Products
              </router-link>
            </div>
          </div>

          <!-- Right side: Logout Button -->
          <div class="flex items-center">
            <button
              @click="handleLogout"
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto p-4 sm:p-6 lg:p-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('authToken')
  router.push('/login')
}
</script>

<style scoped></style>
