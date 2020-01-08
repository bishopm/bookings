<template>
  <q-layout view="hHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-black text-white" :glossy="$q.theme === 'mat'" :inverted="$q.theme === 'ios'">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="fas fa-user" />
        </q-btn>
        <q-toolbar-title>
          <router-link to="/" class="text-white" style="text-decoration:none;">Venues</router-link>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view :key="$route.fullPath"></router-view>
    </q-page-container>
    <q-drawer side="right" v-model="rightDrawerOpen" :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null">
      <q-item-label class="text-center bg-primary text-white q-py-md">
        Circuit
      </q-item-label>
      <q-item to="/diary/circuit">
        <q-item-section avatar>
          <q-icon color="primary" name="fas fa-fw fa-calendar" />
        </q-item-section>
        <q-item-section side>
          <q-item-label overline>Circuit diary</q-item-label>
          <q-item-label caption>add or edit diary entries</q-item-label>
        </q-item-section>
      </q-item>
      <q-item to="/plan">
        <q-item-section avatar>
          <q-icon color="primary" name="fas fa-fw fa-microphone" />
        </q-item-section>
        <q-item-section side>
          <q-item-label overline>Preaching plan</q-item-label>
          <q-item-label caption>set up preachers and plan</q-item-label>
        </q-item-section>
      </q-item>
      <q-item to="/societies">
        <q-item-section avatar>
          <q-icon color="primary" name="fas fa-fw fa-map-marker-alt" />
        </q-item-section>
        <q-item-section side>
          <q-item-label overline>Societies</q-item-label>
          <q-item-label caption>view all societies</q-item-label>
        </q-item-section>
      </q-item>
      <q-item-label class="text-center bg-black text-white q-py-md">
        Administration
      </q-item-label>
      <q-item to="/settings">
        <q-item-section avatar>
          <q-icon color="primary" name="fas fa-fw fa-cogs" />
        </q-item-section>
        <q-item-section side>
          <q-item-label overline>Settings</q-item-label>
          <q-item-label caption>user settings (v{{version}})</q-item-label>
        </q-item-section>
      </q-item>
    </q-drawer>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      rightDrawerOpen: this.$q.platform.is.desktop,
      version: localStorage.getItem('CHURCHNET_Version')
    }
  },
  mounted () {
    if (localStorage.getItem('CHURCHNET_Token')) {
      this.$q.loading.show({
        message: 'Welcome! Logging you in...',
        messageColor: 'white',
        spinnerSize: 250, // in pixels
        spinnerColor: 'white'
      })
      this.$store.commit('setToken', localStorage.getItem('CHURCHNET_Token'))
      /* this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.$store.state.token
      this.$axios.get(process.env.API + '/users/' + localStorage.getItem('CHURCHNET_user_id'))
        .then((response) => {
          if (localStorage.getItem('CHURCHNET_Version')) {
            this.$q.loading.hide()
            if (localStorage.getItem('CHURCHNET_Version') !== response.data.version) {
              this.$q.dialog({
                title: 'New version available',
                message: 'Click OK to restart the app and upgrade to version ' + response.data.version + '. This new version includes: ' + response.data.updatenotes,
                ok: 'OK',
                cancel: 'LATER'
              }).onOk(() => {
                localStorage.setItem('CHURCHNET_Version', response.data.version)
                window.location.reload()
              }).catch(() => {
                console.log('Delaying upgrade')
              })
            }
          } else {
            localStorage.setItem('CHURCHNET_Version', response.data.version)
          }
          this.$q.loading.hide()
        })
        .catch(function (error) {
          console.log(error)
        }) */
      this.$q.loading.hide()
    } else {
      this.$router.push({ name: 'login' })
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('CHURCHNET_Token')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style>
#toolbar {
  display: flex;
  justify-content: space-between;
}
.q-item {
  margin-left: 0px;
  margin-right: 0px;
  padding-left: 20px;
}
</style>
