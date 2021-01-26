<template>
  <div>
    <table>
      <tr>
        <th>ID</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Type</th>
        <th>Status</th>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phone }}</td>
        <td>{{ user.type }}</td>
        <td>{{ user.status }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
// @ is an alias to /src

export default {
  computed: {
    ...mapState(["users"]),
  },
  //nhieu ha`ng -> gia rieng tu nhap vao -> so luong
  //hoa don -> xac nhan r moi ban
  //Huy don hang, xac nhan
  //
  mounted() {
    this.$store.dispatch("loadUsers");
    let check = this.$store.state.currentUser;
    if (check.type !== "admin") {
      alert("You dont have permission");
      return this.$router.push("/");
    }
  },
};
</script>

<style scoped>
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
