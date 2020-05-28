<template>
  <div id="app">
    <header>
      <h1>こすとれ</h1>
      <span>KO･S Train Location</span>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <nav>
        <ul>
          <li>
            <b-link :to="{ name: 'home' }">
              在線
            </b-link>
          </li>
          <li>
            <b-link :to="{ name: 'postUnyo' }">
              運用投稿
            </b-link>
          </li>
          <li>
            <b-link :to="{ name: 'policy' }">
              利用規約
            </b-link>
          </li>
          <li>
            <b-link href="https://github.com/su8ru/kostl" target="_blank">
              <font-awesome-icon :icon="['fab', 'github']" />
              GitHub
            </b-link>
          </li>
        </ul>
      </nav>
      <small>
        &copy; su8ru and collaborators 2020
      </small>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
#app {
  min-width: 100%;
  width: max-content;
  background-color: #eee;

  header {
    display: flex;
    justify-content: center;
    align-items: baseline;
    background-color: $keio-blue;
    color: white;
    padding: 0.5rem 0 0.5rem 0;
    margin: 0 auto;
    width: 100%;
    height: 50px;
    position: fixed;
    z-index: 1000;
    top: 0;
    h1 {
      font-size: 1.5rem;
      margin-right: 1rem;
    }
    h1,
    span {
      display: block;
    }
  }

  main {
    margin: 0 auto;
    width: min-content;
    background: #fff;
    margin-top: 50px;
    margin-bottom: 80px;
  }

  footer {
    border-top: 5px solid $keio-blue;
    padding: 0.25rem 0;
    line-height: 2;
    background-color: #fff;
    width: 100%;
    height: 80px;

    position: fixed;
    bottom: 0;
    z-index: 1000;

    display: flex;
    flex-direction: column;

    text-align: center;
    * {
      font-size: 1rem;
    }
    nav > ul {
      margin: 0;
      padding: 0;
      li {
        list-style-type: none;
        display: inline;

        &:not(:last-of-type)::after {
          content: " ・ ";
        }
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class Layout extends Vue {}
</script>
