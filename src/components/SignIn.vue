<template>
  <div class="signin">
    <v-form v-model="valid">
      <v-container>
        <h1>Sign In</h1>
        <v-text-field
          v-model="userInfo.email"
          label="Email"
          :rules="[required('email'), emailFormat()]"
        ></v-text-field>

        <v-text-field
          v-model="userInfo.password"
          label="Password"
          :type="show1 ? 'text' : 'password'"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
          :rules="[required('password'), minLength('password', 8)]"
          counter="true"
          @keyup.enter="signin"
        ></v-text-field>
        <v-btn x-large block @click="signin" color="success" :disabled="!valid"
          >Sign In</v-btn
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
      userInfo: {
        email: "",
        password: "",
      },
      show1: false,
      ...validation,
      valid: "",
      token: window.localStorage.token,
    };
  },
  methods: {
     signin() {
      return this.$store.dispatch("signin", this.userInfo);

      
    },
  },
};
</script>

<style scoped></style>
