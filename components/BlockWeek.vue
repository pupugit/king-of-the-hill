<template>
  <div class="block-week">
    <h2>Week {{ week.nr }}: {{ startedF }}<br /><span style="font-weight: normal;font-size: .75em;">
        Hosted by <strong>Sugoi</strong> <template v-if="week.cohost"> and <strong style="color:green">{{
          week.cohost.name
        }}</strong></template><br />
        <template v-if="week.status === 'upcoming'">
          Who can dethrown King <strong style="color:red">{{ currentKing }}</strong>?<br />
          Starting in <strong>{{ startingIn }}</strong>
        </template>
        <template v-else-if="week.status === 'running'">
          Who can dethrown King <strong style="color:red">{{ currentKing }}</strong>?<br />
          currently running
        </template>
        <div v-else-if="week.status === 'finished' && week.winner" class="week-winner">
          <img src="/challenge_trophy_golden_cup.png" style="width: 1em;">
          <span>The King of the Hill was <strong>{{ week.winner.name }}</strong></span>
          <img src="/challenge_trophy_golden_cup.png" style="width: 1em;">
        </div>
      </span></h2>
    <div :class="`matches size-${matches.length}`">
      <BlockMatch v-for="(match, idx) in matches" :match="match" :idx="idx" :key="match.id"
        :class="`match match-${idx}`" />
    </div>
  </div>
</template>
<style>
.week-winner {
  display: grid;
  grid-auto-flow: column;
  gap: .25em;
  place-items: center;
}

.block-week {
  margin-top: 2vh;
  display: grid;
  gap: 2vh;
  place-items: center;
}

.block-week h2 {
  margin: 0;
  background-color: antiquewhite;
  padding: .75em;
  border-radius: 1em;
  text-align: center;
}

.matches {
  display: grid;
  gap: 2vh;
}

.match-0 {
  grid-area: match-0;
}

.match-1 {
  grid-area: match-1;
}

.match-2 {
  grid-area: match-2;
}

.matches.size-3 {
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: '. match-0 match-0 .' 'match-1 match-1 match-2 match-2';
}

.matches.size-2 {
  grid-template-areas: 'match-0' 'match-1';
}
</style>
<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns'
import type { FullWeek } from "~~/types/directus"
const props = defineProps<{
  week: FullWeek,
  currentKing: string,
}>()
const startingIn = ref('')
onMounted(() => {
  if (started.value)
    startingIn.value = formatDistanceToNow(started.value)
  window.setInterval(() => {
    if (started.value)
      startingIn.value = formatDistanceToNow(started.value)
  }, 60000)
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
const matches = computed(() => {
  return props.week.matches.sort((a, b) => {
    if (a.level < b.level) return 1
    if (a.level > b.level) return -1
    if (a.started && b.started && a.started > b.started) return 1
    return 0
  })
})
</script>
