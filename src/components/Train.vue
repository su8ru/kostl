<template>
  <div
    class="train"
    :class="[ki ? 'down-train' : 'up-train', { 'keio-liner': sy === '9' }]"
    :style="{ background: bgStyle }"
  >
    <span>{{ ik }}</span>
    <span>{{ tr }}ﾚ</span>
    <span>{{ unyo }}</span>
    <span>{{ vehicle }}</span>
  </div>
</template>

<style lang="scss" scoped>
.train {
  display: flex;
  box-sizing: border-box;
  width: 60px;
  height: 86px;
  justify-content: center;
  text-align: center;
  color: #fff;

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
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Train extends Vue {
  @Prop({ required: true })
  tr!: string;
  @Prop({ required: true })
  ik!: string;
  @Prop({ required: true })
  sy!: string;
  @Prop({ required: true })
  ki!: boolean;
  @Prop({ required: true })
  unyo!: string;
  @Prop({ required: true })
  vehicle!: string;
  @Prop({ required: true })
  bgStyle!: string;
}
</script>
