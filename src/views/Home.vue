<template>
  <div id="home">
    <b-alert variant="danger" class="error" v-if="error">{{ error }}</b-alert>

    <div class="zaisen">
      <div id="keio-section"></div>
      <div id="odpt-section"></div>
      <div id="keiba-section"></div>
      <div id="dobutsu-section"></div>
      <LineSectionS
        v-for="secinfo in infoS"
        :key="secinfo.pos"
        :class="secinfo.pos"
        :secinfo="secinfo"
      />
      <LineSectionKO
        v-for="secinfo in infoKO"
        :key="secinfo.pos"
        :class="secinfo.pos"
        :secinfo="secinfo"
      />
      <div class="update update-s">
        <span>
          <font-awesome-icon icon="sync" />
          {{ getTimeS }}
        </span>
      </div>
      <div class="update update-ko">
        <span>
          <font-awesome-icon icon="sync" />
          {{ getTimeKO }}
        </span>
      </div>
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
  .zaisen {
    display: grid;
    grid-template-rows: repeat(117, minmax(68px, auto));
    grid-template-columns: 8rem 1rem repeat(10, 60px) 1rem 11rem;
    grid-gap: 4px;
    margin: 0 auto;
    overflow: hidden;

    .line-section {
      z-index: 100;
    }

    .station-name {
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 1.1rem;
      z-index: 100;
    }

    #keio-section {
      grid-row: 34 / 118;
      grid-column: 1 / 15;
      background: #faf5e9;
      width: 100%;
    }
    #odpt-section {
      grid-row: 1 / 41;
      grid-column: 1 / 15;
      background: #f6f8e8;
      width: 100%;
    }
    #keiba-section {
      $color: #268300;
      grid-row: 86 / 88;
      grid-column: 7 / 9;
      outline: 3px dashed rgba($color, 0.8);
      background: rgba($color, 0.1);

      &::before {
        display: block;
        position: relative;
        content: "競馬場線";
        bottom: -30px;
        margin: 100% 0 0 0;
        height: 1.5rem;
        color: $color;
        font-weight: 500;
        text-align: center;
      }
    }
    #dobutsu-section {
      $color: #8ea725;
      grid-row: 95 / 97;
      grid-column: 7 / 9;
      outline: 3px dashed rgba($color, 0.8);
      background: rgba($color, 0.1);

      &::before {
        display: block;
        position: relative;
        content: "動物園線";
        top: -30px;
        color: $color;
        font-weight: 500;
        text-align: center;
      }
    }

    .update {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      padding: 0.5rem 0.8rem 0 0;
      font-weight: 500;
    }
    .update-s {
      grid-area: 1 / 13 / 2 / 15;
    }
    .update-ko {
      grid-area: 41 / 13 / 42 / 15;
    }
  }
}
</style>

<script lang="ts">
/* eslint-disable no-console */
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import { body, Sn, Dt } from "@/traffic_info.ts";
import {
  Odpt,
  OdptDestinationStation,
  OdptDirection,
  OdptOperator,
  OdptTrainType
} from "@/odpt.ts";
import { SecinfoKO, SecinfoS, TrainsKO, TrainsS } from "@/types";
import LineSectionKO from "@/components/LineSectionKO.vue";
import LineSectionS from "@/components/LineSectionS.vue";
import moment from "moment";

@Component({
  components: {
    LineSectionKO,
    LineSectionS
  }
})
export default class Home extends Vue {
  loading: boolean = true;
  infoKO: SecinfoKO[] = [];
  dateKO: Dt[] = [];
  infoS: SecinfoS[] = [];
  dateS = moment();
  error = null;
  intervalId: any = "";

  created() {
    this.fetchData();
    this.intervalId = setInterval(this.fetchData, 5000);
  }

  beforeDestroy() {
    clearInterval(this.intervalId);
  }

  get getTimeKO(): string {
    const dt: Dt = this.dateKO[0];
    let m = moment([+dt.yy, +dt.mt - 1, +dt.dy, 0, +dt.mm, +dt.ss]);
    m.hour(+dt.hh);
    return m.format("YYYY.MM.DD HH:mm:ss");
  }
  get getTimeS(): string {
    return this.dateS.format("YYYY.MM.DD HH:mm:ss");
  }

  async fetchData() {
    this.loading = true;

    // Keio
    const resRawKO = await axios.get<body>(
      "https://i.opentidkeio.jp/data/traffic_info.json"
    );

    if (!resRawKO.data) return;
    const responseKO: body = resRawKO.data;

    const resKO = new Map<string, TrainsKO>();
    const resultKO: SecinfoKO[] = [];

    this.dateKO = responseKO.up[0].dt;

    if ("TS" in responseKO) {
      for (const station of responseKO.TS) {
        if (station.sn !== Sn.I) {
          for (const train of station.ps) {
            const pos = `${station.id}-${train.bs}`;
            if (!resKO.has(pos)) resKO.set(pos, []);
            resKO.get(pos)!.push({
              tr: train.tr,
              sy: train.sy,
              ki: !!+train.ki,
              dl: +train.dl,
              ik: train.ik_tr
            });
          }
        }
      }

      for (const key of resKO.keys()) {
        resultKO.push({
          pos: key,
          trains: resKO.get(key)!
        });
      }
    }

    if ("TB" in responseKO) {
      for (const station of responseKO.TB) {
        if (station.sn !== Sn.I && typeof station !== "undefined") {
          const pos = station.id;
          resultKO.push({
            pos: pos,
            trains: station.ps.map(train => ({
              tr: train.tr,
              sy: train.sy,
              ki: !!+train.ki,
              dl: +train.dl,
              ik: train.ik_tr
            }))
          });
        }
      }
    }

    this.infoKO.splice(0, this.infoKO.length, ...resultKO);

    // Shinjuku
    const resRawS = await axios.get<Odpt[]>(
      "https://api.odpt.org/api/v4/odpt:Train?odpt:railway=odpt.Railway:Toei.Shinjuku&acl:consumerKey=" +
        process.env.VUE_APP_ODPT_TOKEN
    );

    if (!resRawS.data) return;
    const responseS: Odpt[] = resRawS.data;
    const resS = new Map<string, TrainsS>();
    const resultS: SecinfoS[] = [];
    for (const train of responseS) {
      this.dateS = moment.max(moment(this.dateS), moment(train["dc:date"]));
      const pos =
        (train["odpt:railDirection"] === OdptDirection.E ? "E" : "W") +
        (this.s_stations.indexOf(train["odpt:fromStation"].split(".").pop()!) +
          1) +
        (train["odpt:toStation"]
          ? "-" +
            (this.s_stations.indexOf(
              train["odpt:toStation"].split(".").pop()!
            ) +
              1)
          : "");
      if (!resS.has(pos)) resS.set(pos, []);
      resS.get(pos)!.push({
        tr: train["odpt:trainNumber"].slice(4),
        sy: train["odpt:trainType"].split(".").pop()!,
        ki: train["odpt:railDirection"] === OdptDirection.W,
        dl: train["odpt:delay"],
        ik: train["odpt:destinationStation"][0].split(".").pop()!,
        op: train["odpt:operator"].split(".").pop()!
      });
    }

    for (const key of resS.keys()) {
      resultS.push({
        pos: key,
        trains: resS.get(key)!
      });
    }

    this.infoS.splice(0, this.infoS.length, ...resultS);

    this.loading = false;
  }

  readonly s_stations = [
    "Shinjuku",
    "ShinjukuSanchome",
    "Akebonobashi",
    "Ichigaya",
    "Kudanshita",
    "Jimbocho",
    "Ogawamachi",
    "Iwamotocho",
    "BakuroYokoyama",
    "Hamacho",
    "Morishita",
    "Kikukawa",
    "Sumiyoshi",
    "NishiOjima",
    "Ojima",
    "HigashiOjima",
    "Funabori",
    "Ichinoe",
    "Mizue",
    "Shinozaki",
    "Motoyawata"
  ];

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
