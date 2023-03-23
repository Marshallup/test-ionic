import { createApp } from "vue";
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "./app/firebase";
import App from "./app/App.vue";
import router from "@/router";
import { APP_MODE } from "@/shared";
import { themeModel } from "@/features/theme";

import { IonicVue } from "@ionic/vue";

import "./theme/index.css";

const app = createApp(App)
  .use(IonicVue, {
    mode: APP_MODE,
  })
  .use(VueFire, {
    firebaseApp,
    modules: [
      // we will see other modules later on
      VueFireAuth(),
    ],
  })
  .use(router);

router.isReady().then(() => {
  themeModel.initTheme();
  app.mount("#app");
});
