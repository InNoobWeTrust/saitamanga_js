import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

import proxy from './proxy.js';
import request from './request.js';
import config2ParserMap from './parser/parser_map.js';
import { zip } from './utils/arr_mix.js';


Vue.component("card", {
  props: ["data"],
  template: `
<div class="card">
  <div class="card-image">
    <figure class="image is-3by4">
      <img v-bind:src="data.cover" v-bind:alt="data.title">
    </figure>
  </div>
  <div class="card-content">
    <figure class="media image is-3by1">
      <div class="media-content has-ratio">
        <a class="title is-6" v-bind:href="data.link">{{ data.title | truncate(32) }}</a>
      </div>
    </figure>
    <figure class="content image is-3by2">
      <p class="subtitle has-ratio is-6">{{ data.description | truncate(64) }}</p>
    </figure>
  </div>
</div>
  `,
});

Vue.component("grid", {
  props: ["arr"],
  template: `
<div class="container">
  <div class="columns is-gapless is-multiline is-mobile is-narrow">
    <div class="column is-one-quarter-desktop is-one-third-tablet is-half-mobile"
      v-for='(model, index) in arr'>
      <card v-bind:data="model"></card>
    </div>
  </div>
</div>
  `,
});

const pageConfig = [
  {
    field: "title",
    selector: ".table.table-hover>tbody>tr>td:nth-child(1)>a",
  },
  {
    field: "link",
    selector: ".table.table-hover>tbody>tr>td:nth-child(1)>a",
    attribute: "href",
  },
  {
    field: "cover",
    selector: ".table.table-hover>tbody>tr>td:nth-child(1)>a",
    attribute: "data-thumbnail",
  },
  {
    field: "description",
    selector: ".table.table-hover>tbody>tr>td:nth-child(1)>a",
    attribute: "data-description",
  },
];

const parsePage = config2ParserMap(pageConfig);

const textTruncate = (text, length, clamp) => {
  clamp = clamp || "...";
  return text.length > length ? text.slice(0, length) + clamp : text;
}
Vue.filter("truncate", textTruncate);

const app = new Vue({
  el: "#app",
  template: `
  <section class="section">
    <grid v-bind:arr="models"></grid>
  </section>
  `,
  data: {
    models: [],
  },
  mounted() {
    const ref = this;
    request(
      "GET",
      proxy(
        "https://hocvientruyentranh.net/truyen/all?filter_type=latest-chapter",
      ),
      (html) => {
        const dom = document.createElement("html");
        dom.innerHTML = html;
        const data = parsePage(dom);
        console.log(data);
        // TODO: make it work
        const cardsData = zip(
          data.title,
          data.cover,
          data.link,
          data.description,
        ).map(([title, cover, link, description]) => ({
          title,
          cover,
          link,
          description,
        }));
        ref.models = cardsData;
      },
    );
  },
});
