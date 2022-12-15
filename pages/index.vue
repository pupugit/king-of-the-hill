<template>
  <div class="page-index">
    <h1>King of the Hill TTA Matches</h1>
    <div class="page-loading" v-if="loading">Loading...</div>
    <div class="page-weeks" v-else-if="weeks.length">
      <BlockWeek v-for="week in weeks" :week="week" :key="week.id" />
    </div>
    <div class="page-error" v-else>
      No matches found or there was an error loading the data!
    </div>
  </div>
</template>

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
    content: 'Limnionas Village',
  }, {
    hid: 'og:title',
    name: 'og:title',
    property: 'og:title',
    content: 'King of the Hill'
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