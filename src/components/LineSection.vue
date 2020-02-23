<template>
  <div class="line-section">
    <div
      v-for="train in secinfo.trains"
      :key="train.tr"
      class="train"
      :class="+train.ki ? 'down-train' : 'up-train'"
      :style="{
        backgroundColor: color[train.sy],
        borderLeft: train.sy === '9' ? '5px solid #d5007f' : '',
        borderRight: train.sy === '9' ? '5px solid #d5007f' : ''
      }"
    >
      <span>{{ ikisaki[train.ik] }}</span>
      <span>{{ train.tr }}</span>
      <span>un</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.line-section {
  color: #fff;
  text-align: center;
  .train {
    display: block;
    box-sizing: border-box;
    width: 50px;
    height: 60px;

    padding-top: 3px;
    margin: 3px;
    line-height: 1.1;

    span {
      display: inline-block;
    }
  }
  .up-train {
    border-radius: 10px 10px 0 0;
  }
  .down-train {
    border-radius: 0 0 10px 10px;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

export interface secinfo {
  pos: string;
  trains: {
    tr: string;
    sy: string;
    ki: string;
    dl: string;
    ik: string;
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
    9: "#000000",
    10: "#57A100"
  };
  ikisaki = {
    "001": "K新宿",
    "002": "笹塚",
    "006": "桜上",
    "008": "幡山",
    "012": "つつ",
    "016": "調布",
    "018": "飛給",
    "021": "東府",
    "022": "府中",
    "027": "高幡",
    "031": "北野",
    "032": "京八",
    "033": "N新宿",
    "036": "競馬",
    "037": "動物",
    "042": "高尾",
    "043": "高山",
    "048": "若葉",
    "050": "多セ",
    "052": "南大",
    "054": "橋本",
    "107": "岩本",
    "114": "大島",
    "118": "瑞江",
    "120": "本八",
    "300": "[新宿]",
    "301": "Ⓢ",
    "302": "[K新]",
    "303": "[調布]",
    "400": "[京八]",
    "401": "[高山]",
    "402": "[橋本]",
    "999": "-"
  };
}
</script>
