import { createApp } from "vue";
import { IonicVue } from "@ionic/vue";
import App from "@/app/App.vue";
import router from "@/router";
import { APP_MODE } from "@/shared/config";
import { themeModel } from "@/features/themeSwitcher";
import { createStore } from "@/app/providers";

import "@/app/assets/styles/root.scss";

const app = createApp(App)
  .use(IonicVue, {
    mode: APP_MODE,
  })
  .use(router);

router.isReady().then(async () => {
  await createStore();
  await themeModel.initTheme();

  app.mount("#app");
});
