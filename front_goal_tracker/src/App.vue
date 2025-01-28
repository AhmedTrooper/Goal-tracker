<template>
  <navbar-component></navbar-component>
  <router-view></router-view>

</template>

<script>


import {defineComponent} from "vue";
import NavbarComponent from "./components/global/NavbarComponent.vue";

export default defineComponent({
  components: {NavbarComponent}
})
</script>

<style>

</style>