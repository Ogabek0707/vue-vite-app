export default {
      path: "/:pathMatch(.*)*",
      // path: "/:catchAll(.*)*",
      name: "not-found",
      component: import("../views/not-found/NotFoundPage.vue")
}