<template>
  <NuxtPage />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');

body {
  padding: 0;
  margin: 0;
  font-family: 'Ubuntu', sans-serif;
  background-color: black;
}

@keyframes bounce {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }

  to {
    transform: translate3d(0, -10px, 0) scale(1.2);
  }
}
</style>
