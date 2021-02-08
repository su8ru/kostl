<template>
  <div
    class="train"
    :class="[ki ? 'down-train' : 'up-train', { 'keio-liner': sy === '9' }]"
    :style="{ background: bgStyle }"
  >
    <span>{{ ik }}</span>
    <span>{{ tr }}<template v-if="line === 'KO'">ﾚ</template></span>
    <span>{{ unyo }}</span>
    <span>{{ vehicle }}</span>
  </div>
</template>

<style lang="scss" scoped>
.train {
  // element ====
  display: flex;
  box-sizing: border-box;
  width: 60px;
  height: 86px;

  // contents ====
  justify-content: center;
  color: #fff;
  font-weight: 500;
  font-size: 0.9rem;
  line-height: 1.25;
  text-align: center;
  white-space: nowrap;

  // decoration ====
  border: 4px solid #fff;
  filter: drop-shadow(0 0 2px rgba(#000, 0.05));

  span {
    display: block;
    max-width: 120%;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}

// 上り列車 ========
.up-train {
  border-radius: 12px 12px 6px 6px;
  flex-direction: column-reverse;
}
.up-train.keio-liner::before {
  border-radius: 8px 8px 2px 2px;
}
.up-train.keio-liner::after {
  border-radius: 10px 10px 2px 2px;
}

// 下り列車 ========
.down-train {
  border-radius: 6px 6px 12px 12px;
  flex-direction: column;
}
.down-train.keio-liner::before {
  border-radius: 2px 2px 8px 8px;
}
.down-train.keio-liner::after {
  border-radius: 2px 2px 10px 10px;
}

// 京王ライナー ========
.keio-liner {
  position: relative;
  span {
    z-index: 10;
  }
}
.keio-liner::before,
.keio-liner::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  border-left: 6px solid #d5007f;
  border-right: 6px solid #d5007f;
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
  @Prop({ required: true })
  line!: "KO" | "S";
}
</script>
