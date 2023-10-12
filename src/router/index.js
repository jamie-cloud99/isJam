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
          path: "/posts",
          component: () => import("../views/user/PostList.vue"),
        },
        {
          path: "posts/:postId",
          name: "post",
          component: () => import("../views/user/PostView.vue"),
        },
        {
          path: "search",
          component: () => import("../views/user/SearchList.vue"),
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
          path: "posts/new",
          component: () => import("../views/admin/PostNewView.vue"),
        },
        {
          path: "posts/:postId",
          component: () => import("../views/admin/PostEditView.vue"),
        },
        {
          path: "data",
          component: () => import("../views/admin/DataView.vue"),
        },
      ],
    },
    {
      path: "/login",
      component: () => import("../views/LoginView.vue"),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  },
});

router.beforeEach((to, from) => {
  const titleFromParams = to.query?.pageTitle;
  if (titleFromParams) {
    document.title = `${titleFromParams} - ${document.title}`;
  } else {
    document.title = to.meta?.title ?? "JamJam Blog 即興發揮的日常";
  }
});

export default router;
