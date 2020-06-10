<template>
  <div class="train-ko" :class="[ki ? 'down-box' : 'up-box']">
    <div
      class="train"
      :class="[
        ki ? 'down-train' : 'up-train',
        { 'keio-liner': train.sy === '9' }
      ]"
      :style="{ background: style }"
    >
      <span>{{ ik }}</span>
      <span>{{ train.tr }}ﾚ</span>
      <span>{{ unyo }}</span>
      <span>{{ vehicle }}</span>
    </div>
    <div
      v-if="train.dl"
      class="delay"
      :style="{
        order: ki ? -1 : 1
      }"
    >
      + {{ train.dl }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.train-ko {
  display: flex;
  flex-direction: column;

  .train {
    display: flex;
    box-sizing: border-box;
    width: 60px;
    height: 86px;
    justify-content: center;

    font-size: 0.9rem;
    font-weight: 500;
    line-height: 1.25;
    white-space: nowrap;

    border: 4px solid #fff;

    span {
      display: block;
      max-width: 120%;
      overflow-y: hidden;
      &::-webkit-scrollbar {
        display: none;
      }
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

  .keio-liner {
    position: relative;
    span {
      z-index: 10;
    }
  }
  .keio-liner::before {
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
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { listKO, TrainKO, trsKO } from "@/types";
import axios from "axios";
import { UnyoList } from "@/apis/kostl/vehicles/@types";

@Component
export default class TrainBoxKO extends Vue {
  @Prop({ required: true })
  train!: TrainKO;
  @Prop({ required: true })
  pos!: string;
  @Prop({ required: true })
  unyoList!: UnyoList;

  readonly trListJson: listKO = require("@/assets/tr_list.json");
  JapaneseHolidays = require("japanese-holidays");

  readonly reverse = ["E027-1", "E027-2S", "E037-1", "E037-2", "D037", "S027"];

  vehicle: string = "-";
  mounted() {
    this.$nextTick(this.updateVehicle);
  }
  beforeUpdate() {
    this.updateVehicle();
  }

  get ki(): boolean {
    if (this.reverse.includes(this.pos)) return !this.train.ki;
    return this.train.ki;
  }

  get list(): trsKO {
    return this.isHoliday ? this.trListJson.holiday : this.trListJson.weekday;
  }

  get unyo(): string {
    if (this.train.tr in this.list) return this.list[this.train.tr].un;
    return "-";
  }

  get ik(): string {
    if (this.train.tr in this.list) {
      if ("ik" in this.list[this.train.tr]) {
        return this.ikList[this.list[this.train.tr].ik!];
      }
    }
    return this.ikList[this.train.ik] || "-";
  }

  get style(): string {
    if (this.train.tr in this.list) {
      if ("sy" in this.list[this.train.tr]) {
        if (Math.floor(this.list[this.train.tr].sy! / 10)) {
          let RColorNum: number = Math.floor(this.list[this.train.tr].sy! / 10);
          let rightColor: string = this.syList[RColorNum];
          let LColorNum: number = this.list[this.train.tr].sy! % 10;
          let leftColor: string = this.syList[LColorNum];
          if (this.ki) [leftColor, rightColor] = [rightColor, leftColor];
          let leftPer = "60%";
          let rightPer = "63%";
          let tilt = this.ki ? "82deg" : "98deg";
          return `linear-gradient(${tilt}, ${leftColor} 0%, ${leftColor} ${leftPer}, ${rightColor} ${rightPer}, ${rightColor} 100%)`;
        } else {
          return this.syList[this.list[this.train.tr].sy!];
        }
      }
    }
    return this.syList[this.train.sy];
  }

  get isHoliday(): boolean {
    let date = new Date();
    date.setHours(date.getHours() - 3);
    return (
      date.getDay() == 0 ||
      date.getDay() == 6 ||
      this.JapaneseHolidays.isHolidayAt(date)
    );
  }

  updateVehicle() {
    if (this.latestVehicle !== this.vehicle) {
      this.vehicle = this.latestVehicle;
    }
  }

  get latestVehicle(): string {
    if (this.unyo in this.unyoList) {
      if (this.unyoList[this.unyo].length) {
        return this.unyoList[this.unyo].pop()!.vehicle;
      }
    }
    return "-";
  }

  readonly syList = {
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
  } as { [key: string]: string };

  readonly ikList = {
    "001": "K新宿",
    "002": "笹塚",
    "006": "桜上水",
    "008": "八幡山",
    "012": "つつじ",
    "016": "調布",
    "018": "飛田給",
    "021": "東府中",
    "022": "府中",
    "027": "高幡",
    "031": "北野",
    "032": "京八",
    "033": "N新宿",
    "036": "競馬",
    "037": "動物",
    "042": "高尾",
    "043": "高尾山",
    "048": "若葉台",
    "050": "多摩セ",
    "052": "南大沢",
    "054": "橋本",
    "107": "岩本町",
    "114": "大島",
    "118": "瑞江",
    "120": "本八幡",
    "300": "[新宿]",
    "301": "Ⓢ",
    "302": "[K新]",
    "303": "[調布]",
    "400": "[京八]",
    "401": "[高山]",
    "402": "[橋本]",
    "999": "-",
    "701": "セ　橋",
    "702": "新　セ",
    "751": "調　橋",
    "752": "新　調",
    "801": "高　八",
    "802": "新　高",
    "811": "高　山",
    "812": "新　高",
    "851": "調　八",
    "852": "新　調",
    "861": "調　山",
    "862": "新　調"
  } as { [key: string]: string };
}
</script>
