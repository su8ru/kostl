<template>
  <div ref="adMax" class="ad-m">
    <span class="ad-text">AD</span>
  </div>
</template>

<style lang="scss">
.ad-m {
  width: 320px;
  height: 270px;
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
    width: 300px;
    height: 250px;
    border: none;
    padding: 0;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AdMaxMain extends Vue {
  mounted() {
    const iframe = document.createElement("iframe");
    iframe.className = "ad-iframe";
    this.$el.appendChild(iframe);
    const html =
      // eslint-disable-next-line no-useless-escape
      '<body><script src="https://adm.shinobi.jp/o/4e8665d8030ae639f179ac017825b966"><\/script><\/body>';
    const iframeDocument = iframe.contentWindow!.document;
    iframeDocument.open();
    iframeDocument.write(html);
    iframeDocument.body.setAttribute("style", "margin: 0");
    iframeDocument.close();
  }
}
</script>
