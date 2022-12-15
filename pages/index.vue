<template>
  <div>
    <h1>Greetings and Salutations!</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="weeks.length">
      <BlockWeek v-for="week in weeks" :week="week" :key="week.id" />
    </div>
    <div v-else>
      No matches found!
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(true)
const weeks = useFullWeeks()

onMounted(async () => {
  await initFullWeeks()
  loading.value = false
})

</script>