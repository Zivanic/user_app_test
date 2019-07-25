<template>
  <div>
    <b-container class="bv-light">
      <router-link class="float-right" to="/">
        <span class="back">&laquo</span>
      </router-link>
      <h1 align="center" class="mt-5">Add User</h1>
      <b-row align-h="center">
        <b-col cols="12" md="6">
          <b-form @submit="onSubmit" @reset="onReset" class="mt-5">
            <b-form-group
              id="input-group-1"
              label="Email address:"
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
            <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
              <b-form-input id="input-2" v-model="form.name" required placeholder="Enter name"></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-3" label="Your lastname:" label-for="input-3">
              <b-form-input
                id="input-3"
                v-model="form.lastname"
                required
                placeholder="Enter lastname"
              ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-4" label="Your phone number:" label-for="input-4">
              <input
                id="input-4"
                placeholder="(123) 456-7890"
                required
                type="text"
                v-mask="'(###) ###-####'"
                v-model="form.phone"
              />
            </b-form-group>
            <b-form-group id="input-group-5" label="Your date of birth:" label-for="input-5">
              <datepicker
                required
                placeholder="Select day of birth"
                v-model="form.bDay"
                name="birthday"
              ></datepicker>
            </b-form-group>

            <b-button type="submit" class="float-right" variant="success">Submit</b-button>
            <b-button type="reset" class="float-right mr-3" variant="danger">Reset</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// Imports
import Datepicker from "vuejs-datepicker"
import axios from "axios"

export default {
  data() {
    return {
      errored: false,
      form: {
        email: "",
        name: "",
        lastname: "",
        bDay: "",
        phone: ""
      }
    };
  },
  components: {
    Datepicker
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.form.phone = this.form.phone.replace(/[.*+?^${}()|[\]\\-\s+]/g, "");
      // console.log(this.form);
      const auth = {
        headers: { Authorization: localStorage.getItem("token") }
      };
      axios
        .post("https://reqres.in/api/users", this.form,auth)
        .then(response => {
          console.log(response);
          //  Reset our form values
          this.form.email = "";
          this.form.name = "";
          this.form.lastname = "";
          this.form.bDay = "";
          this.form.phone = "";
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.lastname = "";
      this.form.bDay = "";
      this.form.phone = "";
    }
  },
  computed: {}
};
</script>

<style scoped>
#input-4 {
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}
.back {
  font-size: 30px;
  color: #000;
}
a:hover {
  text-decoration: none;
}
</style>