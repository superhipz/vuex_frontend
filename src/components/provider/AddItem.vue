<template>
  <div class="add_item">
    <v-form v-model="valid">
      <v-container>
        <h1>Thêm sản phẩm mới</h1>
        <v-text-field
          v-model="itemInfo.name"
          label="Nhập tên sản phẩm"
          :rules="[required('name')]"
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
          label="Giá bán "
          :rules="[required('price')]"
          :options="options"
        />

        <v-text-field
          v-model="itemInfo.brand"
          label="Hãng sản phẩm"
          :rules="[required('brand')]"
        ></v-text-field>

        <v-text-field
          v-model="itemInfo.location"
          label="Địa chỉ của bạn"
          :rules="[required('location')]"
        ></v-text-field>

        <v-text-field
          v-model="itemInfo.quantity"
          label="Số lượng nhập vào "
          :rules="[required('quantity'), numberFormat()]"
        ></v-text-field>

        <v-text-field
          v-model="itemInfo.description"
          label="Miêu tả ngắn gọn đặc điểm chính của sản phẩm "
          :rules="[required('description'), maxLength('description', 45)]"
          counter 
        ></v-text-field>

        <v-text-field
          v-model="itemInfo.itemImage"
          label="Hình ảnh sản phẩm"
          :rules="[required('itemImage')]"
        ></v-text-field>
        <img :src="itemInfo.itemImage" max-width="500px" position="center" />

        <v-btn x-large block @click="submit" color="success" :disabled="!valid"
          >Add Item</v-btn
        >
      </v-container>
    </v-form>
  </div>
</template>

<script>
import validation from "@/utils/validation";
import axios from "axios";

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
    };
  },

  methods: {
    async submit() {
      try {
        let token = JSON.parse(window.localStorage.token);
        await axios.post(
          "http://localhost:3000/api/provider/import_item",
          this.itemInfo,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );
        alert("Thêm sản phẩm mới thành công !");
        return this.$router.push("/provider/item_manager");
      } catch (err) {
        return alert(err);
      }
    },
  },
};
</script>

<style></style>
