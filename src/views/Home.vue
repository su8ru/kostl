<template>
  <div id="home">
    <div class="error" v-if="error">{{ error }}</div>

    <div class="zaisen">
      <line-section
        v-for="secinfo in info"
        :key="secinfo.pos"
        :class="secinfo.pos"
        :secinfo="secinfo"
      ></line-section>
      <div
        v-for="(station, i) in stations_main"
        :key="station"
        :style="{ gridArea: 1 + i * 2 + '/' + 1 }"
        class="station-name"
      >
        <span :style="{ margin: '0 0 0 auto' }">{{ station }}</span>
      </div>
      <div
        v-for="(station, i) in stations_sagami"
        :key="station"
        :style="{ gridArea: 77 + i * 2 + '/' + 14 }"
        class="station-name"
      >
        <span>{{ station }}</span>
      </div>
      <div
        v-for="(station, i) in stations_takao"
        :key="station"
        :style="{ gridArea: 107 + i * 2 + '/' + 14 }"
        class="station-name"
      >
        <span>{{ station }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#home {
  margin: 0 auto;
  padding: 1.5rem;
  width: max-content;
  .zaisen {
    display: grid;
    grid-template-rows: repeat(34, 0) repeat(calc(116 - 32), minmax(66px, auto));
    grid-template-columns: 7rem 1rem repeat(10, 56px) 1rem 10rem;
    margin: 0 auto;

    .line-section {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .station-name {
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 1.1rem;
    }
  }
}
</style>

<script lang="ts">
/* eslint-disable no-console */
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { body, Sn } from "@/traffic_info.ts";
import LineSection from "@/components/LineSection.vue";

type secinfo = {
  pos: string;
  trains: {
    tr: string;
    sy: string;
    ki: string;
    dl: string;
    ik: string;
  }[];
};
type Trains = {
  tr: string;
  sy: string;
  ki: string;
  dl: string;
  ik: string;
}[];

@Component({
  components: {
    LineSection
  }
})
export default class Home extends Vue {
  loading: boolean = true;
  info: secinfo[] = [];
  error = null;
  intervalId: any = "";

  created() {
    this.fetchData();
    this.intervalId = setInterval(this.fetchData, 10000);
  }

  beforeDestroy() {
    clearInterval(this.intervalId);
  }

  async fetchData() {
    this.loading = true;
    const resRaw = await axios.get<body>(
      "https://i.opentidkeio.jp/data/traffic_info.json"
    );

    if (!resRaw.data) return;
    const response: body = resRaw.data;

    const res = new Map<string, Trains>();
    const result: secinfo[] = [];
    for (const station of response.TS) {
      if (station.sn !== Sn.I) {
        for (const train of station.ps) {
          const pos = `${station.id}-${train.bs}`;
          if (!res.has(pos)) res.set(pos, []);
          res.get(pos)!.push({
            tr: train.tr,
            sy: train.sy,
            ki: train.ki,
            dl: train.dl,
            ik: train.ik
          });
        }
      }
    }

    for (const key of res.keys()) {
      result.push({
        pos: key,
        trains: res.get(key)!
      });
    }

    for (const station of response.TB) {
      if (station.sn !== Sn.I) {
        const pos = station.id;
        result.push({
          pos: pos,
          trains: station.ps.map(train => ({
            tr: train.tr,
            sy: train.sy,
            ki: train.ki,
            dl: train.dl,
            ik: train.ik
          }))
        });
      }
    }

    this.info.splice(0, this.info.length, ...result);

    this.loading = false;
  }

  stations_main = [
    "本八幡",
    "篠崎",
    "瑞江",
    "一之江",
    "船堀",
    "東大島",
    "大島",
    "西大島",
    "住吉",
    "菊川",
    "森下",
    "浜町",
    "馬喰横山",
    "岩本町",
    "小川町",
    "神保町",
    "九段下",
    "市ヶ谷",
    "曙橋",
    "新宿三丁目",
    "新宿",
    "初台",
    "幡ヶ谷",
    "笹塚",
    "代田橋",
    "明大前",
    "下高井戸",
    "桜上水",
    "上北沢",
    "八幡山",
    "芦花公園",
    "千歳烏山",
    "仙川",
    "つつじヶ丘",
    "柴崎",
    "国領",
    "布田",
    "調布",
    "西調布",
    "飛田給",
    "武蔵野台",
    "多磨霊園",
    "東府中",
    "府中",
    "分倍河原",
    "中河原",
    "聖蹟桜ヶ丘",
    "百草園",
    "高幡不動",
    "南平",
    "平山城址公園",
    "長沼",
    "北野",
    "京王八王子 "
  ];
  stations_sagami = [
    "京王多摩川",
    "京王稲田堤",
    "京王よみうりランド",
    "稲城",
    "若葉台",
    "京王永山",
    "京王多摩センター",
    "京王堀之内",
    "南大沢",
    "多摩境",
    "橋本"
  ];
  stations_takao = ["京王片倉", "山田", "めじろ台", "狭間", "高尾", "高尾山口"];
}
</script>
