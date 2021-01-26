import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Swal from "sweetalert2";
import router from "../router";
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    currentUser: {},
    token: {},
    providers: [],
    products: [],
    currentShop: {},
    currentShop_Items: [],
    shoppingCart: [],
    count: 0,
    paymentInfo: {},
  },

  // ------------------------------------------=========================================------------------------------------------------------------------------===========================

  mutations: {
    // Danh sách của tất cả USER ( dành cho admin để quản lý user)
    SET_USERS(state, users) {
      state.users = users;
    },

    //Lưu thông tin đăng nhập của user
    LOGIN_USER(state, user) {
      state.currentUser = user;
      // window.localStorage.currentUser = JSON.stringify(user);
    },

    //Lưu thông tin shop của user nếu có
    LOGIN_SHOP(state, shopInfo) {
      state.currentShop = shopInfo;
    },

    //Lưu token của user
    SET_TOKEN(state, token) {
      state.token = token;
      window.localStorage.token = token;
    },

    // Đăng Xuất
    LOGOUT(state) {
      state.currentUser = {};
      state.token = {};
      state.shoppingCart = [];
      state.count = 0;
      // window.localStorage.currentUser = JSON.stringify({});
      window.localStorage.token = JSON.stringify({});
    },

    //Lưu thông tin user mỗi lần page F5
    SET_CURRENT_USER(state, user) {
      state.currentUser = user;
    },

    //Lưu thông tin shop của user mỗi lần page F5
    SET_CURRENT_SHOP(state, shopInfo) {
      state.currentShop = shopInfo;
    },

    // Danh sách người bán hàng
    SET_PROVIDERS(state, providers) {
      state.providers = providers;
    },

    // Danh sách sản phẩm của người bán (Dành cho người mua )
    SET_PRODUCTS(state, products) {
      state.products = products;
    },

    // Danh sách sản phẩm người bán sở hữu (Dành cho người bán xóa, sửa, .....)
    SET_CURRENT_SHOP_ITEM(state, items) {
      state.currentShop_Items = items;
    },

    // Lưu thông tin giỏ hàng vào local storage
    SET_SHOPPING_CART(state, item) {
      state.shoppingCart.push(item);
    },

    SET_COUNT(state) {
      state.count++;
    },

    DEL_COUNT(state, count) {
      state.count -= count;
    },

    DEL_ITEM_CART(state, i) {
      state.shoppingCart.splice(i, 1);
    },

    SAVE_COUNT(state, i) {
      state.shoppingCart[i].count++;
    },

    SET_PAYMENT_INFO(state, paymentInfo) {
      state.paymentInfo = paymentInfo;
    },

    PAY_MONEY(state, total){
      state.currentUser.amount -= total;
      state.shoppingCart = [];
      state.count = 0
    },

    EARN_MONEY(state){
      state.currentUser.amount = 10000000
      state.currentUser.status = "active"
    }



  },

  // ------------------------------------------=========================================------------------------------------------------------------------------===========================

  actions: {
    async loadUsers({ commit }) {
      try {
        let token = JSON.parse(window.localStorage.token);
        let response = await axios.get(
          "http://localhost:3000/api/admin/user_list",
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        let users = response.data;
        return commit("SET_USERS", users);
      } catch (err) {
        console.log(err);
      }
    },

    // async loadCurrentUser({ commit }) {
    //   let user = JSON.parse(window.localStorage.currentUser);
    //   let token = window.localStorage.token;
    //   await commit("SET_CURRENT_USER", user);
    //   await commit("SET_TOKEN", token);
    // },

    // async loadCurrentShop({ commit }) {
    //   let shopInfo = JSON.parse(window.localStorage.currentShop);
    //   await commit("SET_CURRENT_SHOP", shopInfo);
    // },

    // async loadCurrentShopItem({ commit }) {
    //   let itemInfo = JSON.parse(window.localStorage.currentShop);
    //   await commit("SET_CURRENT_ITEM", itemInfo);
    // },

    async signin({ commit }, userInfo) {
      try {
        let response = await axios.post(
          "http://localhost:3000/api/public/login",
          userInfo
        );
        let user = response.data.data.user;
        let token = JSON.stringify(response.data.data.access_token);
        alert("Sign In successful, " + user.email);
        await commit("LOGIN_USER", user);
        await commit("SET_TOKEN", token);
        let shopData = await axios.get(
          "http://localhost:3000/api/provider/shop_info",
          {
            headers: {
              Authorization: "Bearer " + response.data.data.access_token,
            },
          }
        );
        let shopInfo = shopData.data;
        commit("LOGIN_SHOP", shopInfo);
        return router.push("/");
      } catch (err) {
        return alert(
          err.response.data.data[0].message || err.response.data.message
        );
      }
    },

    logout({ commit }) {
      if (this.state.shoppingCart.length !== 0) {
        Swal.fire({
          title: "Bạn có chắc muốn đăng xuất không?",
          text:
            "Bạn vẫn còn hàng chưa thanh toán trong giỏ, nếu bạn đăng xuất giỏ hàng sẽ xóa dữ liệu!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Tôi chắc chắn muốn đăng xuất!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Đã đăng xuất thành công!",
              "Cảm ơn bạn đã ghé thăm website của chúng tôi",
              "success"
            );
            commit("LOGOUT");
            return router.push("/signin");
          }
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Đăng xuất thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        commit("LOGOUT");
        return router.push("/signin");
      }
    },

    async signup({ dispatch }, userInfo) {
      try {
        let response = await axios.post(
          "http://localhost:3000/api/public/register",
          userInfo
        );
        let user = response.data.data.user;
        alert("Sign up successful, " + user.email);
        return dispatch("signin", {
          email: userInfo.email,
          password: userInfo.password,
        });
      } catch (err) {
        return alert(
          err.response.data.data[0].message || err.response.data.message
        );
      }
    },

    async loadProvider({ commit }) {
      let response = await axios.get(
        "http://localhost:3000/api/public/customer/provider_list"
      );
      let providers = response.data;
      commit("SET_PROVIDERS", providers);
    },

    async loadProduct({ commit }) {
      let response = await axios.get(
        "http://localhost:3000/api/public/customer/product_list"
      );
      const products = response.data;
      commit("SET_PRODUCTS", products);
    },

    async createShop({ commit }, createShopInfo) {
      try {
        let token = JSON.parse(window.localStorage.token);
        await axios.put(
          "http://localhost:3000/api/provider/create_shop",
          createShopInfo,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        let shopData = await axios.get(
          "http://localhost:3000/api/provider/shop_info",
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        let shopInfo = shopData.data;
        await commit("LOGIN_SHOP", shopInfo);
        return router.push("/provider/dashboard");
      } catch (err) {
        return alert(err);
      }
    },

    async loadItem({ commit }) {
      let token = JSON.parse(window.localStorage.token);
      let response = await axios.get(
        "http://localhost:3000/api/provider/item_list",
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      let items = response.data;
      commit("SET_CURRENT_SHOP_ITEM", items);
    },

    async addItemToCart({ commit }, item) {
      commit("SET_COUNT");
      let itemCheck = this.state.shoppingCart.find((i) => i.id === item.id);
      let i = this.state.shoppingCart.indexOf(itemCheck);
      if (itemCheck) {
        await commit("SAVE_COUNT", i);
        alert("Thêm sản phẩm thành công");
      } else {
        await commit("SET_SHOPPING_CART", item);
        return alert("Thêm sản phẩm thành công");
      }
    },

    async buyItem({ commit }, item) {
      commit("SET_COUNT");
      let itemCheck = this.state.shoppingCart.find((i) => i.id === item.id);
      let i = this.state.shoppingCart.indexOf(itemCheck);
      if (itemCheck) {
        await commit("SAVE_COUNT", i);
        return router.push("/cart");
      } else {
        await commit("SET_SHOPPING_CART", item);
        return router.push("/cart");
      }
    },

    async delItemInCart({ commit }, { item, i }) {
      let count = item.count;
      commit("DEL_COUNT", count);
      commit("DEL_ITEM_CART", i);
      console.log(this.state.shoppingCart)
    },

    async activeCustomer({commit}) {
      let token = JSON.parse(window.localStorage.token);
     await axios.put(  
        "http://localhost:3000/api/customer/earn_money",
        null,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      alert('Kích hoạt thành công, bạn đã nhận được 10.000.000 đồng vào tài khoản')
        commit('EARN_MONEY')
    },

    async payment({commit}, {paymentMethod, total}){
      if (paymentMethod.val === undefined){
        alert('Vui lòng chọn phương thức thanh toán')
      }else {
        if (paymentMethod.val === "CASH" || paymentMethod.val === "BANK"){
        alert("Hiện shop chỉ cho phép thanh toán bằng Ví ShopOnline ")
      }else{
        let customerWallet = this.state.currentUser.amount
        if (total > customerWallet){
          alert("Bạn không có đủ tiền để thanh toán")
        }else{
          let token = JSON.parse(window.localStorage.token);
          for (let i=0;i<this.state.shoppingCart.length; i++){
            let moneyToPay = this.state.shoppingCart[i].count * this.state.shoppingCart[i].price
            let itemId = this.state.shoppingCart[i].id
            let shopId = this.state.shoppingCart[i].user_id
            let quantityBuy = this.state.shoppingCart[i].count
            await axios.post('http://localhost:3000/api/customer/buy_item', {
                totalMoneyToPay: moneyToPay,
                itemId: itemId,
                shopId: shopId,
                quantityBuy: quantityBuy
            }, {
              headers: { Authorization: "Bearer " + token },
            }
            )
          }
          await commit('PAY_MONEY', total)
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Thanh toán thành công, cảm ơn bạn đã mua hàng ở shop chúng tôi !",
            showConfirmButton: false,
            timer: 1500,
          });
          return router.push('/')
        }
      }
      }
    }

    
  },  
  modules: {},
  plugins: [createPersistedState()],
});
