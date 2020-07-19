<template>
  <div ref="adMax" class="ad-v">
    <span class="ad-text">AD</span>
  </div>
</template>

<style lang="scss">
.ad-v {
  width: 180px;
  height: 620px;
  padding: 10px;
  background: #fafafa;
  .ad-text {
    display: inline-block;
    position: absolute;
    border: 1px solid #cccc;
    border-radius: 2px;
    font-size: 12px;
    color: #ccc;
    background: #fff;
    padding: 0.5px 3px;
  }
  iframe {
    display: block;
    width: 160px;
    height: 600px;
    border: none;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AdMaxVertical extends Vue {
  mounted() {
    const iframe = document.createElement("iframe");
    iframe.className = "ad-iframe";
    this.$el.appendChild(iframe);
    const html =
      // eslint-disable-next-line no-useless-escape
      '<body><script src="https://adm.shinobi.jp/s/e92b8b21730a605aed0e5360f61738db"><\/script><\/body>';
    const iframeDocument = iframe.contentWindow!.document;
    iframeDocument.open();
    iframeDocument.write(html);
    iframeDocument.body.setAttribute("style", "margin: 0");
    iframeDocument.close();
  }
}
</script>
