<template>
  <div class="line-section">
    <div v-for="train in secinfo.trains" :key="train.tr" class="train">
      <span>{{ typeDict[train.sy] }}</span>
      <span>{{ train.tr }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

export interface secinfo {
  pos: string;
  trains: {
    tr: string;
    sy: string;
  }[];
}

@Component
export default class Section extends Vue {
  @Prop({ required: true })
  secinfo!: secinfo;

  typeDict = {
    1: "特",
    2: "急",
    3: "快",
    4: "準",
    5: "区",
    6: "各",
    7: "",
    8: "",
    9: "KL",
    10: "臨"
  };
}
</script>
