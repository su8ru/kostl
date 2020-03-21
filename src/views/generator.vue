<template>
  <div id="generator">
    <b-btn @click="getData">getData()</b-btn>
    <div v-for="timetable in timetables" :key="timetable['@id']">
      <h3 class="mt-2">{{ timetable["owl:sameAs"].slice(36) }}</h3>
      <b-table-simple small>
        <b-tbody>
          <b-tr
            v-for="train in timetable['odpt:stationTimetableObject']"
            :key="train['odpt:train']"
          >
            <b-td>{{ train["odpt:departureTime"] }}</b-td>
            <b-td>
              {{ train["odpt:trainNumber"] }}
            </b-td>
            <b-td>
              <b-form-input
                v-model="
                  data[timetable['owl:sameAs']][
                    train['odpt:trainNumber'].slice(4)
                  ].tr
                "
                @change="
                  $set(
                    data[timetable['owl:sameAs']][
                      train['odpt:trainNumber'].slice(4)
                    ],
                    'un',
                    data[timetable['owl:sameAs']][
                      train['odpt:trainNumber'].slice(4)
                    ].tr.slice(-3)
                  )
                "
                size="sm"
              />
            </b-td>
            <b-td>
              {{
                data[timetable["owl:sameAs"]][
                  train["odpt:trainNumber"].slice(4)
                ].un
              }}
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
      <b-form-textarea
        :value="JSON.stringify(data[timetable['owl:sameAs']])"
        rows="3"
        no-resize
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
#generator {
  width: 800px;
  margin: 0 auto;
  padding: 1rem;
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";

interface Timetable {
  "@id": string;
  "@type": "odpt:StationTimetable";
  "dc:date": string;
  "@context": string;
  "dct:issued": string;
  "owl:sameAs": string;
  "odpt:railway": "odpt.Railway:Toei.Shinjuku";
  "odpt:station": "odpt.Station:Toei.Shinjuku.Ojima";
  "odpt:operator": OdptOperator;
  "odpt:calendar": string;
  "odpt:railDirection": OdptDirection;
  "odpt:stationTimetableObject": Train[];
}

interface Train {
  "odpt:train": string;
  "odpt:trainNumber": string;
  "odpt:departureTime": string;
  "odpt:destinationStation": string[];
}

interface Table {
  [key: string]: {
    [key: string]: { tr: string; un: string };
  };
}

enum OdptOperator {
  Keio = "odpt.Operator:Keio",
  Toei = "odpt.Operator:Toei"
}

enum OdptDirection {
  E = "odpt.RailDirection:Eastbound",
  W = "odpt.RailDirection:Westbound"
}

enum OdptTrainType {
  Local = "odpt.TrainType:Toei.Local",
  Express = "odpt.TrainType:Toei.Express"
}

@Component
export default class Generator extends Vue {
  timetables: Timetable[] = [];
  data: Table = {};

  mounted() {
    this.getData;
  }

  getJson(timetable: Timetable) {
    return JSON.stringify(this.data[timetable["owl:sameAs"]]);
  }

  async getData() {
    const resRaw = await axios.get<Timetable[]>(
      "https://api.odpt.org/api/v4/odpt:StationTimetable?odpt:railway=odpt.Railway:Toei.Shinjuku&odpt:station=odpt.Station:Toei.Shinjuku.Ojima&acl:consumerKey=" +
        process.env.VUE_APP_ODPT_TOKEN
    );
    const result: Timetable[] = resRaw.data;
    this.timetables.splice(0, this.timetables.length, ...result);

    for (const table of result) {
      this.$set(this.data, table["owl:sameAs"], {});
      for (const train of table["odpt:stationTimetableObject"]) {
        this.$set(
          this.data[table["owl:sameAs"]],
          train["odpt:trainNumber"].slice(4),
          { tr: "", un: "" }
        );
      }
    }
  }
}
</script>