<template>
  <div :class="`block-match ${match.status}`">
    <div class="block-match-header">
      {{ startedF }}
    </div>
    <div class="block-match-details">
      <div class="player-info">
        <img v-if="match.player1 && match.winner && match.winner.id === match.player1.id" src="/culture_icon.png"
          style="width: 1em;">
        <strong>{{ match.player1?.name || '?' }}</strong>
        <img v-if="match.player1 && match.winner && match.winner.id === match.player1.id" src="/culture_icon.png"
          style="width: 1em;">
      </div>
      <div><img style="width: 2em;" :src="`/war_${vsColor}.png`">
      </div>
      <div class="player-info">
        <img v-if="match.player2 && match.winner && match.winner.id === match.player2.id" src="/culture_icon.png"
          style="width: 1em;"><strong>{{ match.player2?.name || '?' }}</strong>
        <img v-if="match.player2 && match.winner && match.winner.id === match.player2.id" src="/culture_icon.png"
          style="width: 1em;">
      </div>
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

.block-match.running {
  background-color: burlywood;
  animation-duration: 2s;
  animation-name: bounce;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.block-match.finished {
  background-color: darkseagreen;
}

.block-match-header {
  border-bottom: 1px solid black;
  margin-bottom: .25em
}

.block-match-details {
  display: grid;
  gap: .2em;
}

.player-info {
  display: grid;
  grid-auto-flow: column;
  gap: .25em;
  place-items: center;
}
</style>
<script setup lang="ts">
import type { Match } from "~~/types/directus"
const props = defineProps<{
  match: Match,
  idx: number
}>()
const vsColor = computed(() => {
  if (props.idx === 0) return 'yellow'
  if (props.idx === 1) return 'red'
  if (props.idx === 2) return 'green'
})
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
