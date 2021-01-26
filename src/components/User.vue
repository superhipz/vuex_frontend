<template>
  <div>
    <v-container>
      <h1>User information</h1>
      <div>{{ currentUser }}</div>
    </v-container>
  </div>
</template>

<script>
// const user = JSON.parse(window.localStorage.currentUser)
import { mapState } from "vuex";
export default {
  data() {
    return {
      ...mapState(["currentUser"]),
    };
  },
};
</script>

<style></style>
