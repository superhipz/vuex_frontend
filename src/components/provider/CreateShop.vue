<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <h1>Submit your shop 's information</h1>
        <v-text-field
          v-model="createShopInfo.shopName"
          label="Name your shop"
          :rules="[required('Shop name')]"
        ></v-text-field>

        <v-text-field
          v-model="createShopInfo.shopImage"
          label="Enter image URL for your shop"
          :rules="[required('Shop Image')]"
        ></v-text-field>
        <div>
          Preview your image
          <v-img
            :src="createShopInfo.shopImage"
            contain
            position="center"
            max-width="300px"
            height="150px"
          />
        </div>

        <v-btn x-large block @click="submit" color="success" :disabled="!valid"
          >Submit</v-btn
        >
      </v-container>
    </v-form>
  </div>
</template>

<script>
import validation from "@/utils/validation";
export default {
  data() {
    return {
      createShopInfo: {
        shopName: "",
        shopImage: "",
      },
      ...validation,
      valid: "",
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("createShop", this.createShopInfo);
    },
  },
};
</script>

<style></style>
