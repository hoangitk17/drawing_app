export default [
  {
    path: "",
    name: "UserLayout",
    component: () => import("@/layouts/UserLayout.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/pages/home/index.vue"),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: () => import("@/pages/error/404/index.vue"),
  },
];
