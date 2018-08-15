import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Users from "@/views/Users.vue";
import UserInfo from "@/views/UserInfo.vue";
import UserAdd from "@/views/UserAdd.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        title: "Home page"
      }
    },
    {
      path: "/users",
      name: "users",
      component: Users,
      meta: {
        title: "Users list"
      }
    },
    {
      path: "/user/:userId",
      name: "user",
      component: UserInfo,
      props: true,
      meta: {
        title: "User info"
      }
    },
    {
      path: "/user/add",
      component: UserAdd,
      meta: {
        title: "Add new user"
      }
    }
  ]
});
