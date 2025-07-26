<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-4 font-sans bg-gray-50">
    <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
      <!-- Logo and Header -->
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-gray-900">Login</h2>
      </div>

      <!-- Error Message -->
      <div
        v-if="errorMessage"
        class="p-3 text-sm text-red-700 bg-red-100 border border-red-300 rounded-md"
      >
        {{ errorMessage }}
      </div>

      <!-- Success Message -->
      <div
        v-if="successMessage"
        class="p-3 text-sm text-green-700 bg-green-100 border border-green-300 rounded-md"
      >
        {{ successMessage }}
      </div>

      <!-- Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <!-- ... existing code ... -->
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700"> Username </label>
          <div class="relative mt-1">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              id="username"
              name="username"
              type="text"
              required
              v-model="username"
              class="block w-full px-10 py-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Username"
            />
          </div>
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
          <div class="relative mt-1">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                class="w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              v-model="password"
              class="block w-full px-10 py-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="••••••••"
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading">Signing in...</span>
            <span v-else>Sign in</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const response = ref(null)
const router = useRouter()

const handleLogin = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  isLoading.value = true

  try {
    const requestBody = JSON.stringify({
      username: username.value,
      password: password.value,
    })

    const fetchResponse = await fetch('http://localhost:3000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: requestBody,
    })

    const responseData = await fetchResponse.json()
    response.value = responseData

    if (fetchResponse.ok) {
      successMessage.value = responseData.message || 'Login successful!'

      if (responseData.data && responseData.data.token) {
        localStorage.setItem('authToken', responseData.data.token)
        router.push('/products')
      }
    } else {
      errorMessage.value = responseData.message || 'Login failed. Please try again.'
    }
  } catch (error) {
    errorMessage.value = 'Network error. Please check your connection and try again.'
    response.value = { error: error.message }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
