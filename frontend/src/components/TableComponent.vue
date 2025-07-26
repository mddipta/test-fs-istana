<template>
  <div class="w-full p-6 bg-white rounded-xl shadow-lg">
    <div class="flex items-center justify-between mb-6">
      <slot name="header">
        <h2 class="text-2xl font-bold text-gray-800">Items</h2>
      </slot>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full text-sm text-left text-gray-500">
        <thead class="text-xs text-indigo-800 uppercase bg-indigo-50 rounded-t-lg">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              scope="col"
              class="px-6 py-4 font-semibold tracking-wider"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, itemIndex) in items"
            :key="item.id || itemIndex"
            class="bg-white border-b last:border-b-0 hover:bg-gray-50"
          >
            <td v-for="column in columns" :key="column.key" class="px-6 py-4">
              <slot :name="`cell(${column.key})`" :item="item">
                {{ item[column.key] }}
              </slot>
            </td>
          </tr>

          <tr v-if="items.length === 0">
            <td :colspan="columns.length" class="py-12 text-center text-gray-400">
              No data available.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
defineProps({
  columns: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
/* Add any additional scoped styles if needed */
</style>
