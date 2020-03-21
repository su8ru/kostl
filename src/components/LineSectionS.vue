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
        :class="[+train.ki ? 'down-train' : 'up-train']"
        :style="{ background: color[train.sy] }"
      >
        <span class="ikisaki" :style="{ order: +train.ki ? 1 : 3 }">
          {{ ikisaki[train.ik] }}
        </span>
        <span :style="{ order: 2 }">[{{ train.tr }}]</span>
        <span :style="{ order: +train.ki ? 3 : 1 }">
          -
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
  color: #fff;
  text-align: center;
  .train-box {
    display: flex;
    flex-direction: row;
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

interface colors {
  [key: string]: string;
}
interface ikisakis {
  [key: string]: string;
}

@Component
export default class LineSectionS extends Vue {
  @Prop({ required: true })
  secinfo!: secinfo;

  readonly trListJson = require("@/assets/tr_list.json");
  JapaneseHolidays = require("japanese-holidays");
  getUnyo = (tr: string) => {
    let trList = this.isHoliday
      ? this.trListJson.holiday
      : this.trListJson.weekday;

    if (tr.trim() in trList) return trList[tr.trim()].un;
    return "-";
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
    Local: "#7eb500"
  } as colors;
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
  } as ikisakis;
}
</script>
