<template>
  <div class="block-match">
    <div>
      {{ startedF }}
    </div>
    <div>
      <strong>{{ match.player1?.name || '?' }}</strong>
      <br />vs<br />
      <strong>{{ match.player2?.name || '?' }}</strong>
    </div>
  </div>
</template>
<style>
.block-match {
  background-color: antiquewhite;
  padding: .5em;
  border-radius: 1em;
  text-align: center;
}
</style>
<script setup lang="ts">
import type { Match } from "~~/types/directus"
const props = defineProps<{
  match: Match,
}>()
const started = ref<Date | null>(null)
if (props.match.started) started.value = new Date(`${props.match.started}Z`)
const df = new Intl.DateTimeFormat(undefined, {
  // year: 'numeric',
  // month: 'short',
  // weekday: 'short',
  // day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})
const startedF = computed(() => {
  if (started.value) return df.format(started.value)
  else return 'unknown'
})
</script>