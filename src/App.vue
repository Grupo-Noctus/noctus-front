<template>
    <v-card>
      <v-layout>
        <v-app-bar color="#371ED9">
          <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

          <v-toolbar-title>Instituto Matera</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon="mdi mdi-theme-light-dark" variant="text"></v-btn>
        </v-app-bar>

        <v-navigation-drawer
          v-model="drawer"
          :location="$vuetify.display.mobile ? 'bottom' : undefined"
          temporary
        >
          <v-list
            :items="items"
          ></v-list>
        </v-navigation-drawer>

        <v-main style="height: 500px;">
          <v-card-text>
            The navigation drawer will appear from the bottom on smaller size screens.
          </v-card-text>
        </v-main>
      </v-layout>
    </v-card>
  </template>
<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      {
        title: 'Home',
        value: 'home',
      },
      {
        title: 'Aluno',
        value: 'aluno',
      },

    ],
  }),

  watch: {
    group () {
      this.drawer = false
    },
  },
}
</script>
