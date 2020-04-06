<template>
  <div
    class="line-section"
    :style="{
      flexDirection: getFlexDirection(secinfo.pos, secinfo.trains[0].ki)
    }"
  >
    <div
      v-for="train in secinfo.trains"
      :key="train.tr"
      class="train-box"
      :class="[
        secinfo.pos.length > 3 ? (train.ki ? 'down-box' : 'up-box') : ''
      ]"
    >
      <div
        class="train"
        :class="[train.ki ? 'down-train' : 'up-train']"
        :style="{ background: getStyle(train.tr, train.ki, train.sy) }"
      >
        <span>{{ ikisaki[train.ik] }}</span>
        <span>{{ getTr(train.tr) }}</span>
        <span>{{ getUnyo(train.tr) }}</span>
      </div>
      <div
        v-if="train.dl"
        class="delay"
        :style="{
          order: train.ki ? -1 : 1
        }"
      >
        + {{ train.dl / 60 }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.line-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #fff;
  text-align: center;
  justify-content: space-between;
  align-content: space-between;

  .train-box {
    display: flex;
    flex-direction: column;

    .train {
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      width: 60px;
      height: 68px;
      justify-content: center;

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
      border-radius: 12px 12px 0 0;
      flex-direction: column-reverse;
    }

    .down-train {
      border-radius: 0 0 12px 12px;
      flex-direction: column;
    }

    .delay {
      color: #da007a;
      font-weight: 900;
      line-height: 1;
      font-size: 0.9rem;
      margin: 3px 0 3px 0;
    }
  }

  .up-box {
    &:not(:last-of-type) {
      margin-bottom: 4px;
    }
  }
  .down-box {
    &:not(:last-of-type) {
      margin-top: 4px;
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SecinfoS } from "@/types";

@Component
export default class LineSectionS extends Vue {
  @Prop({ required: true })
  secinfo!: SecinfoS;

  readonly odptListJson = require("@/assets/odpt_list.json");
  JapaneseHolidays = require("japanese-holidays");

  getFlexDirection(pos: string, ki: boolean) {
    if (pos.length > 3) {
      return ki ? "column-reverse" : "column";
    } else {
      return ki ? "row" : "row-reverse";
    }
  }

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

    if (odpt in odptList) {
      let num: number = odptList[odpt].un.slice(0, 2);
      ++num;
      --num;
      let type: string = odptList[odpt].un.slice(-1);
      return (num % 2 ? num : ++num) + type;
    }
    return "-";
  };

  getStyle = (odpt: string, ki: number, sy: string) => {
    let odptList = this.isHoliday
      ? this.odptListJson.holiday
      : this.odptListJson.weekday;

    if (odpt in odptList) {
      let style: string;
      if ("sy" in odptList[odpt]) {
        let rightColor: string = this.color[sy];
        let leftColor: string = this.color[odptList[odpt].sy];
        if (ki) [leftColor, rightColor] = [rightColor, leftColor];
        const leftPer = "60%";
        const rightPer = "62%";
        const tilt = !ki ? "82deg" : "98deg";
        style = `${tilt}, ${leftColor} ${leftPer}, ${rightColor} ${rightPer}`;
        if ("sy2" in odptList[odpt]) {
          let rightColor2: string = this.color[odptList[odpt].sy2];
          const left2Per = "85%";
          const right2Per = "87%";
          style += `, ${rightColor} ${left2Per}, ${rightColor2} ${right2Per}`;
        }
        return `linear-gradient(${style})`;
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

  readonly color = {
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

  readonly ikisaki = {
    Shinjuku: "N新宿",
    Sasazuka: "笹塚",
    Sakurajosui: "桜上水",
    HachimanYama: "八幡山",
    Tsutsujigaoka: "つつじ",
    Wakabadai: "若葉台",
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
