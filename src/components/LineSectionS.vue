<template>
  <div
    class="line-section"
    :style="{
      justifyContent: +secinfo.trains[0].ki ? 'flex-start' : 'flex-end'
    }"
  >
    <div v-for="train in secinfo.trains" :key="train.tr" class="train-box">
      <div
        class="train"
        :class="[+train.ki ? 'down-train' : 'up-train']"
        :style="{ background: getStyle(train.tr, train.ki, train.sy) }"
      >
        <span class="ikisaki" :style="{ order: +train.ki ? 1 : 3 }">
          {{ ikisaki[train.ik] }}
        </span>
        <span :style="{ order: 2 }">{{ getTr(train.tr) }}</span>
        <span :style="{ order: +train.ki ? 3 : 1 }">
          {{ getUnyo(train.tr) }}
        </span>
      </div>
      <div
        v-if="!(train.dl % 60) === 0"
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
  flex-direction: row;
  color: #fff;
  text-align: center;

  .train-box {
    display: flex;
    margin: 3px;

    .train {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      width: 60px;
      height: 68px;

      padding-top: 3px;

      font-size: 0.95rem;
      font-weight: 500;
      line-height: 1.2;
      white-space: nowrap;

      border: 4px solid #fff;

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
import {
  OdptDestinationStation,
  OdptDirection,
  OdptOperator,
  OdptTrainType
} from "@/odpt.ts";

export interface secinfo {
  pos: string;
  trains: {
    tr: string;
    sy: string;
    ki: string;
    dl: number;
    ik: string;
    op: string;
  }[];
}

@Component
export default class LineSectionS extends Vue {
  @Prop({ required: true })
  secinfo!: secinfo;

  readonly odptListJson = require("@/assets/odpt_list.json");
  JapaneseHolidays = require("japanese-holidays");

  getTr = (odpt: string) => {
    let odptList = this.isHoliday
      ? this.odptListJson.holiday
      : this.odptListJson.weekday;

    if (odpt in odptList) return odptList[odpt].tr;
    return "[" + odpt + "]";
  };

  getUnyo = (odpt: string) => {
    let odptList = this.isHoliday
      ? this.odptListJson.holiday
      : this.odptListJson.weekday;

    if (odpt in odptList) return odptList[odpt].un;
    return "-";
  };

  getStyle = (odpt: string, ki: number, sy: string) => {
    let odptList = this.isHoliday
      ? this.odptListJson.holiday
      : this.odptListJson.weekday;

    if (odpt in odptList) {
      if ("sy" in odptList[odpt]) {
        let rightColor: string = this.color[sy];
        let leftColor: string = this.color[odptList[odpt].sy];
        if (ki) [leftColor, rightColor] = [rightColor, leftColor];
        let leftPer = "60%";
        let rightPer = "63%";
        let tilt = !ki ? "82deg" : "98deg";
        return `linear-gradient(${tilt}, ${leftColor} 0%, ${leftColor} ${leftPer}, ${rightColor} ${rightPer}, ${rightColor} 100%)`;
      }
    }
    return this.color[sy];
  };

  get isHoliday(): boolean {
    let date = new Date();
    date.setHours(date.getHours() - 3);
    return (
      date.getDay() == 0 ||
      date.getDay() == 6 ||
      this.JapaneseHolidays.isHolidayAt(date)
    );
  }

  color = {
    Express: "#dc0000",
    Local: "#7eb500",
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
  } as { [key: string]: string; [key: number]: string };
  ikisaki = {
    Shinjuku: "N新宿",
    Sasazuka: "笹塚",
    Sakurajosui: "桜上水",
    HachimanYama: "八幡山",
    Tsutsujigaoka: "つつじ",
    KeioTamaCenter: "多摩セ",
    Hashimoto: "橋本",
    Takahatafudo: "高幡",
    TamaDobutsukoen: "動物",
    Takaosanguchi: "高尾山",
    KeioHachioji: "京八",
    Motoyawata: "本八幡",
    Mizue: "瑞江",
    Ojima: "大島",
    Iwamotocho: "岩本町"
  } as { [key: string]: string };
}
</script>
