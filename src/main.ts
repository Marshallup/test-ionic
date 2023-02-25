import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { themeModel } from "./features/theme";

import { IonicVue } from "@ionic/vue";

import "./theme/index.css";

const app = createApp(App).use(IonicVue).use(router);

router.isReady().then(() => {
  themeModel.initTheme();
  app.mount("#app");
});
