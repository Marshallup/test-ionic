import { RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/pageLayouts/default/Ui.vue"),
    children: [
      {
        path: "",
        name: "main",
        component: () => import("@/pages/main/Ui.vue"),
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("@/pages/settings/Ui.vue"),
      },
      {
        path: "create-debt",
        name: "createDebt",
        component: () => import("@/pages/createDebt/Ui.vue"),
      },
    ],
  },
];
