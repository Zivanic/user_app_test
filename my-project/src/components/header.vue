<template>
  <b-navbar class="p-3" toggleable="lg" type="dark" variant="info">

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link class="mr-2" v-if="isLoggedIn" to="/" exact>User list</router-link>
        <router-link class="mr-2" v-if="isLoggedIn" to="/add" exact>New user</router-link>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav v-if="isLoggedIn" class="ml-auto mr-5">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template slot="button-content">
            <a>User</a>
          </template>
          <span class="logout" v-if="isLoggedIn"><a @click="logout">Logout</a></span>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
    computed : {
      isLoggedIn : function(){return this.$store.getters.isLoggedIn}
      
    },
    methods: {
      logout: function () {
        this.$store.dispatch('logout')
        .then(() => {
          this.$router.push('/login')
        })
      }
    },
  }
</script>

<style scoped>
a {
  color: #fff;
  text-decoration: none;
  padding: 5px;
  border-radius: 5px;
  }
.router-link-active {
  color: #d1ecf1;
    border-bottom: 2px solid #d1ecf1;
    border-radius: 0;
    
}
.navbar-nav .dropdown-menu a{
   color: #444;
   margin-left: 7px;
}
.logout a{
  width: 100%;
}
.logout a:hover{
  cursor: pointer;
  color: aqua;
}
</style>