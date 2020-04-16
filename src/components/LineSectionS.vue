<template>
  <div
    class="line-section"
    :style="{
      flexDirection: getFlexDirection(secinfo.pos, secinfo.trains[0].ki)
    }"
  >
    <TrainBoxS
      v-for="train in secinfo.trains"
      :key="train.tr"
      :pos="secinfo.pos"
      :train="train"
    />
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
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SecinfoS } from "@/types";
import TrainBoxS from "@/components/TrainBoxS.vue";

@Component({
  components: {
    TrainBoxS
  }
})
export default class LineSectionS extends Vue {
  @Prop({ required: true })
  secinfo!: SecinfoS;

  getFlexDirection(pos: string, ki: boolean) {
    if (pos.length > 3) {
      return ki ? "column-reverse" : "column";
    } else {
      return ki ? "row" : "row-reverse";
    }
  }
}
</script>
