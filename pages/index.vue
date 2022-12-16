<template>
  <div class="page-index">
    <div class="page-loading" v-if="loading">Loading...</div>
    <div class="page-weeks" v-else-if="weeks.length">
      <BlockWeek v-for="week in weeks" :week="week" :key="week.id" />
    </div>
    <div class="page-error" v-else>
      No matches found or there was an error loading the data!
    </div>
    <div class="page-stream">
      watch it live on @
      <a style="font-weight:bold" target="_blank" href="https://www.twitch.tv/captain_sugoi">Captain Sugoi</a>
    </div>
  </div>
</template>
<style>
.page-index {
  display: grid;
  width: 100vw;
  height: 100vh;
  background-color: black;
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

.page-loading,
.page-error {
  background-color: antiquewhite;
  margin-top: 4vh;
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
</style>
<script setup lang="ts">
const loading = ref(true)
const weeks = useFullWeeks()
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

onMounted(async () => {
  await initFullWeeks()
  loading.value = false
})
</script>