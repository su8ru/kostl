<template>
  <div class="train-ko" :class="[ki ? 'down-box' : 'up-box']">
    <Train
      :tr="train.tr"
      :ik="ik"
      :sy="train.sy"
      :ki="ki"
      :unyo="unyo"
      :vehicle="vehicle"
      :bg-style="style"
    />
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

  .delay {
    color: #da007a;
    font-weight: 900;
    line-height: 1;
    font-size: 0.9rem;
    margin: 3px 0 3px 0;
    text-align: center;
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
import { listKO, TrainKO } from "@/types";
import { UnyoList } from "@/apis/kostl/vehicles/@types";
import { ikListKO, syList } from "@/list";
import Train from "@/components/Train.vue";

@Component({ components: { Train } })
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
