<template>
  <v-form 
    ref="form_data"
    lazy-validation>
    <v-container grid-list-md>
      <v-layout wrap>
        <v-flex xs12 sm4 md4>
          <v-select
            v-model="employee.idpolitesse"
            :rules="[rules.required]"
            item-text="politesse"
            item-value="id"
            :items="[{id: 1, politesse:'Monsieur'}, {id: 2, politesse:'Madame'}]"
            label="Politesse"
            required
            clearable
          ></v-select>
        </v-flex>

        <v-flex xs12 sm4 md4>
          <v-text-field
            v-model="employee.nom"
            :rules="[rules.required,rules.nomprenom]"
            counter="40"
            label="Nom"
            required
            clearable
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="employee.prenom"
            :rules="[rules.required,rules.nomprenom]"
            counter="30"
            label="Prénom"
            required
            clearable
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="employee.datenaissance"
            :rules="[rules.date]"
            label="Date de naissance"
            hint="jj.mm.aaaa"
            clearable
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="employee.telprive"
            :rules="[rules.telprive]"
            label="Téléphone privé"
            hint="0xx xxx xx xx"
            clearable
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm4 md4>&nbsp;</v-flex>

        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="employee.adresse"
            :rules="[rules.adresse]"
            label="Adresse"
            counter="50"
            clearable
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="employee.codepostal"
            :rules="[rules.codepostal]"
            label="Code postal"
            clearable
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="employee.localite"
            :rules="[rules.localite]"
            label="Localité"
            counter="50"
            clearable
          ></v-text-field>
        </v-flex>

        <v-flex xs12 align-content-center>
          <v-btn
            :disabled="!valid"
            color="success"
            @click="validate"
          >
            Validate
          </v-btn>
        </v-flex>

        <v-flex xs12 md12 lg12>
          {{employee}}
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: 'Employe',
  data: () => ({
    valid: true,
    employee: {
      idempeditor: -1,
      idpolitesse: null,
      issexm: -1,
      nom: '',
      prenom: '',
      datenaissance: null,
      telprive: null,
      adresse: null,
      codepostal: null,
      localite: null,
      idou: 0,
      idfonction: 0,
      initiale: null,
      email: '',
      telprof: null,
      natel: null,
      tauxactiv: null,
      debutactiv: null,
      finactiv: null,
      isactive: -1,
      codezadig: null,
      loginnt: '',
      exchangelogin: null,
      idmanager: null,
      commentaire: null
    },
    rules: {
      required: value => !!value || 'Champ obligatoire.',
      nomprenom: value => {
        const pattern = /^[a-zA-Z\s-]*$/
        return pattern.test(value) || 'Valeur invalide'
      },
      date: value => {
        const pattern = /^null|\d{2}\.\d{2}\.\d{4}$/
        return pattern.test(value) || 'Valeur invalide'
      },
      telprive: value => {
        const pattern = /^null|0\d{2}\s\d{3}\s\d{2}\s\d{2}$/
        return pattern.test(value) || 'Valeur invalide'
      },
      adresse: value => {
        const pattern = /^null|[a-zA-Z\s.-]*$/
        return pattern.test(value) || 'Valeur invalide'
      },
      codepostal: value => {
        const pattern = /^null|[1-9][0-9]{3}$/
        return pattern.test(value) || 'Valeur invalide'
      },
      localite: value => {
        const pattern = /^null|[a-zA-Zéèêëôöäàâüûîïç\s-]*$/
        return pattern.test(value) || 'Valeur invalide'
      },
      initiale: value => {
        const pattern = /^null|[A-Z]{2,10}$/
        return pattern.test(value) || 'Valeur invalide'
      },
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Valeur invalide'
      },
      telprof: value => {
        const pattern = /^null|(([0-9]{2}\s*[0-9]{2})|((01|0\d{2})\s*[0-9][0-9]{2}\s*[0-9]{2}\s*[0-9]{2}))$/
        return pattern.test(value) || 'Valeur invalide'
      },
      natel: value => {
        const pattern = /^null|07[6789]\s*[1-9][0-9]{2}\s*[0-9]{2}\s*[0-9]{2}$/
        return pattern.test(value) || 'Valeur invalide'
      },
      tauxactiv: value => {
        const pattern = /^null|((100)|(\d{1,2}))$/
        return pattern.test(value) || 'Valeur invalide'
      },
      codezadig: value => {
        const pattern = /^null|\d*$/
        return pattern.test(value) || 'Valeur invalide'
      },
      loginnt: value => {
        const pattern = /^[a-zA-Z_*]{1,5}\d*\*?$/
        return pattern.test(value) || 'Valeur invalide'
      },
      commentaire: value => {
        const pattern = /^null|[0-9a-zA-Zéèêëôöäàâüûîïç\s-]*$/
        return pattern.test(value) || 'Valeur invalide'
      },
      id: value => {
        const pattern = /^null|[\d]+$/
        return pattern.test(value) || 'Valeur invalide'
      }
    }
  }),
  watch: {
    'employee.idpolitesse': function (val) {
      if (val !== null) {
        this.employee.issexm = (val == 1) ? 1 : 0
      }
    },
    'employee.loginnt': function (val) {
      this.employee.exchangelogin = val
    }
  },
  methods: {
    validate () {
      if (this.$refs.form_data.validate()) {
        this.snackbar = true
      }
    }
  }
}
</script>