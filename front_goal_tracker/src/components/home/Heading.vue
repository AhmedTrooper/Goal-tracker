<script setup>
const {goals} = defineProps(['goals']);
</script>

<template>
<h1 class="text-center p-5 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-black to-white ">
  Latest goals
  <span class="font-normal text-xl">
    ( total : {{goals}} )
  </span>
</h1>
</template>

<style scoped>

</style>