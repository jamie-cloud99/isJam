import { createRouter, createWebHashHistory } from "vue-router";
import LayoutView from "../views/LayoutView.vue";
import HomeView from "../views/user/HomeView.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: LayoutView,
      children: [
        {
          path: "/",
          component: HomeView,
        },
        {
          path: "post/:postId",
          component: () => import("../views/user/PostView.vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("../views/AdminDashboard.vue"),
      children: [
        {
          path: "posts",
          component: () => import("../views/admin/PostList.vue"),
        },
        {
          path: "post/new",
          component: () => import("../views/admin/PostEditView.vue"),
        },
        {
          path: "post/:postId",
          component: () => import("../views/admin/PostEditView.vue"),
        },
      ],
    },
  ],
});

export default router;
