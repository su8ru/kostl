import Vue from "vue";
import VueRouter from "vue-router";
import { Component, Mixin, Mixins } from "vue-mixin-decorator";

@Mixin
export default class TitleMixin extends Vue {
  created() {
    let title: string | undefined = this.$options.title;
    if (title) document.title = title;
  }
}
