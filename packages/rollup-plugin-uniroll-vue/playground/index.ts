import "./pre";
import { bundle } from "uniroll";
import vue from "rollup-plugin-vue";
import { unirollVue } from "../src/index";

const appCode = `import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
`;

const vueTsCode = `<script lang="ts">
import { defineComponent, ref, computed } from "https://unpkg.com/vue@3.0.0/dist/vue.runtime.esm-browser.js";
export default defineComponent({
  name: "App",
  setup() {
    const count = ref(0);
    const msg = computed(() => "hello world " + count.value.toString());
    const onClick = () => count.value++;
    return {
      count,
      msg,
      onClick
    };
  }
});
</script>

<template>
  <div class="container">
    <h1>Count: {{ count }}</h1>
    <button @click="onClick">Count</button>
  </div>
</template>

<style scoped>
h1 {
  color: red;
}
</style>
`;

(async () => {
  const files = {
    "/index.ts": appCode,
    "/App.vue": vueTsCode,
  };
  const rolled = await bundle({
    files,
    input: "/index.ts",
    cdnPrefix: "https://esm.sh/",
    // @ts-ignore
    extraPlugins: [vue({}), unirollVue()],
    // importmaps: {
    //   imports: {
    //     vue: "https://unpkg.com/vue@3.0.0/dist/vue.runtime.esm-browser.js",
    //   },
    // },
  });
  const out = await rolled.generate({
    file: "index.js",
    format: "iife",
    name: "playground",
  });
  const code = out.output[0].code;
  eval(code);
})().catch((err) => {
  console.error(err);
});
