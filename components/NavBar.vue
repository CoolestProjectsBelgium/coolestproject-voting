<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-container>
      <b-navbar-nav>
        <b-nav-form @submit.prevent="logout">
          <b-button type="submit">
            Logout
          </b-button>
        </b-nav-form>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-text right>
          Welcome {{ $auth.user.name }}
        </b-nav-text>
      </b-navbar-nav>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    async logout () {
      await this.$auth.logout()
    }
  }
}
</script>
