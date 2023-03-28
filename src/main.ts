import { createApp } from "vue";
import { IonicVue } from "@ionic/vue";
import App from "@/app/App.vue";
import router from "@/router";
import { APP_MODE } from "@/shared/config";
import { themeSwitcherModel } from "@/features/themeSwitcher";
import { createStore } from "@/app/providers";
import { createPinia } from "pinia";

import "@/app/assets/styles/root.scss";

const pinia = createPinia();

const app = createApp(App)
  .use(pinia)
  .use(IonicVue, {
    mode: APP_MODE,
  })
  .use(router);

router.isReady().then(async () => {
  await createStore();
  await themeSwitcherModel.initTheme();

  app.mount("#app");
});
