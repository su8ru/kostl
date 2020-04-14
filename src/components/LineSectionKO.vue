<template>
  <div
    class="line-section"
    :style="{
      flexDirection: secinfo.trains[0].ki ? 'column-reverse' : 'column'
    }"
  >
    <TrainBoxKO
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
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { SecinfoKO } from "@/types";
import TrainBoxKO from "@/components/TrainBoxKO.vue";

@Component({
  components: {
    TrainBoxKO
  }
})
export default class LineSectionKO extends Vue {
  @Prop({ required: true })
  secinfo!: SecinfoKO;
}
</script>
