import { RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/layouts/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "main",
        component: () => import("@/pages/MainPage.vue"),
      },
      {
        path: "/settings",
        name: "settings",
        component: () => import("@/pages/SettingsPage.vue"),
      },
      {
        path: "/test",
        name: "test",
        component: () => import("@/pages/TestPage.vue"),
      },
    ],
  },
];
