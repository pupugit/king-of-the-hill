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
})
const startedF = computed(() => {
  if (props.week.started) return df.format(new Date(`${props.week.started}Z`))
  else return 'unknown'
})

</script>
