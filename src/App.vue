<template>
  <div id="app">
    <div class="black_line"></div>
    <div id="main">
      <router-view name="sidebar"></router-view>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
@import "./assets/reset.css";
</style>
