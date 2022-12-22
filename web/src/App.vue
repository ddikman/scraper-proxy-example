<template>
  <h1>Coming</h1>
  <p>This page will display the most recent calls to the API endpoint.</p>
</template>

<script setup>

import { ref, onMounted } from 'vue'

const calls = ref([])

onMounted(async () => {
  const response = await fetch('/api/calls')
  calls.value = await response.json()
})

</script>

<style>
</style>
