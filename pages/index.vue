<template>
  <div class="page-index">
    <div class="page-loading" v-if="loading">Loading...</div>
    <div class="page-weeks" v-else-if="currentWeek">
      <div class="page-week">
        <div :class="`history-left${canGoBack ? ' history-active' : ''}`" @click="goBack">&lsaquo;</div>
        <BlockWeek :week="currentWeek" :current-king="currentKing" />
        <div :class="`history-right${canGoForward ? ' history-active' : ''}`" @click="goForward">&rsaquo;</div>
      </div>
      <div class="page-matches">
        <div :class="`matches size-${currentMatches.length}`">
          <BlockMatch v-for="(match, idx) in currentMatches" :match="match" :idx="idx" :key="match.id"
            :class="`match match-${idx}`" />
        </div>
      </div>
    </div>
    <div class="page-error" v-else>
      No matches found or there was an error loading the data!
    </div>
    <div :class="`page-stream ${currentWeek ? currentWeek.status : ''}`">
      <span v-if="currentWeek?.status === 'running'" style="font-weight:bold;color:green">now live</span>
      <span v-else>on twitch</span> @
      <a style="font-weight:bold" target="_blank" href="https://www.twitch.tv/captain_sugoi">Captain Sugoi</a>
    </div>
  </div>
</template>

<script setup lang="ts">
const loading = ref(true)
const weeks = useFullWeeks()
const weekIdx = ref(0)
const currentWeek = computed(() => {
  if (weeks.value.length > 0) {
    return weeks.value[weekIdx.value]
  }
  return null
})
const currentKing = computed(() => {
  let ret = ''
  weeks.value.forEach((w) => {
    if (w.winner && ret === '') ret = w.winner.name
  })
  return ret
})
const currentMatches = computed(() => {
  if (currentWeek.value === null) return []
  return currentWeek.value.matches.sort((a, b) => {
    if (a.level < b.level) return 1
    if (a.level > b.level) return -1
    if (a.started && b.started && a.started > b.started) return 1
    return 0
  })
})

const canGoBack = computed(() => {
  if (weeks.value.length === 0) return false
  if (weekIdx.value < weeks.value.length - 1) return true
})

const goBack = () => {
  if (canGoBack.value)
    weekIdx.value += 1
}

const canGoForward = computed(() => {
  if (weeks.value.length === 0) return false
  if (weekIdx.value > 0) return true
})

const goForward = () => {
  if (canGoForward.value)
    weekIdx.value -= 1
}

onMounted(async () => {
  await loadFullWeeks()
  loading.value = false
  window.setInterval(() => {
    loadFullWeeks()
  }, 10000)
})

useHead({
  title: 'King of the Hill',
  link: [{
    rel: 'icon',
    href: 'https://kingofthehill.netlify.app/symbol.png',
    type: 'image/png'
  }],
  meta: [{
    name: 'description',
    content: 'King of the Hill'
  }, {
    hid: 'og:site_name',
    name: 'og:site_name',
    property: 'og:site_name',
    content: 'King of the Hill',
  }, {
    hid: 'og:title',
    name: 'og:title',
    property: 'og:title',
    content: 'commented "Through the Ages" matches'
  }, {
    hid: 'og:image',
    name: 'og:image',
    property: 'og:image',
    content: 'https://kingofthehill.netlify.app/logo.png'
  }, {
    hid: 'og:image:height',
    name: 'og:image:height',
    property: 'og:image:height',
    content: '500',
  }, {
    hid: 'og:image:width',
    name: 'og:image:width',
    property: 'og:image:width',
    content: '500',
  }, {
    hid: 'og:description',
    name: 'og:description',
    property: 'og:description',
    content: 'A "Through the Ages" commentated series of matches in the "King of the Hill" format'
  }]
})

</script>

<style>
.page-index {
  display: grid;
  width: 100vw;
  height: 100svw;
  height: 100vh;
  height: 100svh;
  background-image: url(/logo.png);
  background-size: contain;
  background-position: bottom center;
  background-repeat: no-repeat;
  place-items: start center;
  grid-template-rows: auto 1fr auto;
}

@media screen and (min-width: 500px) {
  .page-index {
    background-size: auto;
  }
}

.page-weeks {
  margin-top: 2vh;

}

.page-week {
  display: grid;
  grid-template-columns: auto 1fr auto;
  place-items: center;
}

.page-loading,
.page-error {
  background-color: antiquewhite;
  margin-top: 2vh;
  padding: 1em;
  border-radius: 2em;
}

.page-stream {
  background-color: antiquewhite;
  padding: .5em;
  border-radius: 2em;
  grid-row: 3/4;
  margin-bottom: 2vh;
}

.page-stream.running {
  animation-duration: 1s;
  animation-name: bounce;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.page-matches {
  margin-top: 2vh;
  display: grid;
  gap: 2vh;
  place-items: center;
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

@keyframes bounce {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }

  to {
    transform: translate3d(0, -10px, 0) scale(1.2);
  }
}

.history-left,
.history-right {
  background-color: black;
  padding: .5em;
  font-size: 1.5em;
  font-weight: bold;
  transition: all 1s;
}

.history-left {
  border-radius: 50% 0 0 50%;
}

.history-right {
  border-radius: 0 50% 50% 0;
}

.history-active {
  background-color: antiquewhite;
  cursor: pointer;
}
</style>