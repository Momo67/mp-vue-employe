export const DEV = process.env.NODE_ENV === 'development'

export const EMP_URL_AJAX = DEV ? 'http://mygolux.lausanne.ch/goeland/employe/ajax' : '/goeland/employe/ajax'

export const ORGUNIT_URL_AJAX = DEV ? 'http://mygolux.lausanne.ch/goeland/uniteorg/ajax' : '/goeland/uniteorg/ajax'

export const EMPLOYEE_INIT = {
  idemploye: 0,
  idpolitesse: null,
  issexm: -1,
  nom: '',
  prenom: '',
  datenaissance: null,
  telprive: null,
  addresse: null,
  codepostal: null,
  localite: null,
  idou: null,
  oupath: null,
  idfonction: null,
  initiales: null,
  email: '',
  telprof: null,
  natel: null,
  tauxactiv: null,
  debutactiv: null,
  finactiv: null,
  isactive: null,
  codezadig: null,
  loginnt: null,
  exchangelogin: null,
  idmanager: null,
  idcreator: null,
  idlastmodifuser: null,
  commentaire: null
}

export const ORGUNIT_INIT = {
  isactive: 1
}

export const SAM_STATUS = {
  INFO: {
    icon: 'mdi-account',
    color: '',
    message: 'Statut de la recherche dans la SAM'
  },
  ERROR: {
    icon: 'mdi-account-cancel',
    color: 'error',
    message: 'Introuvable!'
  },
  SUCCESS: {
    icon: 'mdi-account-check',
    color: 'success',
    message: 'Trouvé!'
  }
}
