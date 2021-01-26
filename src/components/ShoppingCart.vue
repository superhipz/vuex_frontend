<template >
  <div ref="content" id="canvas">
    <v-container>
      <h1>Giỏ hàng</h1>
    <table>
      <tr>
        <th>ID</th>
        <th>Sản phẩm</th>
        <th>Đơn giá(vnđ)</th>
        <th>Số lượng</th>
        <th>Số tiền(vnđ)</th>
        <th>Thao tác</th>
        <th>USER</th>
      </tr>
      <tr v-for="(item,i) in shoppingCart" :key="item.id">
        <td>{{item.id}}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.price}}</td>
        <td>{{item.count}}</td>
        <td>
          {{formatMoney(item.price * item.count) }}
        </td>
        <td>
          <v-btn class="primary" text @click="del(i)">Xóa</v-btn>
        </td>
        <td>{{item.user_id}}</td>
      </tr>
    </table>
    </v-container>
    <v-footer color="green"  shaped height="100" fixed padless >
      <div class="col-4 ml-10">
        <v-select
        label="PHƯƠNG THỨC THANH TOÁN"
        v-model="paymentMethod"
        :items="items"
        item-text="name"
        item-value="val"
        single-line
        return-object
        >
        </v-select>
        </div>
      <div class="col-2 ml-10">
        <h3 >{{count}} SẢN PHẨM</h3> 
        </div>
      <div class="col-3 ml-1">
        <h3>TỔNG TIỀN HÀNG: <h3>{{formatMoney(total)}}  vnđ</h3></h3> 
        </div>
        <div class="col-2"> 
          <v-btn @click="buy">
            <h3 style="color: red" >THANH TOÁN</h3>
            </v-btn>
        </div>
    </v-footer>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data(){
    return {
      items: [
        {name: "Thanh toán bằng tài khoản Ví ShopOnline", val: "WALLET"},
        {name: "Thanh toán tiền mặt khi nhận hàng", val: "CASH"},
        {name: "Thanh toán bằng tài khoản ngân hàng", val: "BANK"},
      ],
      paymentMethod: ''
    }
  },
  computed: {
    ...mapState(['shoppingCart']),
    ...mapState(['count']),
    total(){
      let total = 0
      for (let i=0;i<this.shoppingCart.length;i++){
        total += this.shoppingCart[i].count * this.shoppingCart[i].price
      } return total
    }
  },

  methods: {
    del(i){
      let item = this.shoppingCart[i]
      return this.$store.dispatch('delItemInCart', {item, i})
    },

    formatMoney(value) {
      let val = (value / 1).toFixed(0).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    payment(){
      let total = this.total
      let paymentMethod = this.paymentMethod
      return this.$store.dispatch('buy', {total, paymentMethod})
      
    }
  }
};
</script>

<style>
h1 {
  text-align: center;
}
table {
  width: 100%;
  border-collapse: collapse;
}

td,
th {
  border: 1px solid black;
  text-align: center;
  padding: 8px;
}
th {
  font-size: 18px;
}
</style>
