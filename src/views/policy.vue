<template>
  <div id="policy">
    <section>
      <h2>README</h2>
      <ul>
        <li>
          対応路線:<br />
          <ul>
            <li>
              京王電鉄:
              京王線･京王新線･京王相模原線･京王高尾線･京王競馬場線･京王動物園線
            </li>
            <li>都営地下鉄: 都営新宿線（新宿～新宿三丁目駅間以東）</li>
          </ul>
        </li>
        <li>
          運用番号:<br />
          <b-link href="https://6111.teacup.com/keiodia/bbs">
            京王線談話室
          </b-link>
          に掲載されている公式･非公式運番を使用
        </li>
        <li>
          行き先表示:
          <ul>
            <li>都営線内: 正確な表示に対応</li>
            <li>京王線内: 正確な表示に対応（2020.04.01 Update 経過観察中）</li>
            <li>化け運用: ほぼ対応済（２･３色表示）</li>
          </ul>
        </li>
        <li>
          注意事項（簡易版）:
          <ul>
            <li>提供するデータの正確性は保証されません。</li>
            <li>京王電鉄および東京都交通局への問い合わせを固く禁止します。</li>
            <li>
              新線新宿駅付近でAPIが変わるので、列車が増殖したり消えたりすることがあります。
            </li>
            <li>
              都営新宿線内同一区間内での列車順序・駅のホーム配置情報は用意されていないため、実際と異なる可能性があります。
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <section>
      <h2>利用規約</h2>
      <h3>概要</h3>
      <p>
        こすとれ kostl（以下、当サイトとする）は、
        京王電鉄の提供する「列車走行位置お知らせサービス」および公共交通オープンデータ協議会の提供する「公共交通オープンデータセンター」から、
        京王線･京王新線･京王相模原線･京王高尾線･京王競馬場線･京王動物園線･都営地下鉄新宿線の列車走行位置データを取得し、
        情報を加えた上で表示するものです。
      </p>
      <h3>注意事項</h3>
      <p>
        公共交通事業者により提供されたデータを元にしていますが、必ずしも正確・完全なものとは限りません。
      </p>
      <p>
        当サイトでは京王電鉄および公共交通オープンデータ協議会の提供するデータを使用していますが、当サイトについての公共交通事業者への問い合わせを固く禁止します。
      </p>
      <h3>連絡先</h3>
      <p>
        当サイトについてのご連絡は、
        <b-link href="https://twitter.com/su8ru_">Twitter(@su8ru_)</b-link>
        または
        <b-link href="mailto:contact@su8ru.dev">mail(contact@su8ru.dev)</b-link>
        までお願いします。
      </p>
    </section>
    <section>
      <h2>プライバシーポリシー</h2>
      <h3>JavaScriptの実行について</h3>
      <p>
        当サイトでは、情報提供のため、JavaScriptを使用しています。
      </p>
      <p>
        閲覧にあたり、閲覧者のデバイスを利用して情報提供を目的とした処理を行います。
        JavaScriptの実行はブラウザの機能により停止することが可能ですが、その場合当サイトは情報提供を行えないため、JavaScriptの実行を停止することは推奨いたしません。
      </p>
      <h3>Google Analytics の使用について</h3>
      <p>
        当サイトでは、アクセス解析のため、Google Analytics を使用しています。
      </p>
      <p>
        Google Analytics
        によって情報が収集され使用される詳細は、Googleによる説明ページでご確認ください。
      </p>
      <ul>
        <li>
          <b-link
            href="https://policies.google.com/technologies/partner-sites?hl=ja"
          >
            Googleのサービスを使用するサイトやアプリから収集した情報のGoogleによる使用
          </b-link>
        </li>
        <li>
          <b-link
            href="https://marketingplatform.google.com/about/analytics/terms/jp/"
          >
            Google Analytics 利用規約
          </b-link>
        </li>
        <li>
          <b-link href="https://policies.google.com/privacy?hl=ja">
            Google Privacy Policy
          </b-link>
        </li>
      </ul>
    </section>
    <section>
      <h2>helpful tools</h2>
      <ul>
        <li>
          <b-link :to="{ name: 'generator' }">都営新宿線 json generator</b-link>
        </li>
        <li>
          <b-link :to="{ name: 'calibration' }">json calibration</b-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="scss" scoped>
#policy {
  padding: 1rem;
  li {
    margin-bottom: 0.3rem;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Policy extends Vue {}
</script>
