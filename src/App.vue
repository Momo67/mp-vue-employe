<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <HelloWorld/>
      <employe
        v-model="idemploye"
        ou-display-type="treeview"
      >
      <!--
        <template #actions="{ on: { save, validate, setVal  }, props: { employee, valid } }">
          <v-container>
            <v-row justify="end">
              <v-col>
                <v-btn color="info" @click="setVal">Initialize</v-btn>
              </v-col>
              <v-spacer></v-spacer>
              <v-col>
                <v-btn color="success" @click="validate">Validate</v-btn>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="1">
                <v-btn color="info" @click="save">Save</v-btn>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col>{{employee}}</v-col>
            </v-row>
          </v-container>
        </template>
      -->
      <!--
        <template #infos="{ employee }">{{ employee.initiales }}</template>
      -->
      </employe>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Employe from './components/Employe.vue';

export default {
  name: 'App',

  components: {
    HelloWorld,
    Employe
  },

  data: () => ({
    idemploye: 10958
  }),
};
</script>
