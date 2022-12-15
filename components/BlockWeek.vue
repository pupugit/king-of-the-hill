<template>
  <div class="block-week">
    <h2>Week {{ week.nr }}: {{ startedF }}</h2>
    <BlockMatch v-for="match in week.matches" :match="match" :key="match.id" />
  </div>
</template>

<script setup lang="ts">
import type { FullWeek } from "~~/types/directus"
const props = defineProps<{
  week: FullWeek,
}>()
onMounted(() => {
  console.log(props.week)
})
const started = ref<Date | null>(null)
if (props.week.started) started.value = new Date(`${props.week.started}Z`)
const df = new Intl.DateTimeFormat(undefined, {
  year: 'numeric',
  month: 'short',
  weekday: 'short',
  day: 'numeric',
  // hour: '2-digit',
  // minute: '2-digit'
})
const startedF = computed(() => {
  if (started.value) return df.format(started.value)
  else return 'unknown'
})

</script>