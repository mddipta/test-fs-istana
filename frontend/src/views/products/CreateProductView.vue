<template>
  <div class="w-full max-w-2xl mx-auto">
    <div class="p-8 bg-white rounded-xl shadow-lg">
      <h2 class="text-2xl font-bold text-gray-800 mb-1">Create New Product</h2>

      <div
        v-if="message"
        class="mb-4 p-4 rounded-md"
        :class="messageType === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'"
      >
        {{ message }}
      </div>

      <form @submit.prevent="handleSaveProduct" class="space-y-6">
        <div>
          <label for="product-code" class="block text-sm font-medium text-gray-700">
            Product Code
          </label>
          <div class="mt-1">
            <input
              id="product-code"
              type="text"
              required
              v-model="product.code"
              class="block w-full px-4 py-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="ANS78"
            />
          </div>
        </div>
        <div>
          <label for="product-name" class="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <div class="mt-1">
            <input
              id="product-name"
              type="text"
              required
              v-model="product.name"
              class="block w-full px-4 py-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g., 14-inch MacBook Pro"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label for="product-price" class="block text-sm font-medium text-gray-700">
              Price
            </label>
            <div class="relative mt-1">
              <div class="absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none">
                <span class="text-gray-500 sm:text-sm">Rp.</span>
              </div>
              <input
                id="product-price"
                type="number"
                step="0.01"
                min="0"
                required
                v-model="product.price"
                class="block w-full pl-7 pr-4 py-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0"
              />
            </div>
          </div>
          <div>
            <label for="product-stock" class="block text-sm font-medium text-gray-700">
              Stock Quantity
            </label>
            <div class="mt-1">
              <input
                id="product-stock"
                type="number"
                min="0"
                required
                v-model="product.stock"
                class="block w-full px-4 py-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-4 space-x-4 border-t border-gray-200">
          <button
            type="button"
            @click="handleCancel"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="isLoading"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {{ isLoading ? 'Saving...' : 'Save Product' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const product = reactive({
  code: '',
  name: '',
  price: null,
  stock: null,
})

const isLoading = ref(false)
const message = ref('')
const messageType = ref('')

const handleSaveProduct = async () => {
  isLoading.value = true
  message.value = ''

  try {
    const token = localStorage.getItem('authToken')

    if (!token) {
      message.value = 'Authentication token not found. Please login again.'
      messageType.value = 'error'
      return
    }

    const response = await fetch('http://localhost:3000/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    })

    const data = await response.json()

    if (response.ok) {
      message.value = 'Product created successfully!'
      messageType.value = 'success'

      Object.assign(product, {
        code: '',
        name: '',
        price: null,
        stock: null,
      })

      setTimeout(() => {
        router.push('/products')
      }, 2000)
    } else {
      message.value = data.message || 'Failed to create product'
      messageType.value = 'error'

      if (response.status === 401) {
        localStorage.removeItem('authToken')
        router.push('/login')
      }
    }
  } catch (error) {
    console.error('Error creating product:', error)
    message.value = 'Network error. Please try again.'
    messageType.value = 'error'
  } finally {
    isLoading.value = false
  }
}

const handleCancel = () => {
  router.push('/products')
}
</script>
