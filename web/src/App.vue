<template>
  <div v-if="error">
    <h1>Loading error</h1>
    <p>
      {{ error }}
    </p>
  </div>
  <div v-else>
    <h1>Recent calls</h1>
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>IP</th>
          <th>Headers</th>
        </tr>
      </thead>
      <tbody>
        <CallRow v-for="call of calls" :call="call" />
      </tbody>
    </table>
  </div>
</template>

<script setup>

import CallRow from './components/CallRow.vue'
import { ref, onMounted } from 'vue'

const calls = ref([])
const error = ref('')

onMounted(async () => {
  try {
    const response = await fetch('/api/calls')
    calls.value = await response.json()
  } catch (err) {
    console.error(err)
    error.value = 'An error occured while loading recent calls: \n' + err
  }
})

</script>

<style scoped>

th {
  text-align: left;
}

</style>
