<template>
  <div>
    {{ match?.status || 'unknown' }} at {{ startedF }}: {{ match.player1?.name || 'unknown' }} vs {{
    match.player2?.name || 'unknown'
    }}
  </div>
</template>

<script setup lang="ts">
import type { Match } from "~~/types/directus"
const props = defineProps<{
  match: Match,
}>()
const started = ref<Date | null>(null)
if (props.match.started) started.value = new Date(`${props.match.started}Z`)
onMounted(() => {
  console.log(started.value)
})
const df = new Intl.DateTimeFormat(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
const startedF = computed(() => {
  if (started.value) return df.format(started.value)
  else return 'unknown'
})

</script>