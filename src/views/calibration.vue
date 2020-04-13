<template>
  <div id="calibration">
    <h2>Weekday</h2>
    <b-table-simple small>
      <b-tbody>
        <b-tr
          v-for="(val, key) in nkthW"
          :key="key"
          :class="[
            val === getTr(key, true) ? 'hide table-success' : 'table-danger'
          ]"
        >
          <b-th>{{ key }}</b-th>
          <b-td>{{ val }}</b-td>
          <b-td>{{ getTr(key, true) }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <h2>Holiday</h2>
    <b-table-simple small>
      <b-tbody>
        <b-tr
          v-for="(val, key) in nkthH"
          :key="key"
          :class="[
            val === getTr(key, false) ? 'hide table-success' : 'table-danger'
          ]"
        >
          <b-th>{{ key }}</b-th>
          <b-td>{{ val }}</b-td>
          <b-td>{{ getTr(key, false) }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
  </div>
</template>

<style lang="scss" scoped>
#calibration {
  width: 800px;
  margin: 0 auto;
  padding: 1rem;
}
.hide {
  color: #999;
  height: 5px;
  th,
  td {
    padding: 0;
    font-weight: 400;
    border: none;
    font-size: 10px;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

interface NkthJson {
  [key: string]: string;
}

@Component
export default class Calibration extends Vue {
  readonly kostlW = require("@/assets/odpt_list.json").weekday;
  readonly kostlH = require("@/assets/odpt_list.json").holiday;
  nkthW: NkthJson = require("@/assets/Shinjuku_w.json");
  nkthH: NkthJson = require("@/assets/Shinjuku_h.json");

  getTr(odpt: string, isWeekday: boolean) {
    const obj = isWeekday ? this.kostlW : this.kostlH;
    const key = odpt.slice(-4);
    if (key in obj) {
      return obj[key].tr;
    }
    return "-";
  }
}
</script>
