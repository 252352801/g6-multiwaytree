import { createRouter,createWebHashHistory } from "vue-router";
import Home from "../views/home/index.vue";
import Editor from "../views/editor/index.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/editor",
    name: "editor",
    component: Editor,
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
