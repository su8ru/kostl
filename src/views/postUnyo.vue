<template>
  <div id="post-unyo">
    <h1>運用投稿</h1>
    <b-form class="mb-5">
      <div :style="{ display: 'grid', gridTemplateColumns: '1fr max-content' }">
        <b-form-group
          description="運用番号 編成番号 の順に改行区切りで入力してください。No. は省略が可能です。"
        >
          <b-form-textarea
            v-model="draft"
            rows="10"
            required
            :state="isDraftValid"
            aria-describedby="textarea-draft-feedback"
          ></b-form-textarea>
          <b-form-invalid-feedback id="textarea-draft-feedback">
            余計な文言や列車番号・スペース等が含まれていないか確認してください。編成番号の書式を確認してください。
          </b-form-invalid-feedback>
        </b-form-group>
        <article class="p-3">
          <h5>Sample</h5>
          <code>
            12 8710F<br />
            82 8702F<br />
            14 7805F+7705F<br />
            25T 600F<br />
            51K 5736F<br />
          </code>
        </article>
      </div>
      <b-button
        variant="keio-pink"
        @click="postDraft"
        :disabled="!isDraftValid || !draft"
        block
      >
        投稿
      </b-button>
    </b-form>
    <b-button variant="keio-blue" @click="fetchData" class="mb-2">
      <font-awesome-icon icon="redo-alt" />
      更新
    </b-button>
    <b-table-simple hover small stacked>
      <b-thead>
        <b-tr>
          <b-th>運用番号</b-th>
          <b-th>編成番号</b-th>
          <b-th>投稿日時</b-th>
        </b-tr>
      </b-thead>
      <b-tbody v-for="unyo in isHoliday ? unyoOnly_H : unyoOnly_W" :key="unyo">
        <b-tr v-for="post in getPosts(unyo)" :key="post.created_at">
          <b-th>{{ unyo }}</b-th>
          <b-td>{{ post.vehicle }}</b-td>
          <b-td>
            {{ post.timestamp ? getStringTime(post.timestamp) : "-" }}
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<style lang="scss" scoped>
#post-unyo {
  width: 100vw;
  max-width: 800px;
  padding: 1rem;
}
tbody tr:not(:last-child) {
  background: #fafafa;
  color: #999;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import api from "@/apis/$api";
import aspida from "@aspida/axios";
import { UnyoList } from "@/apis/vehicles/@types";
import moment from "moment";

@Component
export default class PostUnyo extends Vue {
  unyoList: UnyoList = {};
  readonly moment = moment;

  draft = "";

  JapaneseHolidays = require("japanese-holidays");
  get isHoliday(): boolean {
    let date = new Date();
    date.setHours(date.getHours() - 3);
    return (
      date.getDay() == 0 ||
      date.getDay() == 6 ||
      this.JapaneseHolidays.isHolidayAt(date)
    );
  }

  mounted() {
    this.fetchData();
  }

  fetchData() {
    api(aspida())
      .vehicles.$get()
      .then(data => {
        this.unyoList = Object.assign({}, this.unyoList, data);
      });
  }

  postDraft() {
    const lines = this.draft.split("\n");
    for (const line of lines) {
      let sec = line.split(" ");
      if (
        sec[0].slice(-1) !== "K" &&
        sec[0].slice(-1) !== "T" &&
        sec[0].slice(1) !== "N"
      )
        sec[0] = "No." + sec[0];

      this.postData(sec[0], sec[1]);
    }
    this.draft = "";
  }

  postData(unyo: string, vehicle: string) {
    api(aspida()).vehicles.$post({
      data: {
        unyo: unyo,
        vehicle: vehicle
      }
    });
  }

  getPosts(unyo: string): { vehicle: string; created_at: string }[] {
    if (unyo in this.unyoList) {
      if (this.unyoList[unyo].length) {
        return this.unyoList[unyo];
      }
    }
    return [{ vehicle: "-", created_at: "" }];
  }

  get isDraftValid() {
    if (!this.draft) return "none";

    const lineRegExp = /(No.)?\d{1,2}[KT]?\s\d{3,4}F(\+\d{3,4}F)?/;
    const lines = this.draft.split("\n");
    for (const line of lines) {
      if (!lineRegExp.test(line)) return false;
    }

    return true;
  }

  getStringTime(timestamp: string) {
    return moment(timestamp).format("MM/DD HH:mm:ss");
  }

  readonly unyoOnly_W = [
    "No.1",
    "No.2",
    "No.3",
    "No.4",
    "No.5",
    "No.6",
    "No.7",
    "No.8",
    "No.9",
    "No.10",
    "No.11",
    "No.12",
    "No.13",
    "No.14",
    "No.15",
    "No.16",
    "No.17",
    "No.20",
    "No.21",
    "No.22",
    "No.23",
    "No.24",
    "No.25",
    "No.26",
    "No.27",
    "No.28",
    "No.29",
    "No.30",
    "No.31",
    "No.32",
    "No.33",
    "No.34",
    "No.40",
    "No.41",
    "No.42",
    "No.43",
    "No.44",
    "No.50",
    "No.52",
    "No.54",
    "No.56",
    "No.58",
    "No.60",
    "No.62",
    "No.64",
    "No.66",
    "No.70",
    "No.72",
    "No.74",
    "No.76",
    "No.80",
    "No.82",
    "No.84",
    "No.86",
    "No.88",
    "51K",
    "53K",
    "55K",
    "57K",
    "5aK",
    "5bK",
    "61K",
    "63K",
    "65K",
    "67K",
    "69K",
    "71K",
    "73K",
    "75K",
    "77K",
    "79K",
    "81K",
    "83K",
    "85K",
    "87K",
    "89K",
    "91K",
    "1T",
    "3T",
    "5T",
    "7T",
    "9T",
    "11T",
    "13T",
    "15T",
    "17T",
    "19T",
    "21T",
    "23T",
    "25T",
    "27T",
    "29T",
    "31T",
    "33T",
    "35T",
    "37T",
    "39T",
    "41T",
    "51T",
    "53T",
    "55T",
    "57T",
    "59T",
    "61T"
  ];

  readonly unyoOnly_H = [
    "No.1",
    "No.2",
    "No.3",
    "No.4",
    "No.5",
    "No.6",
    "No.7",
    "No.8",
    "No.9",
    "No.10",
    "No.11",
    "No.12",
    "No.13",
    "No.14",
    "No.15",
    "No.16",
    "No.17",
    "No.20",
    "No.21",
    "No.22",
    "No.23",
    "No.30",
    "No.31",
    "No.32",
    "No.33",
    "No.34",
    "No.35",
    "No.36",
    "No.40",
    "No.41",
    "No.50",
    "No.52",
    "No.54",
    "No.56",
    "No.58",
    "No.60",
    "No.62",
    "No.70",
    "No.72",
    "No.74",
    "51K",
    "53K",
    "55K",
    "57K",
    "61K",
    "63K",
    "65K",
    "67K",
    "69K",
    "71K",
    "73K",
    "75K",
    "77K",
    "79K",
    "81K",
    "83K",
    "85K",
    "87K",
    "89K",
    "91K",
    "93K",
    "1T",
    "3T",
    "5T",
    "7T",
    "9T",
    "11T",
    "13T",
    "15T",
    "17T",
    "19T",
    "21T",
    "23T",
    "25T",
    "27T",
    "29T",
    "31T",
    "33T",
    "51T",
    "53T",
    "55T"
  ];
}
</script>
