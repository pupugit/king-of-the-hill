<template>
  <div>
    <h1>Greetings and Salutations!</h1>
    <div v-if="loading">Loading...</div>
    <div v-else-if="matches.length">
      <BlockMatch v-for="match in matches" :match="match" :key="match.id" />
    </div>
    <div v-else>
      No matches found!
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(true)
const matches = useMatches()

onMounted(async () => {
  await initFullWeeks()
  loading.value = false
})

</script>