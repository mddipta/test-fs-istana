<template>
  <div class="flex items-center justify-center min-h-screen p-4 bg-gray-50 sm:p-6 lg:p-8">
    <div class="w-full max-w-6xl mx-auto">
      <TableComponent :columns="productColumns" :items="productItems">
        <template #header>
          <h2 class="text-2xl font-bold text-gray-800">Manage Products</h2>
          <button
            @click="handleCreateProduct"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add New Product
          </button>
        </template>

        <template #cell(price)="{ item }">
          <span class="font-medium text-gray-900">{{ formatRupiah(item.price) }}</span>
        </template>

        <template #cell(stock)="{ item }">
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            :class="item.stock > 20 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
          >
            {{ item.stock }} in stock
          </span>
        </template>

        <template #cell(actions)="{ item }">
          <div class="flex items-center space-x-4">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-800">Edit</a>
            <a href="#" class="font-medium text-red-600 hover:text-red-800">Delete</a>
          </div>
        </template>
      </TableComponent>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TableComponent from '../../components/TableComponent.vue'

const router = useRouter()

const formatRupiah = (amount) => {
  return 'Rp ' + parseFloat(amount).toLocaleString('id-ID')
}

const productColumns = ref([
  { key: 'name', label: 'Name' },
  { key: 'code', label: 'code' },
  { key: 'price', label: 'Price' },
  { key: 'stock', label: 'Stock' },
  { key: 'actions', label: 'Actions' },
])

const productItems = ref([])

const fetchProducts = async () => {
  try {
    const token = localStorage.getItem('authToken')

    const response = await fetch('http://localhost:3000/api/v1/products', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    const data = await response.json()

    if (response.ok) {
      productItems.value = data.data || data
    } else {
      console.error('Error fetching products:', data.message)
      if (response.status === 401) {
        localStorage.removeItem('authToken')
      }
    }
  } catch (error) {
    console.error('Error fetching products:', error)
  }
}

const handleCreateProduct = () => {
  router.push({ name: 'CreateProduct' })
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped></style>
