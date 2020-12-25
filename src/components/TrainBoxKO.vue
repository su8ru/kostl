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
  text-align: center;
  color: #fff;

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
    .old {
      font-size: 0.5rem;
      line-height: 1.25rem;
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
import { UnyoList } from "@/apis/kostl/vehicles/@types";
import { ikListKO, syList } from "@/list";

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

  // get list(): trsKO {
  //   return this.isHoliday ? this.trListJson.holiday : this.trListJson.weekday;
  // }

  get unyo(): string {
    // if (this.train.tr in this.list) return this.list[this.train.tr].un;
    return "-";
  }

  get ik(): string {
    return ikListKO[this.train.ik] || "-";
  }

  get style(): string {
    if (Math.floor(+this.train.sy / 10)) {
      let RColorNum: number = Math.floor(+this.train.sy / 10);
      let rightColor: string = syList[RColorNum];
      let LColorNum: number = +this.train.sy % 10;
      let leftColor: string = syList[LColorNum];
      if (this.ki) [leftColor, rightColor] = [rightColor, leftColor];
      let leftPer = "60%";
      let rightPer = "62%";
      let tilt = this.ki ? "82deg" : "98deg";
      return `linear-gradient(${tilt}, ${leftColor} 0%, ${leftColor} ${leftPer}, ${rightColor} ${rightPer}, ${rightColor} 100%)`;
    } else {
      return syList[this.train.sy];
    }
  }

  // get isHoliday(): boolean {
  //   let date = new Date();
  //   date.setHours(date.getHours() - 3);
  //   return (
  //     date.getDay() == 0 ||
  //     date.getDay() == 6 ||
  //     this.JapaneseHolidays.isHolidayAt(date)
  //   );
  // }

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
