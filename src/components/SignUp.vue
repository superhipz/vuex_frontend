<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <h1>Đăng ký</h1>
        <v-text-field
          v-model="userInfo.email"
          label="Email"
          :rules="[required('email'), emailFormat()]"
          prefix
        ></v-text-field>

        <v-text-field
          v-model="userInfo.name"
          label="Họ và tên"
          :rules="[required('Name')]"
        ></v-text-field>

        <v-text-field
          v-model="userInfo.phone"
          label="Số điện thoại"
          :rules="[required('Phone'), phoneFormat()]"
        ></v-text-field>

        <v-text-field
          v-model="userInfo.password"
          label="Mật khẩu"
          :type="show1 ? 'text' : 'password'"
          hint="At least 8 characters"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show1 = !show1"
          :rules="[required('password'), minLength('password', 8)]"
        ></v-text-field>

        <v-text-field
          v-model="userInfo.password_confirmation"
          label="Xác nhận mật khẩu"
          :type="show2 ? 'text' : 'password'"
          hint="Confirm your password"
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show2 = !show2"
          :rules="[required('password_confirmation'), match()]"
        ></v-text-field>

        <p>Bạn là người mua hàng hay bán hàng</p>
        <v-checkbox
          v-model="userInfo.type"
          label="Người bán"
          value="provider"
        ></v-checkbox>

        <v-checkbox
          v-model="userInfo.type"
          label="Người mua"
          value="customer"
        ></v-checkbox>

        <v-btn x-large block @click="signup" color="success" :disabled="!valid"
          >Đăng ký</v-btn
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
        name: "",
        phone: "",
        password: "",
        password_confirmation: "",
        type: "",
      },
      show1: false,
      show2: false,
      ...validation,
      valid: "",
    };
  },
  methods: {
    signup() {
      return this.$store.dispatch("signup", this.userInfo);
    },
  },
  computed: {
    match() {
      return () =>
        this.userInfo.password === this.userInfo.password_confirmation ||
        "Password is not match";
    },
  },
};
</script>

<style></style>
