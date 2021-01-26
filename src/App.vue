<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img
            alt="Vuetify Logo"
            class="shrink mr-2"
            contain
            src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
            transition="scale-transition"
            width="40"
          />
        </router-link>
        <v-img
          v-if="
            currentShop.id === currentUser.id &&
            JSON.stringify(currentShop) !== '{}'
          "
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          max-width="100"
          :src="currentShop.shop_image"
          width="75"
        />
         <div><v-icon>mdi-shopping</v-icon>Shop Online</div>
      </div>

      <div v-if="currentUser.type === 'admin'">
        <v-btn to="/admin/users_list" text>Users List</v-btn>
      </div>

      <div
        v-if="
          currentUser.type === 'provider' &&
          currentShop.shop_name === null &&
          currentShop.shop_image === null
        "
      >
        <v-btn to="/provider/create_shop" text>Create Shop</v-btn>
      </div>

      <div
        v-if="
          currentShop.id === currentUser.id &&
          currentShop.shop_name !== null && 
          currentShop.shop_image !== null
        "
      >
        <v-btn to="/provider/dashboard" text>{{ currentShop.shop_name }}</v-btn>
      </div>

      <v-spacer></v-spacer>
      <div v-if="currentUser.status !=='active' && currentUser.type==='customer'  ">
        <v-btn text @click="active">
        <h5 style="color:orange">Tài khoản của bạn chưa được kích hoạt, <br> nhấn vào đây để kích hoạt và nhận tiền thưởng</h5>
      </v-btn>
        
      </div>
      <v-spacer></v-spacer>

      <div v-if="currentUser.type === 'customer'">
        <v-btn text to="/cart">
          <v-badge
            color="green"
            :content="this.$store.state.count.toString()"
            left
            overlap
          >
            <v-icon>mdi-cart-plus</v-icon>
          </v-badge>
          Giỏ hàng
        </v-btn>
      </div>

      <div v-if="currentUser.email">
        <v-btn text>
            <v-icon>mdi-account</v-icon>
            {{currentUser.email}}
        </v-btn>
        <v-divider
      class="mx-4"
      vertical
    ></v-divider>
    <span>
      <v-icon>mdi-currency-usd</v-icon>
      {{formatMoney(currentUser.amount)}}
      </span>
    <v-divider
      class="mx-4"
      vertical
    ></v-divider>
        <span>
          <v-icon>mdi-logout</v-icon>
          <v-btn text @click="logout">Logout</v-btn>
        </span>
      </div>

      <div v-else>
        <v-btn to="/signup" text>Sign Up</v-btn>
        <v-btn to="/signin" text>Sign In</v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",

  computed: {
    ...mapState(["currentUser"]),
    ...mapState(["currentShop"]),
    
  },
  // mounted() {
  //   this.$store.dispatch("loadCurrentShop");
      
  // },

  // beforeCreate() {
  //   if (
  //     window.localStorage.currentShop === undefined &&
  //     window.localStorage.token === undefined
  //   ) {
  //     window.localStorage.currentShop = "{}";
  //     window.localStorage.token = "{}";

  //   }
  // },

  methods: {
    logout() {
      return this.$store.dispatch("logout");
    },

    active(){
      return this.$store.dispatch('activeCustomer')
    },
    formatMoney(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>
