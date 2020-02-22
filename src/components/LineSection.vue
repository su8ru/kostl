<template>
  <div class="line-section">
    <div
      v-for="train in secinfo.trains"
      :key="train.tr"
      class="train"
      :class="train.tr % 2 ? 'down-train' : 'up-train'"
      :style="{ backgroundColor: color[train.sy] }"
    >
      <span>{{ typeDict[train.sy] }}</span>
      <span>{{ train.tr }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.line-section {
  color: #fff;
  text-align: center;
}
.up-train {
  border-radius: 10px 10px 0 0;
}
.down-train {
  border-radius: 0 0 10px 10px;
}
</style>

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
  color = {
    1: "#cf167c",
    2: "#05B08D",
    3: "#0F4E8C",
    4: "#F79328",
    5: "#D3C427",
    6: "#808285",
    7: "#808285",
    8: "#808285",
    9: "#C30175",
    10: "#57A100"
  };
}
</script>
