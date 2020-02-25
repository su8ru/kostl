<template>
  <div
    class="line-section"
    :style="{
      flexDirection: +secinfo.trains[0].ki ? 'column-reverse' : 'column'
    }"
  >
    <div v-for="train in secinfo.trains" :key="train.tr" class="train-box">
      <div
        class="train"
        :class="[
          +train.ki ? 'down-train' : 'up-train',
          { 'keio-liner': train.sy === '9' }
        ]"
        :style="{
          backgroundColor: color[train.sy]
        }"
      >
        <span class="ikisaki">{{ ikisaki[train.ik] }}</span>
        <span>{{ train.tr }}</span>
        <span>-</span>
      </div>
      <div
        v-if="train.dl !== '00'"
        class="delay"
        :style="{
          order: +train.ki ? -1 : 1
        }"
      >
        + {{ +train.dl }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.line-section {
  display: flex;
  color: #fff;
  text-align: center;
  .train-box {
    display: flex;
    flex-direction: column;
    margin: 3px;

    .train {
      display: block;
      box-sizing: border-box;
      width: 50px;
      height: 60px;

      padding-top: 3px;

      font-size: 0.95rem;
      font-weight: 500;
      line-height: 1.2;

      span {
        display: block;
      }
    }

    .up-train {
      border-radius: 10px 10px 0 0;
    }

    .down-train {
      border-radius: 0 0 10px 10px;
    }

    .keio-liner {
      position: relative;
    }
    .keio-liner::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
      border-left: 6px solid #d5007f;
      border-right: 6px solid #d5007f;
      border-radius: inherit;
    }

    .delay {
      color: #da007a;
      font-weight: 900;
      line-height: 1;
      font-size: 0.9rem;
      margin: 3px 0 3px 0;
    }
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
