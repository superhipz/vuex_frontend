<template>
  <div>
    <v-container>
      <v-row>
        <v-col v-for="(product, i) in products" :key="product.id" cols="4">
          <v-card>
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img
              height="300"
              position="center"
              :src="product.itemImage"
              contain
            ></v-img>

            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-text>Category : {{ product.category }}</v-card-text>

            <v-card-text>
              <div class="my-4 subtitle-1">
                <strong> VND • {{ formatPrice(product.price) }} </strong>
              </div>

              <div>{{ product.description }}</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>
            <v-card-title>THÔNG TIN SẢN PHẨM </v-card-title>
            <v-card-text>* Sản phẩm hãng : {{ product.brand }}</v-card-text>
            <v-card-text
              >* Số lượng hàng hiện tại : {{ product.quantity }}</v-card-text
            >
            <v-card-text
              >* Địa chỉ cửa hàng : {{ product.location }}</v-card-text
            >

            <v-card-actions>
              <v-btn color="deep-purple lighten-2" text rounded outlined @click="buy(i)">
                Mua ngay
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="deep-purple lighten-2"
                text
                rounded
                outlined
                @click="add(i)"
              >
                Thêm vào giỏ hàng
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    products() {
      return this.$store.state.products.filter(
        (prod) => prod.email === this.$route.params.email
      );
    },
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    add(i) {
      let user = this.$store.state.currentUser
      if (user.id === undefined){
        alert('You need to sign in first')
        return this.$router.push('/signin')
      }else{
      let item = this.products[i];
      return this.$store.dispatch("addItemToCart", item);
      }
      
    },

    buy(i) {
      let user = this.$store.state.currentUser
      if (user.id === undefined){
        alert('You need to sign in first')
        return this.$router.push('/signin')
      }else{
        let item = this.products[i];
       return this.$store.dispatch("buyItem", item);

      }
    },
  },
  mounted() {
    this.$store.dispatch("loadProduct");
  },
};
</script>

<style scoped>
.row {
  margin-top: 40px;
  margin-bottom: 30px;
}
</style>
