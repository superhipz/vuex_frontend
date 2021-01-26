import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AdminUserList from "../components/admin/UserList";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import Shop from "../components/Shop";
import CreateShop from "../components/provider/CreateShop";
import PageNotFound from "../components/PageNotFound";
import AddItem from "../components/provider/AddItem";
import DashBoard from "../components/provider/DashBoard";
import ItemManager from "../components/provider/ItemManager";
import ShoppingCart from "../components/ShoppingCart";

import store from '../store'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/admin/users_list",
    name: "UsersList",
    component: AdminUserList,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    beforeEnter: (to, from, next) => {
      const user = store.state.currentUser;
      if (user && user.email) {
        alert("You have been signed in");
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignIn,
    beforeEnter: (to, from, next) => {
      const user = store.state.currentUser;
      if (user && user.email) {
        alert("You have been signed in");
        next("/");
      } else {
        next();
      }
    },
  },

  {
    path: "/shop/:email",
    name: "shop-view",
    component: Shop,
  },
  {
    path: "*",
    component: PageNotFound,
  },
  {
    path: "/provider/create_shop",
    name: "Create-Shop",
    component: CreateShop,
    beforeEnter: (to, from, next) => {
      const user = store.state.currentUser;
      if (user.type === "customer") {
        alert("You are not a provider");
        next("/");
      } else {
        next();
      }
    },
  },

  {
    path: "/provider/add_item",
    name: "Add-Item",
    component: AddItem,
    beforeEnter: (to, from, next) => {
      const user = store.state.currentUser;
      if (user.type === "customer") {
        alert("You are not a provider");
        next("/");
      } else {
        next();
      }
    },
  },

  {
    path: "/provider/dashboard",
    name: "Dashboard",
    component: DashBoard,
    beforeEnter: (to, from, next) => {
      const user = store.state.currentUser;
      if (user.type === "customer") {
        alert("You are not a provider");
        next("/");
      } else {
        next();
      }
    },
    
  },
  {
    path: "/provider/item_manager",
    name: "ItemManager",
    component: ItemManager,
    beforeEnter: (to, from, next) => {
      const user = store.state.currentUser;
      if (user.type === "customer") {
        alert("You are not a provider");
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/cart",
    name: "ShoppingCart",
    component: ShoppingCart,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
