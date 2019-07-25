<template>
  <div id="show-users" class="mt-5">
    <b-container class="bv-light">
      <h1 class="mb-3" align="center">All User List</h1>
      <b-button class="addUser" variant="info">
        <router-link to="/add">Add User</router-link>
      </b-button>
      <b-button class="float-right" size="sm" variant="light" @click="invertSort('first_name')">Sort by name</b-button>
      <b-button class="float-right" size="sm"  variant="light" @click="invertSort('id')">Sort by id</b-button>
      <div class="userPanel" v-for="(user,index) in users" :key="user.id" :id="index">
        <b-row>
          <b-col>
            <b-img thumbnail fluid :src="user.avatar" alt></b-img>
          </b-col>
          <b-col cols="8">
            <p>First name: {{ user.first_name }}</p>
            <p>Lastname: {{ user.last_name }}</p>
            <p>Email: {{ user.email }}</p>
            <b-button
              size="sm"
              id="show-btn"
              variant="primary"
              v-on:click="showModal(user,index)"
            >Edit</b-button>
            <b-button size="sm" variant="danger" v-on:click="deleteUser(index)">Delete</b-button>
          </b-col>
        </b-row>
      </div>
    </b-container>
    <!--   pagination   -->
    <div class="overflow-auto mt-5">
      <b-pagination
        align="center"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
        @input="getUsers"
      ></b-pagination>
    </div>
    <!-- ------------------------------------ -->
    <!-- modal for edit user -->
    <b-modal self-align="center" ref="my-modal" hide-footer title="Edit user">
      <div>
        <b-form @submit="onSubmit" @reset="onReset">
          <div align="center" class="mb-5 img-wrapper">
            <b-img :src="this.form.avatar" fluid alt="Responsive image"></b-img>
          </div>
          <b-form-group
            id="input-group-1"
            label="Edit email address:"
            label-for="input-1"
            description="We'll never share your email with anyone else."
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              required
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Edit Name:" label-for="input-2">
            <b-form-input id="input-2" v-model="form.name" required placeholder="Enter name"></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-3" label="Edit lastname:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.lastname"
              required
              placeholder="Enter lastname"
            ></b-form-input>
          </b-form-group>

          <b-button class="float-right ml-1" type="submit" variant="success">Submit</b-button>
          <b-button class="float-right" type="reset" variant="danger">Reset</b-button>
        </b-form>
      </div>
    </b-modal>

    <!-- ------------------------------------------------------------------------- -->
  </div>
</template>

<script>
// Imports
import axios from "axios";

export default {
  data() {
    return {
      errored: false,
      perPage: null,
      currentPage: 1,
      rows: null,
      users: null,
      form: {
        avatar: "",
        email: "",
        name: "",
        lastname: "",
        bDay: "",
        phone: "",
        editedUserIndex: null
      },
      sortAsc: true,
      sortParam: null
    };
  },
  created() {
    this.getUsers;
  },
  methods: {
    deleteUser: function(index) {
      this.$delete(this.users, index);
    },
    showModal(usr, index) {
      this.form.email = usr.email;
      this.form.name = usr.first_name;
      this.form.lastname = usr.last_name;
      this.form.avatar = usr.avatar;
      this.form.editedUserIndex = index;
      this.$refs["my-modal"].show();
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.users[this.form.editedUserIndex].email = this.form.email;
      this.users[this.form.editedUserIndex].first_name = this.form.name;
      this.users[this.form.editedUserIndex].last_name = this.form.lastname;

      this.$refs["my-modal"].hide();

      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.lastname = "";
      this.form.editedUserIndex = "";
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.lastname = "";
      this.form.editedUserIndex = "";
    },
    invertSort(param) {
      this.sortAsc = !this.sortAsc;
      this.sortParam = param;
      this.sortData;
    }
  },
  computed: {
    getUsers() {
      const auth = {
        headers: { Authorization: localStorage.getItem("token") }
      };
      axios
        .get("https://reqres.in/api/users?page=" + this.currentPage, auth)
        .then(response => {
          console.log(response);
          //  Reset our form values
          this.users = response.data.data;
          this.perPage = response.data.per_page;
          this.currentPage = response.data.page;
          this.rows = response.data.total;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    sortData() {
      let result = this.users;
      let param = this.sortParam;
      let ascDesc = this.sortAsc ? 1 : -1;
      if (param === "first_name") {
        result.sort((a, b) => ascDesc * a[param].localeCompare(b[param]));
      } else {
        result.sort(function(a, b) {
          return ascDesc * a.id - b.id;
        });
      }
    }
  }
};
</script>

<style scoped>
#show-users {
  max-width: 800px;
  margin: 0px auto;
}
#show-users .user-list {
  list-style: none;
}
.userPanel {
  margin: 5px 0;
  border: 1px solid #17a2b8;
  padding: 5px;
  border-radius: 5px;
}
.img-wrapper {
  background: aliceblue;
  padding: 13px;
}
.btn-info {
  color: #fff;
  background-color: #17a2b8;
  border-color: #17a2b8;
  margin: 4px 0 45px;
}
.addUser a {
  color: aliceblue;
}
.addUser a:hover {
  text-decoration: none;
}
</style>