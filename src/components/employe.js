import axios from 'axios'
import { DEV } from '../config'
import Log from 'cgil-log'

const MODULE_NAME = 'employe.js'
const log = (DEV) ? new Log(MODULE_NAME, 4) : new Log(MODULE_NAME, 2)

let instance = null
/*  Singleton to retrieve employe
 */
class Employe {
  constructor() {
    if (!instance) {
      instance = this
    }
    // to test whether we have singleton or not and store how old is data
    this.time = new Date()
    this.data = []
    this.isReady = false
    return instance
  }

  getList(employe, get_data_url, display_nonactive, callback) {
    if (employe.idou == null) {
      employe.idou = 0
    }
    if ((employe.nom === null) || (employe.nom === undefined) || (employe.nom == '')) {
      employe.nom = '*'
    } else if (employe.nom.slice(-1) != '*') {
      employe.nom += '*'
    }
    if ((employe.prenom === null) || (employe.prenom === undefined) || (employe.prenom == '')) {
      employe.prenom = '*'
    } else if (employe.prenom.slice(-1) != '*') {
      employe.prenom += '*'
    }

    let __fetch_url = `${get_data_url}/employe_get_liste.php`
    axios.post(__fetch_url, {
      params: employe
    }).then(response => {
      let __data = response.data.Employe.filter(employe => (employe.IsActive === '1') || display_nonactive)

      __data.forEach(function (employee) {
        for (var prop in employee) {
          employee[prop.toLowerCase()] = employee[prop]
          if (typeof employee.prenom === 'object')
            employee.prenom = ''
          delete employee[prop]
        }
      })
      callback(__data)

      log.l('## in Employe::getList employees: ', __data)
    }).catch(error => {
      if (error.response) {
        log.e(`## in Employe::getList Error data: ${error.response.data}, status: ${error.response.status}, headers: ${error.response.headers}`)
      } else if (error.request) {
        log.e(`## in Employe::getList Error request: `, error.request)
      } else {
        log.e(`## in Employe::getList Error: `, error.message)
      }
      log.e(`## in Employe::getList Error: `, error.config)
    })
  }

  getEmpData(idemploye, get_data_url, callback)
  {
    let __fetch_url = `${get_data_url}/employe_get_data.php`
    axios.post(__fetch_url, {
      idemploye: idemploye
    }).then(response => {
      let __data = response.data[0]

      for (let [key, value] of Object.entries(__data)) {
        if (value === '')
          __data[key] = null
      }
      callback(__data)

      log.l('## in Employe::getEmpData data: ', __data)
    }).catch(error => {
      if (error.response) {
        log.e(`## in Employe::getEmpData Error data: ${error.response.data}, status: ${error.response.status}, headers: ${error.response.headers}`)
      } else if (error.request) {
        log.e(`## in Employe::getEmpData Error request: `, error.request)
      } else {
        log.e(`## in Employe::getEmpData Error: `, error.message)
      }
      log.e(`## in Employe::getEmpData Error: `, error.config)
    })
  }

  getEmpName(idemploye, get_data_url, callback) {
    let __fetch_url = `${get_data_url}/employe_get_name.php`
    axios.post(__fetch_url, {
      idemploye: idemploye
    }).then(response => {
      let __retval = response.data
      callback(__retval)

      log.l('## in Employe::getEmpName retval: ', __retval)
    }).catch(error => {
      if (error.response) {
        log.e(`## in Employe::getEmpName Error data: ${error.response.data}, status: ${error.response.status}, headers: ${error.response.headers}`)
      } else if (error.request) {
        log.e(`## in Employe::getEmpName Error request: `, error.request)
      } else {
        log.e(`## in Employe::getEmpName Error: `, error.message)
      }
      log.e(`## in Employe::getEmpName Error: `, error.config)
    })
  }

  getFonctionList(get_data_url, callback) {
    let __fetch_url = `${get_data_url}/employe_get_fonction.php`
    axios.post(__fetch_url, {}).then(response => {
      let __data = response.data.Fonction
      __data.sort(function (a, b) {
        let __nameA = a.Nom.toUpperCase()
        let __nameB = b.Nom.toUpperCase()
        if (__nameA < __nameB) {
          return -1;
        }
        if (__nameA > __nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      })

      callback(__data)

      log.l('## in Employe::getFonctionList fonctions: ', __data)
    }).catch(error => {
      if (error.response) {
        log.e(`## in Employe::getFonctionList Error data: ${error.response.data}, status: ${error.response.status}, headers: ${error.response.headers}`)
      } else if (error.request) {
        log.e(`## in Employe::getFonctionList Error request: `, error.request)
      } else {
        log.e(`## in Employe::getFonctionList Error: `, error.message)
      }
      log.e(`## in Employe::getFonctionList Error: `, error.config)
    })
  }

  checkRights(params, get_data_url, callback) {
    let __fetch_url = `${get_data_url}/employe_checkrights.php`
    axios.post(__fetch_url, {
      params: params
    }).then(response => {
      let __retval = response.data
      log.l('## in Employe::checkRights retval: ', __retval)
      
      return callback(__retval)
    }).catch(error => {
      if (error.response) {
        log.e(`## in Employe::checkRights Error data: ${error.response.data}, status: ${error.response.status}, headers: ${error.response.headers}`)
      } else if (error.request) {
        log.e(`## in Employe::checkRights Error request: `, error.request)
      } else {
        log.e(`## in Employe::checkRights Error: `, error.message)
      }
      log.e(`## in Employe::checkRights Error: `, error.config)
      
      return 0
    })
  }

  save(employee, get_data_url, callback) {
    let __fetch_url = `${get_data_url}/employe_save.php`
    axios.post(__fetch_url, {
      employee: employee
    }).then(response => {
      let __retval = response.data
      callback(__retval)

      log.l('## in Employe::save retval: ', __retval)
    }).catch(error => {
      if (error.response) {
        log.e(`## in Employe::save Error data: ${error.response.data}, status: ${error.response.status}, headers: ${error.response.headers}`)
      } else if (error.request) {
        log.e(`## in Employe::save Error request: `, error.request)
      } else {
        log.e(`## in Employe::save Error: `, error.message)
      }
      log.e(`## in Employe::save Error: `, error.config)
    })
  }
}

export const msg_level = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success'
}

export const employe = new Employe()
