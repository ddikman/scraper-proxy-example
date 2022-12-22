<template>
    <tr>
        <td>{{ call.created_at }}</td>
        <td>{{ call.ip ?? '<none>' }}</td>
        <td>
            <button @click="expanded = !expanded">
                {{ expanded ? 'Hide' : 'Show' }}
            </button>
            <div v-if="expanded">
                <pre>{{ headers }}</pre>
            </div>
        </td>
    </tr>
</template>

<script setup>

import { ref, computed } from 'vue'

const props = defineProps({
    'call': {
        type: Object,
        required: true
    }
})

const expanded = ref(false)
const headers = computed(() => {
    return JSON.stringify(JSON.parse(props.call.headers), null, 2)
})

</script>

<style scoped>

th, td {
  padding: 0.5rem;
}

</style>