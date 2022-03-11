<template>
  <div id="home">
    <b-alert variant="danger" class="error" :show="error">{{ error }}</b-alert>
    <b-alert :show="true" variant="info" class="m-0">
      <h3>2020.10.30 ダイヤ修正 について</h3>
      <p>
        種別変更・京王線内の運用番号 を除いて対応しています。
        <b-link v-b-toggle.timetable-rev>詳細を見る</b-link>
      </p>
      <b-collapse id="timetable-rev">
        <section>
          <h4 class="d-inline-block mr-3">
            <b-badge pill variant="shinjuku-leaf" class="text-white">S</b-badge>
            都営新宿線
          </h4>
          <b-badge variant="secondary">2020.12.16 更新</b-badge>
          <p>
            <b>種別・行き先・列車番号・運用番号ともにすべて正確</b> です。
            ただし、京王線内の種別には追従できていません。
          </p>
        </section>
        <section>
          <h4 class="d-inline-block mr-3">
            <b-badge pill variant="keio-pink">KO</b-badge> 京王線
          </h4>
          <b-badge variant="primary">2020.12.24 更新</b-badge>
          <p><b>種別・行き先・列車番号ともに概ね正確</b> です。</p>
          <p>
            <b>化けについては旧データの使用を取り止め</b>
            、公式情報元から得られる範囲で正確です。<br />
            種別変更前は化け表示されますが、
            <b>種別変更後は通常列車と同様の表示</b>
            になります。
          </p>
          <p>
            <b>運用についても旧データの使用を取り止め</b>
            、それに伴って
            <b>編成番号の表示も無効化</b>
            しています。
          </p>
        </section>
        <hr />
        <p>
          結果的に京王線内については 4 行中 2 行が空欄となってしまいました。
          まるでダイヤが乱れているかのようです。
        </p>
        <p>
          こすとれの特徴を失ってしまいあまりに寂しすぎるため、この仕様変更はかなり悩みました。<br />
          しかしながら、旧仕様では誤った情報を提供している懸念があり、それだけは避けるべきであるという判断による変更です。<br />
          どうかご理解ください。
        </p>
        <b-link v-b-toggle.timetable-rev>
          <font-awesome-icon icon="times" /> 詳細を閉じる
        </b-link>
      </b-collapse>
    </b-alert>
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
        :unyo-list="unyoList"
      />
      <LineSectionKO
        v-for="secinfo in infoKO"
        :key="secinfo.pos"
        :class="secinfo.pos"
        :secinfo="secinfo"
        :unyo-list="unyoList"
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
      <AdMaxMain class="ad-main-bottom" />
      <AdMaxMain class="ad-sagamihara-bottom" />
      <AdMaxVertical class="ad-main-right-1" />
      <AdMaxVertical class="ad-main-right-2" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#home {
  .zaisen {
    display: grid;
    grid-template-rows: repeat(117, minmax(86px, auto));
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
      position: relative;
      $color: rgba(#268300, 0.3);
      grid-row: 85 / 88;
      grid-column: 7 / 9;
      background: $color;
      box-shadow: 0 0 0 2px $color;
      border-radius: 6px;
      height: calc(100% + 30px);

      &::before {
        display: block;
        position: absolute;
        content: "競馬場線";
        color: #fff;
        font-weight: 500;
        text-align: center;
        height: 20px;
        bottom: 6px;
        left: 0;
        right: 0;
        margin: 0 auto;
      }
    }
    #dobutsu-section {
      position: relative;
      $color: rgba(#8ea725, 0.4);
      grid-row: 95 / 98;
      grid-column: 7 / 9;
      background: $color;
      box-shadow: 0 0 0 2px $color;
      border-radius: 6px;
      height: calc(100% + 30px);
      top: -30px;

      &::before {
        display: block;
        position: absolute;
        content: "動物園線";
        color: #fff;
        font-weight: 500;
        text-align: center;
        height: 20px;
        top: 2px;
        left: 0;
        right: 0;
        margin: 0 auto;
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

    .ad-main-bottom {
      grid-row: 110 / 113;
      grid-column: 3 / 8;
    }
    .ad-sagamihara-bottom {
      grid-row: 100 / 103;
      grid-column: 8 / 13;
    }
    .ad-main-right-1 {
      grid-row: 51 / 58;
      grid-column: 8 / 13;
    }
    .ad-main-right-2 {
      grid-row: 61 / 68;
      grid-column: 8 / 13;
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { body, Sn, Dt } from "@/apis/keio/@types";
import { OdptDirection } from "@/odpt.ts";
import { SecinfoKO, SecinfoS, TrainKO, TrainS } from "@/types";
import LineSectionKO from "@/components/LineSectionKO.vue";
import LineSectionS from "@/components/LineSectionS.vue";
import AdMaxMain from "@/components/AdMaxMain.vue";
import AdMaxVertical from "@/components/AdMaxVertical.vue";
import moment from "moment";
import kostl from "@/apis/kostl/$api";
import keio from "@/apis/keio/$api";
import odpt from "aspida-odpt";
import aspida from "@aspida/axios";
import { UnyoList } from "@/apis/kostl/vehicles/@types";
import { capitalMap, ikListKO, typeList } from "@/list";

@Component({
  components: {
    LineSectionKO,
    LineSectionS,
    AdMaxMain,
    AdMaxVertical
  }
})
export default class Home extends Vue {
  loading: boolean = true;
  infoKO: SecinfoKO[] = [];
  dateKO: Dt[] = [];
  infoS: SecinfoS[] = [];
  dateS = moment();
  unyoList: UnyoList = {};
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
    if (this.dateKO.length) {
      const dt: Dt = this.dateKO[0];
      let m = moment([+dt.yy, +dt.mt - 1, +dt.dy, 0, +dt.mm, +dt.ss]);
      m.hour(+dt.hh);
      return m.format("YYYY.MM.DD HH:mm:ss");
    }
    return moment().format("YYYY.MM.DD HH:mm:ss");
  }
  get getTimeS(): string {
    return this.dateS.format("YYYY.MM.DD HH:mm:ss");
  }

  async fetchData() {
    this.loading = true;

    // Keio
    keio(aspida())
      .traffic_info_json.$get()
      .then(res => {
        const resKO = new Map<string, TrainKO[]>();
        const resultKO: SecinfoKO[] = [];

        // Record Date and Time
        this.dateKO = res.up[0].dt;

        // Train Stopping
        if ("TS" in res) {
          for (const station of res.TS) {
            if (station.sn !== Sn.I) {
              for (const train of station.ps) {
                const pos = `${station.id}-${train.bs}`;
                if (!resKO.has(pos)) resKO.set(pos, []);
                const inf = this.parseInformation(
                  train.inf,
                  +train.sy,
                  !!+train.ki
                );
                resKO.get(pos)!.push({
                  tr: train.tr.trim(),
                  sy: inf.sy || train.sy,
                  ki: !!+train.ki,
                  dl: +train.dl,
                  ik: inf.ik || train.ik_tr
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

        // Train Bounding
        if ("TB" in res) {
          for (const station of res.TB) {
            if (station.sn !== Sn.I && typeof station !== "undefined") {
              const pos = station.id;
              resultKO.push({
                pos: pos,
                trains: station.ps.map(train => {
                  const inf = this.parseInformation(
                    train.inf,
                    +train.sy,
                    !!+train.ki
                  );
                  return {
                    tr: train.tr.trim(),
                    sy: inf.sy || train.sy,
                    ki: !!+train.ki,
                    dl: +train.dl,
                    ik: inf.ik || train.ik_tr
                  };
                })
              });
            }
          }
        }

        // Splice (Vue Constraints)
        this.infoKO.splice(0, this.infoKO.length, ...resultKO);
      });

    // Odpt
    odpt(aspida())
      .v4.odpt_3ATrain.$get({
        query: {
          "odpt:railway": "odpt.Railway:Toei.Shinjuku",
          "acl:consumerKey": process.env.VUE_APP_ODPT_TOKEN
        }
      })
      .then(res => {
        const resS = new Map<string, TrainS[]>();
        const resultS: SecinfoS[] = [];

        for (const train of res) {
          // Record Date and Time
          this.dateS = moment.max(moment(this.dateS), moment(train["dc:date"]));

          // Generate Position Keys
          const pos =
            (train["odpt:railDirection"] === OdptDirection.E ? "E" : "W") +
            (this.s_stations.indexOf(
              train["odpt:fromStation"]!.split(".").pop()!
            ) +
              1) +
            (train["odpt:toStation"]
              ? "-" +
                (this.s_stations.indexOf(
                  train["odpt:toStation"].split(".").pop()!
                ) +
                  1)
              : "");

          // Push to Object
          if (!resS.has(pos)) resS.set(pos, []);
          resS.get(pos)!.push({
            tr: train["odpt:trainNumber"],
            sy: train["odpt:trainType"]!.split(".").pop()!,
            ki: train["odpt:railDirection"] === OdptDirection.W,
            dl: train["odpt:delay"]!,
            ik: train["odpt:destinationStation"]![0].split(".").pop()!,
            op: train["odpt:operator"].split(".").pop()!
          });
        }

        // Convert to Array
        for (const key of resS.keys()) {
          resultS.push({
            pos: key,
            trains: resS.get(key)!
          });
        }

        // Splice (Vue Constraints)
        this.infoS.splice(0, this.infoS.length, ...resultS);
      });

    // Kostl (Unyo)
    kostl(aspida())
      .vehicles.$get()
      .then(data => {
        this.unyoList = Object.assign({}, this.unyoList, data);
      });

    this.loading = false;
  }

  parseInformation(
    raw: string,
    sy: number,
    ki: boolean
  ): { sy: string | null; ik: string | null } {
    if (raw !== "") {
      const removeRegExp = /この列車は|駅で|\s|行きとなります。/;
      const arr = raw.split(removeRegExp);
      if (arr.length === 5) {
        let data = {
          chgSta: arr[1],
          destSta: arr[3],
          newType: arr[2]
        } as { chgSta: string; destSta: string; newType: string | null };
        for (const [key, value] of capitalMap) {
          if (value === data.chgSta) data.chgSta = key;
          if (value === data.destSta) data.destSta = key;
        }
        data.newType =
          Object.keys(typeList).find(key => typeList[+key] === data.newType) ||
          "";
        if (!ki && data.newType !== "")
          [data.newType, sy] = [`${sy}`, +data.newType];
        return {
          ik:
            Object.keys(ikListKO).find(
              // eslint-disable-next-line no-irregular-whitespace
              key => ikListKO[key] === `${data.chgSta}　${data.destSta}`
            ) || null,
          sy: data.newType ? `${sy}${data.newType}` : null
        };
      }
    }
    return { sy: null, ik: null };
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
