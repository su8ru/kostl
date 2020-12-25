<template>
  <div
    class="train-s"
    :class="[
      pos.length > 3 ? (train.ki ? 'down-box' : 'up-box') : '',
      `ODPT${train.tr}`
    ]"
  >
    <div
      class="train"
      :class="train.ki ? 'down-train' : 'up-train'"
      :style="{ background: style }"
    >
      <span>{{ ik }}</span>
      <span>{{ train.tr }}</span>
      <span>{{ unyo }}</span>
      <span>{{ vehicle }}</span>
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
</template>

<style lang="scss" scoped>
.train-s {
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #fff;

  .train {
    display: flex;
    flex-direction: column;
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
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { TrainS, listS, trsS } from "@/types";
import { UnyoList } from "@/apis/kostl/vehicles/@types";
import { ikListS, syList } from "@/list";

@Component
export default class TrainBoxS extends Vue {
  @Prop({ required: true })
  train!: TrainS;
  @Prop({ required: true })
  pos!: string;
  @Prop({ required: true })
  unyoList!: UnyoList;

  readonly odptListJson: listS = require("@/assets/odpt_list.json");
  JapaneseHolidays = require("japanese-holidays");

  vehicle: string = "-";
  mounted() {
    this.$nextTick(this.updateVehicle);
  }
  beforeUpdate() {
    this.updateVehicle();
  }

  get list(): trsS {
    return {};
    // return this.isHoliday
    //   ? this.odptListJson.holiday
    //   : this.odptListJson.weekday;
  }

  get unyo() {
    const trainId = this.train.tr;
    const normalized = ["K", "T"].some(type => trainId.endsWith(type))
      ? trainId // 1234T
      : trainId.slice(0, -1); // 1234Tb -> 1234T
    const number = +normalized.slice(-3, -1);
    const suffixType = normalized.slice(-1);
    return (number % 2 ? number : number + 1) + suffixType;
  }

  get ik() {
    return ikListS[this.train.ik];
  }

  get style() {
    if (this.train.tr in this.list) {
      let style: string;
      if ("sy" in this.list[this.train.tr]) {
        let rightColor: string = syList[this.train.sy];
        let leftColor: string = syList[this.list[this.train.tr].sy!];
        if (this.train.ki) [leftColor, rightColor] = [rightColor, leftColor];
        const leftPer = "60%";
        const rightPer = "62%";
        const tilt = !this.train.ki ? "82deg" : "98deg";
        style = `${tilt}, ${leftColor} ${leftPer}, ${rightColor} ${rightPer}`;
        if ("sy2" in this.list[this.train.tr]) {
          let rightColor2: string = syList[this.list[this.train.tr].sy2!];
          const left2Per = "85%";
          const right2Per = "87%";
          style += `, ${rightColor} ${left2Per}, ${rightColor2} ${right2Per}`;
        }
        return `linear-gradient(${style})`;
      }
    }
    return syList[this.train.sy];
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
}
</script>
