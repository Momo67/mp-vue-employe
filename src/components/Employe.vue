<template>
  <v-form 
    v-model="valid"
    ref="form_data"
    lazy-validation
  >
    <v-container grid-list-md>
      <v-layout wrap>
        <v-flex xs12 sm4 md4>
          <v-select
            v-model="employee.idpolitesse"
            :rules="[rules.required]"
            item-text="politesse"
            item-value="id"
            :items="[{id: '1', politesse:'Monsieur'}, {id: '2', politesse:'Madame'}]"
            :label="$t('userInterface.Courtesy')"
            required
            clearable
          ></v-select>
        </v-flex>

        <v-flex xs12 sm4 md4>
          <v-text-field
            v-model="employee.nom"
            :rules="[rules.required,rules.nomprenom]"
            counter="40"
            :label="$t('userInterface.LastName')"
            required
            clearable
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="employee.prenom"
            :rules="[rules.required,rules.nomprenom]"
            counter="30"
            :label="$t('userInterface.FirstName')"
            required
            clearable
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="dateNaissanceCH"
            :rules="[rules.date]"
            :label="$t('userInterface.Birthdate')"
            hint="jj.mm.aaaa"
            @blur="employee.datenaissance = parseDate(dateNaissanceCH)"
            v-mask="'##.##.####'"
            clearable
          >
            <template v-slot:append>
              <v-menu
                ref="menuDateNaissance"
                v-model="menuDateNaissance"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                    <v-icon v-on="on">mdi-calendar</v-icon>
                </template>
                <v-date-picker 
                  v-model="employee.datenaissance" 
                  :max="new Date().toISOString().substr(0, 10)"
                  @input="menuDateNaissance = false" 
                  @change="setDateCH('dateNaissanceCH', $event)"
                  :first-day-of-week="1" 
                  locale="fr">
                </v-date-picker>
              </v-menu>
            </template>
          </v-text-field>
        </v-flex>

        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="employee.telprive"
            :rules="[rules.telprive]"
            :label="$t('userInterface.PrivatePhone')"
            hint="0xx xxx xx xx"
            v-mask="'### ### ## ##'"
            clearable
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm4 md4>&nbsp;</v-flex>

        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="employee.addresse"
            :rules="[rules.addresse]"
            :label="$t('userInterface.Address')"
            counter="50"
            clearable
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="employee.codepostal"
            :rules="[rules.codepostal]"
            :label="$t('userInterface.PostalCode')"
            clearable
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="employee.localite"
            :rules="[rules.localite]"
            :label="$t('userInterface.Locality')"
            counter="50"
            clearable
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout wrap justify-end align-end>
        <v-flex shrink>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" @click="show_prof_data = !show_prof_data">
                <v-icon>{{ show_prof_data ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </template>
            <span>{{show_prof_data ? $t('userInterface.hideProfData') : $t('userInterface.showProfData')}}</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
      <v-layout wrap v-show="show_prof_data">
        <v-flex xs12 sm4 md4>
          <v-autocomplete
            v-model="employee.idou"
            :rules="[rules.required]"
            :items="orgunits"
            color="primary"
            hide-no-data
            item-text="Description"
            item-value="IdOrgUnit"
            :label="$t('userInterface.OrgUnit')"
            :placeholder="$t('userInterface.SearchHint')"
            autocomplete="something-new"
            required
            clearable
          ></v-autocomplete>
        </v-flex>

        <v-flex xs12 sm4 md4>
          <v-autocomplete
            v-model="employee.idfonction"
            :rules="[rules.required]"
            :items="fonctions"
            color="primary"
            hide-no-data
            item-text="Nom"
            item-value="Id"
            :label="$t('userInterface.Fonction')"
            :placeholder="$t('userInterface.SearchHint')"
            autocomplete="something-new"
            required
            clearable
          ></v-autocomplete>
        </v-flex>

        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="employee.initiales"
            :rules="[rules.initiales]"
            :label="$t('userInterface.Initials')"
            counter="10"
            clearable
          ></v-text-field>
        </v-flex>
        
        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="employee.email"
            :rules="[rules.required, rules.email]"
            :label="$t('userInterface.Email')"
            counter="50"
            required
            clearable
          ></v-text-field>
        </v-flex>
        
        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="employee.telprof"
            :rules="[rules.telprof]"
            :label="$t('userInterface.ProfPhone')"
            hint="xx xx ou 0xx xxx xx xx"
            v-mask="['## ##', '### ### ## ##']"
            clearable
          ></v-text-field>
        </v-flex>
        
        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="employee.natel"
            :rules="[rules.natel]"
            :label="$t('userInterface.Natel')"
            hint="07x xxx xx xx"
            v-mask="'### ### ## ##'"
            clearable
          ></v-text-field>
        </v-flex>
        
        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="employee.tauxactiv"
            :rules="[rules.tauxactiv]"
            :label="$t('userInterface.OccupancyRate')"
            counter="3"
            hint="%"
            clearable
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="dateDebutActivCH"
            :rules="[rules.date]"
            :label="$t('userInterface.ActivityStart')"
            hint="jj.mm.aaaa"
            persistent-hint
            @blur="employee.debutactiv = parseDate(dateDebutActivCH)"
            clearable
            v-mask="'##.##.####'"
            :error="validateDebutActiv"
          >
            <template v-slot:append>
              <v-menu
                ref="menuDebutActiv"
                v-model="menuDebutActiv"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                    <v-icon v-on="on">mdi-calendar</v-icon>
                </template>
                <v-date-picker 
                  v-model="employee.debutactiv" 
                  @input="menuDebutActiv = false" 
                  @change="setDateCH('dateDebutActivCH', $event)"
                  :first-day-of-week="1" 
                  locale="fr">
                </v-date-picker>
              </v-menu>
            </template>
          </v-text-field>
        </v-flex>

        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="dateFinActivCH"
            :rules="[rules.date]"
            :label="$t('userInterface.ActivityEnd')"
            hint="jj.mm.aaaa"
            persistent-hint
            @blur="employee.finactiv = parseDate(dateFinActivCH)"
            clearable
            v-mask="'##.##.####'"
            :error="validateFinActiv"
          >
            <template v-slot:append>
              <v-menu
                ref="menuFinActiv"
                v-model="menuFinActiv"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                    <v-icon v-on="on">mdi-calendar</v-icon>
                </template>
                <v-date-picker 
                  v-model="employee.finactiv" 
                  @input="menuFinActiv = false" 
                  @change="setDateCH('dateFinActivCH', $event)"
                  :first-day-of-week="1" 
                  locale="fr">
                </v-date-picker>
              </v-menu>
            </template>
          </v-text-field>
        </v-flex>

        <v-flex xs12 sm4 md4>
          <v-text-field
            v-model="employee.codezadig"
            :rules="[rules.codezadig]"
            :label="$t('userInterface.CodeZadig')"
            clearable
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="employee.loginnt"
            :rules="[rules.required,rules.loginnt]"
            counter="60"
            :label="$t('userInterface.LoginNT')"
            required
            clearable
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm4 md4> 
          <v-text-field
            v-model="employee.exchangelogin"
            :rules="[]"
            counter="60"
            :label="$t('userInterface.ExchangeLogin')"
            clearable
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm4 md4>
          <v-select
            v-model="employee.isactive"
            :rules="[rules.required]"
            item-text="etat"
            item-value="id"
            :items="[{id: '1', etat:'oui'}, {id: '0', etat:'non'}]"
            :label="$t('userInterface.Active')"
            required
            clearable
          ></v-select>
        </v-flex>

        <v-flex xs12 sm4 md4>
          <v-text-field
            v-model="manager"
            :label="$t('userInterface.Manager')"
            readonly
          >
            <template v-slot:append>
              <v-dialog v-model="show_employee_search" max-width="60%" :fullscreen="false" :scrollable="false" class="employe-search">
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on">mdi-account</v-icon>
                </template>
                <employe-search
                  id="employe-search"
                  v-model="show_employee_search"
                  :fullscreen="false"
                  :multi="false"
                  :json="true"
                  :get_data_url="get_data_url"
                  @selection_ready="setManager"
                >
                </employe-search>
              </v-dialog>
            </template>
          </v-text-field>
        </v-flex>
      </v-layout>

      <v-layout wrap justify-end align-end>
        <v-flex shrink>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" @click="show_comment = !show_comment">
                <v-icon>{{ show_comment ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </template>
            <span>{{show_comment ? $t('userInterface.hideComment') : $t('userInterface.showComment')}}</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
      <v-layout wrap v-show="show_comment">
        <v-flex> 
          <v-textarea
            v-model="employee.commentaire"
            :rules="[rules.commentaire]"
            counter="250"
            :label="$t('userInterface.Comment')"
            clearable
          ></v-textarea>
        </v-flex>
      </v-layout>

      <v-layout wrap class="modif_info">
        <slot name="infos" v-bind:props="{ employee }">
          <v-flex v-if="this.employee.idemploye != 0">
            {{`Créé le ${this.formatDate(employee.datecreated)} par ${this.creator}. `}} {{(employee.datelastmodif != null) ? `Dernière modification le ${this.formatDate(employee.datelastmodif)} par ${this.lastmodifuser}` : ''}}
          </v-flex>
        </slot>
      </v-layout>

      <v-layout wrap class="actions">
        <slot name="actions" v-bind:on="{ save, setVal, validate }" v-bind:props="{ employee, valid }">
          <v-container >
            <v-row justify="end">
              <v-col cols="1">
                <v-btn text color="info" @click="save">{{$t('userInterface.saveBtn')}}</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </slot>
      </v-layout>

      <v-dialog
        ref="message"
        v-model="show_msg"
        max-width="xs6"
        width="550"
        hide-overlay
      >
        <v-alert
          v-model="show_msg"
          :type="type_msg"
          prominent
          dismissible
          class="alert"
        >
          <template v-slot:default>
            <div v-html="message"></div>
          </template>
        </v-alert>
      </v-dialog>
    </v-container>
  </v-form>
</template>

<script>

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

import { DEV, ORGUNIT_INIT, EMPLOYEE_INIT } from '../config'
import { EMP_URL_AJAX, ORGUNIT_URL_AJAX } from '../config'
import { employe as EMPLOYE } from './employe'
import { orgunit as ORGUNIT } from './orgunit'
import { msg_level as MSG_LEVEL } from './employe'

import EmployeSearch from 'mp-vue-employe-search'
import Log from 'cgil-log'
import {mask} from 'vue-the-mask'

//import './latin'
import { removeAccents } from './accents'

const MODULE_NAME = 'Employe.vue'
const log = (DEV) ? new Log(MODULE_NAME, 4) : new Log(MODULE_NAME, 2)

export default {
  name: 'Employe',
  components: {
    'employe-search': EmployeSearch
  },
  directives: {mask},
  props: {
    value: {
      type: [String, Number],
      default: 0,
      required: true
    },
    get_data_url: {
      type: Object,
      default: () => ({
          orgunit_url: '',
          employee_url: ''
      }),
      required: false
    }
  },
  data: () => ({
    employee: {},
    message: '',
    type_msg: 'warning',
    show_msg: false,
    show_prof_data: true,
    show_employee_search: false,
    show_comment: true,
    valid: true,
    rules: {
      required: value => !!value || 'Champ obligatoire.',
      nomprenom: value => {
        const pattern = /^[a-zA-Zéèêëôöäàâüûîïç'\s-]*$/
        return pattern.test(value) || 'Valeur invalide'
      },
      date: value => {
        const pattern = /null|^\d{2}\.\d{2}\.(19|20)\d{2}$/
        return pattern.test(value) || 'Valeur invalide'
      },
      telprive: value => {
        const pattern = /null|^((01|0\d{2})\s[1-9][0-9]{2}\s[0-9]{2}\s[0-9]{2})$/
        return pattern.test(value) || 'Valeur invalide'
      },
      addresse: value => {
        const pattern = /null|^[a-zA-Z0-9\s.-]*$/
        return pattern.test(value) || 'Valeur invalide'
      },
      codepostal: value => {
        const pattern = /null|^[1-9][0-9]{3}$/
        return pattern.test(value) || 'Valeur invalide'
      },
      localite: value => {
        const pattern = /null|^[a-zA-Zéèêëôöäàâüûîïç\s-]*$/
        return pattern.test(value) || 'Valeur invalide'
      },
      initiales: value => {
        const pattern = /null|^[a-zA-Z]{2,10}$/
        return pattern.test(value) || 'Valeur invalide'
      },
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Valeur invalide'
      },
      telprof: value => {
        const pattern = /null|^(([1-9]{2}\s[0-9]{2})|((01|0\d{2})\s[1-9][0-9]{2}\s[0-9]{2}\s[0-9]{2}))$/
        return pattern.test(value) || 'Valeur invalide'
      },
      natel: value => {
        const pattern = /null|^07[6789]\s*[1-9][0-9]{2}\s*[0-9]{2}\s*[0-9]{2}$/
        return pattern.test(value) || 'Valeur invalide'
      },
      tauxactiv: value => {
        const pattern = /null|^((100)|(\d{1,2}))$/
        return pattern.test(value) || 'Valeur invalide'
      },
      codezadig: value => {
        const pattern = /null|^\d*$/
        return pattern.test(value) || 'Valeur invalide'
      },
      loginnt: value => {
        const pattern = /^((LAUSANNE_CH|TRX)\\[a-zA-Z_*-]{1,6}|[a-zA-Z_*-]{1,6})\d*[a-zA-Z_*-]*|[0-9a-zA-Z_*-]{1,40}\*?$/
        return pattern.test(value) || 'Valeur invalide'
      },
      isactive: value => {
        const pattern = /^[01]$/
        return pattern.test(value) || 'Valeur invalide'
      },
      commentaire: value => {
        const pattern = /null|^[\x21-\x7E\xC0-\xFF\s]*$/
        return pattern.test(value) || 'Valeur invalide'
      },
      id: value => {
        const pattern = /null|^[\d]+$/
        return pattern.test(value) || 'Valeur invalide'
      }
    },
    dateNaissanceCH: null,
    menuDateNaissance: false,
    dateDebutActivCH: null,
    validateDebutActiv: false,
    menuDebutActiv: false,
    dateFinActivCH: null,
    validateFinActiv: false,
    menuFinActiv: false,
    initiales: null,
    manager: '',
    creator: '',
    lastmodifuser: '',
    orgunit: undefined,
    orgunits: [],
    fonctions: []
  }),
  watch: {
    value (val) {
      this.employee.idemploye = val
      if (val === 0)
        this.employee = Object.assign({}, EMPLOYEE_INIT)
      else
        this.getEmpData(val)
    },
    'employee.prenom' (val) {
      if ((val !== '') && (val !== null)) {
        this.employee.email = removeAccents(val) + (((this.employee.nom !== '') && (this.employee.nom !== null)) ? ('.' + removeAccents(this.employee.nom)) : '') + '@lausanne.ch'
      }
    },
    'employee.nom' (val) {
      if ((val !== '') && (val !== null)) {
        this.employee.email = (((this.employee.prenom !== '') && (this.employee.prenom !== null)) ? (removeAccents(this.employee.prenom) + '.') : '') + removeAccents(val) + '@lausanne.ch'
      }
    },
    'employee.datenaissance' (val) {
      this.dateNaissanceCH = this.formatDate(val)
    },
    dateNaissanceCH (val) {
      if ((val !== null) && (val.length == 10)) {
        this.employee.datenaissance = this.parseDate(val)
      }
    },
    'employee.debutactiv' (val) {
      this.dateDebutActivCH = this.formatDate(val)
      if ((val !== null) && (val.length == 10) && (this.employee.finactiv !== null) && (this.employee.finactiv.length == 10) && (val > this.employee.debutactiv)) {
        this.validateDebutActiv = true
        this.validateFinActiv = true
        this.displayMessage('La date de fin d\'activité doit se situer après la date de début d\'activité...', MSG_LEVEL.WARNING)
      } else {
        this.validateDebutActiv = false
        this.validateFinActiv = false
      }
    },
    dateDebutActivCH (val) {
      if ((val !== null) && (val.length == 10)) {
        this.employee.debutactiv = this.parseDate(val)
      }
    },
    'employee.finactiv' (val) {
      this.dateFinActivCH = this.formatDate(val)
      if ((val !== null) && (val.length === 10) && (this.employee.debutactiv !== null) && (this.employee.debutactiv.length == 10) && (val < this.employee.debutactiv)) {
        this.validateDebutActiv = true
        this.validateFinActiv = true
        this.displayMessage('La date de fin d\'activité doit se situer après la date de début d\'activité...', MSG_LEVEL.WARNING)
      } else {
        this.validateDebutActiv = false
        this.validateFinActiv = false
      }
    },
    dateFinActivCH (val) {
      if ((val !== null) && (val.length == 10)) {
        this.employee.finactiv = this.parseDate(val)
      }
    },
    'employee.idpolitesse': function (val) {
      if (val !== null) {
        this.employee.issexm = (val == 1) ? 1 : 0
      }
    },
    'employee.initiales' (val) {
      if (!val) return null
      this.employee.initiales = val.toUpperCase()
    },
    'employee.loginnt': function (val) {
      if (!val) return null
      this.employee.loginnt = val.toUpperCase()
      this.employee.exchangelogin = val
    }
  },
  methods: {
    setDateCH (field, date) {
      this[field] = this.formatDate(date)
    },
    setVal () {
      this.employee.isactive = 1
      this.employee.idou = 153
      this.employee.idfonction = 26
      this.employee.datenaissance = '1967-02-20'
      //this.getManagerName(10958)
      this.employee.initiales = 'MP'
    },
    initialize () {
      this.employee = Object.assign({}, EMPLOYEE_INIT)
      this.orgunit = Object.assign({}, ORGUNIT_INIT)
      this.get_data_url.orgunit_url = (this.get_data_url.orgunit_url === '') ? ORGUNIT_URL_AJAX : this.get_data_url.orgunit_url
      this.get_data_url.employee_url = (this.get_data_url.employee_url === '') ? EMP_URL_AJAX : this.get_data_url.employee_url
      this.getOUList()
      this.getFonctionList()
    },
    validate () {
      if (this.$refs.form_data.validate()) {
        this.snackbar = true
      }
      if (this.employee.finactiv < this.employee.debutactiv) {
        this.validateDebutActiv = true
        this.validateFinActiv = true
        this.displayMessage('La date de fin d\'activité doit se situer après la date de début d\'activité...', MSG_LEVEL.WARNING)
      }
    },
    getOUList() {
      ORGUNIT.getList (this.orgunit, this.get_data_url.orgunit_url, (data) => {
        this.orgunits = data
      })
    },
    getFonctionList() {
      EMPLOYE.getFonctionList (this.get_data_url.employee_url, (data) => {
        this.fonctions = data
      })
    },
    setManager(manager) {
      if (JSON.parse(manager).length != 0) {
        let __manager = JSON.parse(manager)
        this.manager = __manager[0].nom + ' ' + __manager[0].prenom
        this.employee.idmanager = __manager[0].idemploye
      }
    },
    getEmpData(idemploye) {
      EMPLOYE.getEmpData(idemploye, this.get_data_url.employee_url, (data) => {
        this.employee = Object.assign({}, data)
        if (this.employee.idmanager != null)
          this.getManagerName(this.employee.idmanager)
        if (this.employee.idcreator != null)
          this.getEmpCreator(this.employee.idcreator)
        if (this.employee.idlastmodifuser != null)
          this.getLastModifUser(this.employee.idlastmodifuser)
      })
    },
    getEmpCreator (idemploye) {
      let __empname = ''
      EMPLOYE.getEmpName(idemploye, this.get_data_url.employee_url, (data) => {
        __empname = data[0].Nom.toUpperCase() + ' ' + data[0].Prenom
        this.creator = __empname
      })
    },
    getLastModifUser (idemploye) {
      let __empname = ''
      EMPLOYE.getEmpName(idemploye, this.get_data_url.employee_url, (data) => {
        __empname = data[0].Nom.toUpperCase() + ' ' + data[0].Prenom
        this.lastmodifuser = __empname
      })
    },
    getManagerName (idemploye) {
      EMPLOYE.getEmpName(idemploye, this.get_data_url.employee_url, (data) => {
        this.manager = data[0].Nom + ' ' + data[0].Prenom
      })
    },
    save() {
      if (!this.$refs.form_data.validate()) {
        this.show_prof_data = true
        this.show_comment = true
        this.displayMessage('Veuillez corriger les champs invalides avant de pouvoir sauver!', MSG_LEVEL.WARNING)
      }
      else {
        EMPLOYE.checkRights({idempeditor: this.employee.idempeditor, idemployetoedit: this.employee.idemploye, idou: this.employee.idou}, this.get_data_url.employee_url, (data) => {
          if (data.error !== undefined) {
            this.displayMessage(`<div>Une erreur s'est produite lors de l'appel de checkRights!</div><div>${data.error.reason}</div>`, MSG_LEVEL.ERROR)
          } else {
            if (data.RetCode) {
              log.l('## in Employe::checkRights RetCode: ', data.RetCode)
              if (data.RetCode > 0) {
                EMPLOYE.save(this.employee, this.get_data_url.employee_url, (data) => {
                  if (data.error) {
                    this.displayMessage(`<div>Une erreur s'est produite pendant la sauvegarde!</div><div>${data.error.reason}</div>`, MSG_LEVEL.ERROR)
                  } else {
                    if (data.success) {
                      this.employee.idemploye = parseInt(data.success.retval.idemploye)
                      this.$emit('input', this.employee.idemploye)
                      this.$emit('done', this.employee.idemploye)
                      this.displayMessage(`<div>Sauvegarde réussie!</div><div>idemploye: ${data.success.retval.idemploye}</div>`, MSG_LEVEL.SUCCESS)
                    }
                  }
                })
              }
            }
            else {
              this.displayMessage(`<div>Vous n'avez pas les droits suffisants pour éditer cet employé!</div><div>RetCode: ${data.RetCode}</div>`, MSG_LEVEL.ERROR)
            }
          }
        })
      }
    },
    formatDate (date) {
      if (!date) return null

      let __date = date.substring(0, 10)
      const [year, month, day] = __date.split('-')
      return `${day}.${month}.${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [day, month, year] = date.split('.')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    displayMessage (message, level) {
      this.message = message
      this.type_msg = level
      this.show_msg = true
    }
  },
  created () {
    this.initialize()
  },
  mounted () {
    this.employee.idemploye = this.value
    if (this.value === 0)
      this.employee = Object.assign({}, EMPLOYEE_INIT)
    else
      this.getEmpData(this.value)
  }
}
</script>

<style lang="css" scoped>
.container {
  padding: 1px;
}
.alert {
  margin-bottom: 0px;
}
</style>
<style lang="css">
.expanded {
  background: white;
}
.container {
  padding: 1px;
}
.modif_info {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 10pt; 
  font-style: italic;
}
</style>

<i18n src="../locales/fr.json"></i18n>
<i18n src="../locales/en.json"></i18n>
