<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld
        v-model="id"
      ></HelloWorld>
      <employe
        v-model="idemploye"
        @change="setEmploye"
      ></employe>
      <v-system-bar dark color="primary">
        <!--
        <v-spacer></v-spacer>
        -->
        <v-container fluid>
          <v-row>
            <v-col
              align="center"
              justify="center"
            >idemploye: {{id}}</v-col>
          </v-row>
        </v-container>
      </v-system-bar>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import Employe from './components/Employe'

export default {
  name: 'App',
  components: {
    HelloWorld,
    Employe
  },
  data: () => ({
    idemploye: 9559,
    id: 0
    //
  }),
  methods: {
    setEmploye (idemploye) {
      console.log("### idemploye: ", idemploye)
    }
  }
};
</script>
