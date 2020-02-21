<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class Layout extends Vue {}
</script>
