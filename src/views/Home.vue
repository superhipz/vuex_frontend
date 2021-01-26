<template>
  <div>
    <v-container>
      <v-row v-for="provider in providers" :key="provider.email">
        <router-link
          :to="{ name: 'shop-view', params: { email: provider.email } }"
        >
          <v-col md="4">
            <img
              v-if="provider.shop_name !== '{}'"
              :src="provider.shop_image"
              height="150px"
            />
          </v-col>
        </router-link>
        <v-col>
          <router-link
            :to="{ name: 'shop-view', params: { email: provider.email } }"
          >
            <h3>{{ provider.shop_name }}</h3>
            <p></p>
          </router-link>
        </v-col>
        <v-spacer> </v-spacer>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      shopImg: "",
    };
  },
  computed: {
    ...mapState(["providers"]),
  },
  mounted() {
    this.$store.dispatch("loadProvider");
  },
};
</script>

<style scoped>
.row {
  margin-top: 40px;
  margin-bottom: 30px;
}
</style>
