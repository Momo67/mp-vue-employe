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

    <v-main>
      <HelloWorld
        v-model="id"
      ></HelloWorld>
      <employe
        v-model="idemploye"
      >
      <!--
        <template v-slot:actions="{ on: { save, validate, setVal  }, props: { employee, valid } }">
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
      -->
        <template #infos="{ employee }">{{ employee.initiales }}</template>
      </employe>
      <v-row>
        <v-col lg="1"><v-btn color="info" @click="onReset(-1)">RST to -1</v-btn></v-col>
        <v-col lg="1"><v-btn color="info" @click="onReset(0)">RST to 0</v-btn></v-col>
        <v-col lg="1"><v-btn color="info" @click="setEmploye(10307)">Set</v-btn></v-col>
      </v-row>
      <v-system-bar dark color="primary">
        <v-container fluid>
          <v-row>
            <v-col
              align="center"
              justify="center"
            >idemploye: {{idemploye}}</v-col>
          </v-row>
        </v-container>
      </v-system-bar>
    </v-main>
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
    idemploye: 10958,//15262,//10307,
    //idemploye: 0,
    id: 0,
    justify: [
      'start',
      'center',
      'end',
      'space-around',
      'space-between',
    ],
    //
  }),
  methods: {
    setEmploye (idemploye) {
      this.idemploye = idemploye
    },
    onReset (val) {
      //this.idemploye = 0
      this.idemploye = val
    }
  }
};
</script>

<style>
.actions button {
  border-radius: 4px;
}
.modif_info {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10pt; 
  font-style: italic;
}
</style>