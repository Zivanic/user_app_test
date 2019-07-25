<template>
  <b-container class="bv-light">
    <h1 align="center" class="mt-5">Sign in</h1>
    <b-row align-h="center">
      <b-col cols="12" md="6">
        
        <b-alert v-show="err" dismissible variant="danger" show>All fields are required</b-alert>
        <b-form @submit.prevent="login" class="mt-5">
          <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="email"
              type="email"
              
              placeholder="Enter email"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Password:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="password"
              type="password"
              required
              placeholder="Enter password"
            ></b-form-input>
          </b-form-group>

          <b-button block type="submit" variant="success">Sign in</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      err: false
    };
  },
  methods: {
    login: function() {
      let email = this.email;
      let password = this.password;
      if (email == "" || password == "") {
        this.err = true;
        return false;
      }
      email = "eve.holt@reqres.in";
      password = "cityslicka";

      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/"))
        .catch(err => console.log(err));
    }
  }
};
</script>