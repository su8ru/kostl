<template>
  <div id="home">
    <b-btn @click="fetchData">load</b-btn>
    <div class="loading" v-if="loading">loading...</div>
    <div class="error" v-if="error">{{ error }}</div>

    <div class="zaisen">
      <line-section
        v-for="secinfo in info"
        :key="secinfo.pos"
        :class="secinfo.pos"
        :secinfo="secinfo"
      ></line-section>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

<script lang="ts">
/* eslint-disable no-console */
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { body } from "@/traffic_info.ts";
import LineSection from "@/components/LineSection.vue";

type secinfo = {
  pos: string;
  trains: {
    tr: string;
    sy: string;
    dl: string;
    ik: string;
  }[];
};
type Trains = {
  tr: string;
  sy: string;
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

  created() {
    this.fetchData();
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
      for (const train of station.ps) {
        const pos = `${station.id}-${train.bs}`;
        if (!res.has(pos)) res.set(pos, []);
        res.get(pos)!.push({
          tr: train.tr,
          sy: train.sy,
          dl: train.dl,
          ik: train.ik
        });
      }
    }

    for (const key of res.keys()) {
      result.push({
        pos: key,
        trains: res.get(key)!
      });
    }

    for (const station of response.TB) {
      const pos = station.id;
      result.push({
        pos: pos,
        trains: station.ps.map(train => ({
          tr: train.tr,
          sy: train.sy,
          dl: train.dl,
          ik: train.ik
        }))
      });
    }

    this.info.splice(0, this.info.length, ...result);

    this.loading = false;
  }
}
</script>
