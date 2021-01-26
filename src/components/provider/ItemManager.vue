<template>
  <div>
    <v-container>
      <v-row>
        <v-btn to="/provider/add_item">Thêm mới </v-btn>
      </v-row>
      <v-row>
        <v-col v-for="(item, i) in currentShop_Items" :key="item.id" cols="4">
          <v-card height="850px" hover transparent>
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
              :src="item.itemImage"
              contain
            ></v-img>

            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-text>Category : {{ item.category }}</v-card-text>

            <v-card-text>
              <div class="my-4 subtitle-1">
                <strong> VND • {{ formatPrice(item.price) }} </strong>
              </div>

              <div>{{ item.description }}</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>
            <v-card-title>THÔNG TIN SẢN PHẨM </v-card-title>
            <v-card-text>* Sản phẩm hãng : {{ item.brand }}</v-card-text>
            <v-card-text
              >* Số lượng hàng hiện tại : {{ item.quantity }}</v-card-text
            >
            <v-card-text>* Địa chỉ cửa hàng : {{ item.location }}</v-card-text>

            <v-card-actions>
              <!-- <v-btn
                color="deep-purple lighten-2"
                text
                rounded
                outlined
              >
                Sửa
              </v-btn> -->
              <v-dialog
                :retain-focus="false"
                v-model="dialog"
                max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="select(item.id, i)"
                  >
                    Sửa
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline"
                      >Nhập thông tin sản phẩm bạn muốn sửa</span
                    >
                  </v-card-title>
                  <v-container>
                    <v-text-field
                      v-model="itemInfo.name"
                      label="Nhập tên sản phẩm"
                      :rules="[required('name')]"
                      single-line
                    ></v-text-field>

                    <p>Hãy phân loại sản phẩm của bạn</p>
                    <v-checkbox
                      v-model="itemInfo.category"
                      label="Thời trang"
                      value="fashion"
                    ></v-checkbox>

                    <v-checkbox
                      v-model="itemInfo.category"
                      label="Đồ điện tử"
                      value="electronic devices"
                    ></v-checkbox>

                    <v-checkbox
                      v-model="itemInfo.category"
                      label="Giải trí"
                      value="entertainment"
                    ></v-checkbox>

                    <v-checkbox
                      v-model="itemInfo.category"
                      label="Phương tiện"
                      value="vehicle"
                    ></v-checkbox>

                    <vuetify-money
                      v-model="itemInfo.price"
                      label="Price"
                      :rules="[required('price')]"
                      :options="options"
                    />

                    <v-text-field
                      v-model="itemInfo.brand"
                      label="Brand"
                      :rules="[required('brand')]"
                    ></v-text-field>

                    <v-text-field
                      v-model="itemInfo.location"
                      label="Location"
                      :rules="[required('location')]"
                    ></v-text-field>

                    <v-text-field
                      v-model="itemInfo.quantity"
                      label="Quantity"
                      :rules="[required('quantity'), numberFormat()]"
                    ></v-text-field>

                    <v-text-field
                      v-model="itemInfo.description"
                      label="Description"
                      :rules="[required('description')]"
                    ></v-text-field>

                    <v-text-field
                      v-model="itemInfo.itemImage"
                      label="Item Image"
                      :rules="[required('itemImage'), imageFormat()]"
                    ></v-text-field>
                    <img
                      :src="itemInfo.itemImage"
                      width="300px"
                      position="center"
                    />
                  </v-container>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialog = false">
                      Close
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="editItem(item.id)"
                    >
                      Submit
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <v-spacer></v-spacer>

              <v-btn
                color="deep-purple lighten-2"
                text
                rounded
                outlined
                @click="deleteItem(item.id, i)"
              >
                Xóa
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import validation from "@/utils/validation";

export default {
  data() {
    return {
      itemInfo: {
        name: "",
        category: "",
        price: "",
        brand: "",
        location: "",
        quantity: "",
        description: "",
        itemImage: "",
      },
      valid: "",
      ...validation,
      options: {
        locale: "pt-BR",
        prefix: "VND",
        length: 20,
        precision: 0,
      },
      dialog: false,
    };
  },
  computed: {
    ...mapState(["currentShop_Items"]),
  },

  mounted() {
    this.$store.dispatch("loadItem");
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    async deleteItem(id, i) {
      try {
        let token = JSON.parse(window.localStorage.token);
        await axios.delete(
          "http://localhost:3000/api/provider/delete_item?selectedId=" + id,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        await this.currentShop_Items.splice(i, 1);
        alert("Xóa sản phẩm thành công");
        return window.location.reload();
      } catch (err) {
        alert(err);
      }
    },

    async editItem(id) {
      try {
        let token = JSON.parse(window.localStorage.token);
        await axios.put(
          "http://localhost:3000/api/provider/edit_item?selectedId=" + id,
          this.itemInfo,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        alert("Sửa sản phẩm thành công");
        return window.location.reload();
      } catch (err) {
        alert(err);
      }
    },

    select(id, i) {
      this.itemInfo.name = this.$store.state.currentShop_Items[i].name;
      this.itemInfo.category = this.$store.state.currentShop_Items[i].category;
      this.itemInfo.price = this.$store.state.currentShop_Items[i].price;
      this.itemInfo.brand = this.$store.state.currentShop_Items[i].brand;
      this.itemInfo.location = this.$store.state.currentShop_Items[i].location;
      this.itemInfo.quantity = this.$store.state.currentShop_Items[i].quantity;
      this.itemInfo.description = this.$store.state.currentShop_Items[
        i
      ].description;
      this.itemInfo.itemImage = this.$store.state.currentShop_Items[
        i
      ].itemImage;
    },
  },
};
</script>

<style >
.row {
  margin-top: 50px
}
</style>
