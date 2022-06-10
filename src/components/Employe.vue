<template>
  <v-form 
    v-model="valid"
    ref="form_data"
    lazy-validation
  >
    <v-container grid-list-md>
      <v-layout wrap>
        <v-flex xs12 sm4 md4> 
          <v-textarea
            v-model="employee.loginnt"
            auto-grow
            no-resize
            rows="1"
            :rules="[rules.required,rules.loginnt]"
            counter="60"
            :label="$t('userInterface.LoginNT')"
            required
            clearable
          >
            <template v-slot:append-outer v-if="employee.idemploye === 0">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon v-on="on" :color="sam_status.color">{{sam_status.icon}}</v-icon>
                </template>      
                <span>{{sam_status.message}}</span>
              </v-tooltip>
            </template>
          </v-textarea>
        </v-flex>

        <v-flex xs12 sm4 md4> 
          <v-textarea
            v-model="employee.exchangelogin"
            auto-grow
            no-resize
            rows="1"
            :rules="[]"
            counter="60"
            :label="$t('userInterface.ExchangeLogin')"
            clearable
          ></v-textarea>
        </v-flex>

        <v-flex xs12 sm4 md4>
          <v-switch class="ml-4"
            v-model="employee.isactive"
            inset
            true-value="1"
            false-value="0"
          >
            <template v-slot:label>Actif: {{(employee.isactive === '1') ? 'oui' : 'non'}}</template>
          </v-switch>
        </v-flex>

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
      </v-layout>

<!--
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
-->      
      <v-layout wrap v-show="show_prof_data">



      <!--
        <v-flex xs12 sm4 md4>
          <v-autocomplete
            v-model="employee.idou"
            :rules="[rules.required]"
            :items="orgunits"
            item-text="DescTreeDenorm"
            item-value="IdOrgUnit"
            :search-input="ouSearch"
            :label="$t('userInterface.OrgUnit')"
            :placeholder="$t('userInterface.SearchHint')"
            autocomplete="something-new"
            hide-no-data
            color="primary"
            required
            clearable
          >
            <template v-slot:selection="{ item }">{{ item.DescTreeDenorm }}</template>
          </v-autocomplete>
        </v-flex>
      -->


        <template v-if="ouDisplayType == 'treeview'">
          <v-flex xs12 sm4 md4>
            <v-text-field 
              v-model="orgunit.OUName" 
              :rules="[rules.required]"
              :label="$t('userInterface.OrgUnit')" 
              readonly 
              clearable 
              required
              @click="showOU" 
              @click:clear="clearTreeOU">
            </v-text-field>
          </v-flex>
          <!--
          <v-flex xs4>
          -->
            <v-card
              v-show="show_ou"
              class="mx-auto tree-ou"
              max-width="500"
              @keyup.escape="show_ou = !show_ou"
            >
              <v-sheet class="pa-4 primary lighten-2">
                <v-text-field
                              v-model="ouSearch"
                              :label="$t('userInterface.searchOU')"
                              dark
                              flat
                              hide-details
                              clearable
                              @input="searchOU"
                              ></v-text-field>
              </v-sheet>
              <v-card-text class="tree-ou-text">
                <v-treeview ref="tree"
                            @update:active="getSelectedOU"
                            return-object   
                            dense
                            :active="active_ou"
                            activatable
                            active-class="grey lighten-4 indigo--text"
                            hoverable
                            :items="orgunits"
                            :search="ouSearch"
                            :open.sync="init_opened_ou"
                            >
                </v-treeview>
              </v-card-text>
            </v-card>
          <!--            
          </v-flex>
          -->
        </template>




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

        <v-flex xs12 sm4 md4 v-show="false">
          <v-text-field
            v-model="employee.codezadig"
            :rules="[rules.codezadig]"
            :label="$t('userInterface.CodeZadig')"
            clearable
          ></v-text-field>
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
                  v-if="show_employee_search"
                  id="employe-search"
                  v-model="show_employee_search"
                  :fullscreen="false"
                  :multi="false"
                  :json="true"
                  :get_data_url="get_data_url"
                  @selection-ready="setManager"
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
              <v-btn icon v-on="on" @click="show_perso_data = !show_perso_data">
                <v-icon>{{ show_perso_data ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
              </v-btn>
            </template>
            <span>{{show_perso_data ? $t('userInterface.hidePersoData') : $t('userInterface.showPersoData')}}</span>
          </v-tooltip>
        </v-flex>
      </v-layout>
      <v-layout wrap v-show="show_perso_data">
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
        <slot name="infos" v-bind:employee="employee">
          <v-flex v-if="employee.idemploye != 0">
            <span v-html="getAffaireSuivi(employee.idaffairesuiviutilisateur)"></span><br/>
            {{((parseInt(employee.nbragendetosend) === 0) ? `Aucun` : `${employee.nbragendetosend}`) + ` agendé${(employee.nbragendetosend > 1) ? 's' : ''} à recevoir.`}}&nbsp;
            {{((parseInt(employee.nbrcirculationtosend) === 0) ? `Aucune` : `${employee.nbrcirculationtosend}`) + ` circulation${(employee.nbrcirculationtosend > 1) ? 's' : ''} à recevoir.`}}<br/>
            <span v-if="employee.dateacceptcond !== null">{{`Conditions d'utilisation acceptées le ${formatDate(employee.dateacceptcond)}`}}
              <span v-if="acceptcond !== ''">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn x-small icon v-on="on" @click="show_cond = !show_cond">
                      <v-icon>{{ show_cond ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
                    </v-btn>
                  </template>
                  <span>{{show_cond ? $t('userInterface.hideCondLog') : $t('userInterface.showCondLog')}}</span>
                </v-tooltip>
              </span>
            </span>
            <span v-else>Conditions d'utilisation : -</span>
            <div class="ml-4" v-if="show_cond"  v-html="acceptcond"></div>
            <br/>     
            {{`Créé le ${formatDate(employee.datecreated)} par ${creator}. `}} {{(employee.datelastmodif != null) ? `Dernière modification le ${formatDate(employee.datelastmodif)} par ${lastmodifuser}` : ''}}<br/>
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
        <v-alert style="margin-bottom: 0px;"
          v-model="show_msg"
          :type="type_msg"
          prominent
          dismissible
          class="alert"
          @input="messageCallback"
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

import { DEV, ORGUNIT_INIT, EMPLOYEE_INIT, SAM_STATUS } from '../config'
import { EMP_URL_AJAX, ORGUNIT_URL_AJAX } from '../config'
import { employe as EMPLOYE } from './employe'
import { orgunit as ORGUNIT } from './orgunit'
import { msg_level as MSG_LEVEL } from './employe'

//import EmployeSearch from 'mp-vue-employe-search'
import EmployeSearch from '../../lib/EmployeSearch.umd'
import Log from 'cgil-log'
import {mask} from 'vue-the-mask'

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
    },
    showProfData: {
      type: Boolean,
      default: true,
      required: false
    },
    showPersoData: {
      type: Boolean,
      default: false,
      required: false
    },
    showComment: {
      type: Boolean,
      default: false,
      required: false
    },
    ouDisplayType: {
      type: String,
      default: 'treeview',
      require: false,
      validator(value) {
        return ['treeview', 'select'].includes(value)
      }      
    }
  },
  data: () => ({
    employee: {},
    message: '',
    type_msg: 'warning',
    show_msg: false,
    messageCallback: undefined,
    show_prof_data: true,
    show_perso_data: false,
    show_employee_search: false,
    show_comment: true,
    show_cond: false,
    sam_status: {},
    valid: true,
    rules: {
      required: value => !!value || 'Champ obligatoire.',
      nomprenom: value => {
        const pattern = /^[a-zA-Zéèêëôöäàâüûîïç'\s()-]*$/
        return pattern.test(value) || 'Valeur invalide'
      },
      date: value => {
        const pattern = /null|^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
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
        const pattern = /null|^([a-zA-Z]{2,10})*$/
        return pattern.test(value) || 'Valeur invalide'
      },
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Valeur invalide'
      },
      telprof: value => {
        const pattern = /null|^(([1-9]{1}[0-9]{1}\s[0-9]{2})|((01|0\d{2})\s[1-9][0-9]{2}\s[0-9]{2}\s[0-9]{2}))$/
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
        const pattern = /^((LAUSANNE_CH|TRX)\\([a-zA-Z_-]{1,}\d{0,4})\*?)|([^XX_\\(LAUSANNE_CH|TRX)][a-zA-Z]{1,20})|(XX_[A-Z0-9]{8}-([A-Z0-9]{4}-){3}[A-Z0-9]{12})$/
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
    acceptcond: null,
    creator: '',
    lastmodifuser: '',
    orgunit: undefined,
    orgunits: [],
    ouSearch: '',
    fonctions: [],
    openedOU: [],
    lastOpenedOU: [],
    allOpenedOU: false,
    show_ou: false,
    active_ou: [],
    init_opened_ou: [],
  }),
  watch: {
    value (val) {
      this.employee = Object.assign({}, EMPLOYEE_INIT)
      this.creator = ''
      this.lastmodifuser = ''
      this.acceptcond = ''
      this.show_cond = false

      if (val === -1) {
        this.employee.isactive = '1'      // Actif: oui
        this.employee.idfonction = '4'    // Pas saisie
        this.clearTreeOU()
        this.$refs.form_data.validate()
        this.employee.idemploye = 0
      } else if (val === 0) {
        this.$refs.form_data.reset()
      } else if (val > 0) {
        this.employee.idemploye = val
        this.getEmpData(val)
      }
    },
    'employee.prenom' (val) {
      if ((val !== '') && (val !== null)) {
        if (this.employee.idemploye === 0) {
          this.employee.email = removeAccents(val) + (((this.employee.nom !== '') && (this.employee.nom !== null)) ? ('.' + removeAccents(this.employee.nom)) : '') + '@lausanne.ch'
        }
      }
    },
    'employee.nom' (val) {
      if ((val !== '') && (val !== null)) {
        if (this.employee.idemploye === 0) {
          this.employee.email = (((this.employee.prenom !== '') && (this.employee.prenom !== null)) ? (removeAccents(this.employee.prenom) + '.') : '') + removeAccents(val) + '@lausanne.ch'
        }
      }
    },
    'employee.datenaissance' (val) {
      this.dateNaissanceCH = this.formatDate(val)
    },
    dateNaissanceCH (val) {
      if (/null|^\d{2}\.\d{2}\.(19|20)\d{2}$/.test(val))
        this.employee.datenaissance = this.parseDate(val)
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
      if (/null|^\d{2}\.\d{2}\.(19|20)\d{2}$/.test(val))
        this.employee.debutactiv = this.parseDate(val)
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
      if (/null|^\d{2}\.\d{2}\.(19|20)\d{2}$/.test(val))
        this.employee.finactiv = this.parseDate(val)
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
      if (!val) {
        this.sam_status = SAM_STATUS.INFO
        return null
      }
      val = val.replace(/(\r\n|\n|\r|\t)/gm, "")
      if (/^(LAUSANNE_CH|TRX)\\/.test(val))
        this.employee.loginnt = val.toUpperCase()
      else
        this.employee.loginnt = 'LAUSANNE_CH\\' + val.toUpperCase()

      if (this.employee.idemploye === 0) {
        this.sam_status = SAM_STATUS.INFO
        if ((val !== null) && (val !== '')) {
          let __samaccountname = val.split('\\')[1]
          if (__samaccountname != undefined) {
            setTimeout(() => {
              if (__samaccountname.length >= 8) {
                this.getEmpADInfo(val).then(() => {
                  this.getDataByNtLogin(val)
                })
              }
            }, 250)
          }
        }  
        this.employee.exchangelogin = this.employee.loginnt
      }
    },
    'employee.idmanager': function (val) {
      if (val === null)
      this.manager = ''
    }
  },
  methods: {
    getAffaireSuivi (idaffaire) {
      if (idaffaire !== null)
        return `Affaire suivi de l'utilisateur: <a target='_blank' href='/goeland/affaire2/affaire_data.php?idaffaire=${idaffaire}'>${idaffaire}</a>`
      else
        return `Pas d'affaire suivi de l'utilisateur`
    },
    setDateCH (field, date) {
      this[field] = this.formatDate(date)
    },
    setVal () {
    },
    initialize () {
      this.employee = Object.assign({}, EMPLOYEE_INIT)
      this.orgunit = Object.assign({}, ORGUNIT_INIT)
      this.sam_status = Object.assign({}, SAM_STATUS.INFO)
      this.get_data_url.orgunit_url = (this.get_data_url.orgunit_url === '') ? ORGUNIT_URL_AJAX : this.get_data_url.orgunit_url
      this.get_data_url.employee_url = (this.get_data_url.employee_url === '') ? EMP_URL_AJAX : this.get_data_url.employee_url
      this.show_prof_data = this.showProfData
      this.show_perso_data = this.showPersoData
      this.show_comment = this.showComment
      this.show_cond = false
      this.getOU()
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
    getOU () {
      if (this.ouDisplayType == 'select') {
        this.getOUList()
      } else {
        this.getOUTree()
      }
    },
    getOUList() {
      ORGUNIT.getList (this.orgunit, this.get_data_url.orgunit_url, (data) => {
        this.orgunits = data
      })
    },
    initTreeOU () {
      this.$refs.tree.updateAll(false)
      this.init_opened_ou = [{ "id": 1}]
    },
    getOUTree() {
      ORGUNIT.getTree (this.get_data_url.orgunit_url, (data) => {
        this.orgunits = data
        this.initTreeOU()
      })
    },
    getSelectedOU (value) {
      if (value[0].id != 1) {
        this.employee.idou = value[0].id
        this.orgunit.OUName = value[0].description
        this.show_ou = false
      }
    },
    setTreeOU (idOU) {
      this.active_ou = [{id: idOU}]
      let __reg = new RegExp('{"id":' + idOU + ',"name":"(.*?)","description":"(.*?)"')
      let __ouname = JSON.stringify(this.orgunits).match(__reg)[2]
      this.orgunit.OUName = __ouname
      this.ouSearch = __ouname
      this.$refs.tree.updateAll(true)
    },
    clearTreeOU () {
      this.employee.idou = null
      this.orgunit.OUName = ''
      this.ouSearch = ''
      this.active_ou = [{id:1}]
      this.initTreeOU()
    },
    searchOU (val) {
      if ((val) && (val.length > 2)) {
        if (!this.allOpenedOU) {
          this.lastOpenedOU = this.openedOU
          this.$refs.tree.updateAll(true)
          this.allOpenedOU = true
        }
      } else {
        this.$refs.tree.updateAll(false)
        this.allOpenedOU = false
        this.openedOU = this.lastOpenedOU
      }
    },
    showOU () {
      this.show_ou = !this.show_ou
    },
    getFonctionList() {
      EMPLOYE.getFonctionList (this.get_data_url.employee_url, (data) => {
        this.fonctions = data
      })
    },
    setManager(manager) {
      if (JSON.parse(manager).length !== 0) {
        let __manager = JSON.parse(manager)
        this.manager = __manager[0].nom + ' ' + __manager[0].prenom
        this.employee.idmanager = __manager[0].idemploye
      }
    },
    getEmpData(idemploye) {
      EMPLOYE.getEmpData(idemploye, this.get_data_url.employee_url, (data) => {
        this.employee = Object.assign({}, data)
        if (this.employee.idou != null)
          this.setTreeOU(this.employee.idou)
        if (this.employee.idmanager != null)
          this.getManagerName(this.employee.idmanager)
        if (this.employee.idcreator != null)
          this.getEmpCreator(this.employee.idcreator)
        if (this.employee.idlastmodifuser != null)
          this.getLastModifUser(this.employee.idlastmodifuser)
        this.getEmpAcceptCondLog(this.employee.idemploye)
      })
    },
    getEmpCreator (idemploye) {
      let __empname = ''
      EMPLOYE.getEmpName(idemploye, this.get_data_url.employee_url, (data) => {
        __empname = data.Nom.toUpperCase() + ' ' + data.Prenom
        this.creator = __empname
      })
    },
    getLastModifUser (idemploye) {
      let __empname = ''
      EMPLOYE.getEmpName(idemploye, this.get_data_url.employee_url, (data) => {
        __empname = data.Nom.toUpperCase() + ' ' + data.Prenom
        this.lastmodifuser = __empname
      })
    },
    getManagerName (idemploye) {
      EMPLOYE.getEmpName(idemploye, this.get_data_url.employee_url, (data) => {
        this.manager = data.Nom + ' ' + data.Prenom
      })
    },
    getEmpAcceptCondLog (idemploye) {
      EMPLOYE.getEmpAcceptCondLog(idemploye, this.get_data_url.employee_url, (data) => {
        let __log = ''
        for (var log of data) {
          __log += `${(log.reponse == 'accepter') ? '<div class=\'cond_acpt\'>acceptées' : '<div class=\'cond_ref\'>refusées'} le ${log.datereponse}</div>`
        }
        this.acceptcond = __log
      })
    },
    async getEmpADInfo (ntlogin) {
      let __samaccountname = ntlogin.split('\\')[1]
      await EMPLOYE.getEmpADInfo(__samaccountname, this.get_data_url.employee_url, (data) => {
        if (data.count !== 0) {
          const __empinfo = data[0]
          this.employee.idpolitesse = (__empinfo.title !== undefined) ? ((__empinfo.title[0] === 'M.') ? '1' : '2') : '1'
          this.employee.nom = (__empinfo.sn !== undefined) ? __empinfo.sn[0] : ''
          this.employee.prenom = (__empinfo.givenname !== undefined) ? __empinfo.givenname[0] : ''
          this.employee.email = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(__empinfo.mail[0]) ? __empinfo.mail[0] : ''
          if ((__empinfo.telephonenumber !== undefined) && (/^\+(\d{1,2})\s(\d{1,2})\s(\d{3})\s(\d{2})\s(\d{2})$/.test(__empinfo.telephonenumber[0]))) {
            const [, , indicatif, part1, part2, part3] = /^\+(\d{1,2})\s(\d{1,2})\s(\d{3})\s(\d{2})\s(\d{2})$/.exec(__empinfo.telephonenumber[0])
            this.employee.telprof = (part1 === '315') ? `${part2} ${part3}` : `0${indicatif} ${part1} ${part2} ${part3}`
          }
          if (__empinfo.department.count !== 0) {
            this.ouSearch = __empinfo.department[0]
            this.orgunit.OUName = ''
            this.$refs.tree.updateAll(true)
          }
          this.sam_status = SAM_STATUS.SUCCESS
        } else {
          this.sam_status = SAM_STATUS.ERROR
        }
      })
    },
    getDataByNtLogin (ntlogin) {
      EMPLOYE.getDataByNtLogin({ ntlogin: ntlogin }, this.get_data_url.employee_url, (data) => {
        if (!data) {
          return
        }
        if (data.error !== undefined) {
          this.displayMessage(`<div>Une erreur s'est produite lors de l'appel de getDataByNtLogin!</div><div>${data.error.reason}</div>`, MSG_LEVEL.ERROR)
        } else {
          if (data.length !== 0) {
            this.sam_status = SAM_STATUS.WARNING
            this.displayMessage(`<div>Un employé avec ce LoginNT existe déjà dans Goéland!</div><div>idemploye:&nbsp;${data.IdEmploye}&nbsp;&nbsp;&nbsp;Nom:&nbsp;${data.Nom}&nbsp;&nbsp;&nbsp;Prenom:&nbsp;${data.Prenom}</div>`, MSG_LEVEL.ERROR)
          }
        }
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
                  } else if (data.success) {
                    this.employee.idemploye = parseInt(data.success.retval.idemploye)
                    this.$emit('input', this.employee.idemploye)
                    this.displayMessage(`<div>Sauvegarde réussie!</div><div>idemploye: ${data.success.retval.idemploye}</div>`, MSG_LEVEL.SUCCESS, () => {
                      this.$emit('done', this.employee.idemploye)
                    })
                  } else if (data.warning) {
                    if (data.warning.retval == 0) {
                      this.displayMessage(`<div>Une erreur s'est produite pendant la sauvegarde!</div><div>Un employé avec ce loginnt existe déjà dans Goéland!</div>`, MSG_LEVEL.ERROR)
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
    displayMessage (message, level, callback=null) {
      this.message = message
      this.type_msg = level
      this.show_msg = true
      this.messageCallback = callback
    },
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
.tree-ou {
  position: absolute;
  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-55%, 0%);
  z-index: 100;
}
.tree-ou-text {
  overflow-y: auto;
  max-height: 500px;
}
.v-content__wrap {
  position: relative;
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
.cond_acpt {
  color: black;
}
.cond_ref {
  color: red;
}
</style>

<i18n src="../locales/fr.json"></i18n>
<i18n src="../locales/en.json"></i18n>
