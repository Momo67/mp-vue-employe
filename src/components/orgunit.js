import axios from 'axios'
import { DEV } from '../config'
import { Log } from 'cgil-log'

const MODULE_NAME = 'orgunit.js'
const log = (DEV) ? new Log(MODULE_NAME, 4) : new Log(MODULE_NAME, 2)

let instance = null
/*  Singleton to retrieve orgunit
 */
class OrgUnit {
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

  getList(orgunit, get_data_url, callback) {
    let __fetch_url = `${get_data_url}/uniteorg_get_liste.php`
    axios.post(__fetch_url, {
      params: orgunit
    }).then(response => {
      let __data = response.data.OrgUnit
      __data.sort(function (a, b) {
        let __nameA = a.DescTreeDenorm.toUpperCase()
        let __nameB = b.DescTreeDenorm.toUpperCase()
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

      log.l('## in OrgUnit::getList orgunits: ', __data)
    }).catch(error => {
      if (error.response) {
        log.e(`## in OrgUnit::getList Error data: ${error.response.data}, status: ${error.response.status}, headers: ${error.response.headers}`)
      } else if (error.request) {
        log.e(`## in OrgUnit::getList Error request: `, error.request)
      } else {
        log.e(`## in OrgUnit::getList Error: `, error.message)
      }
      log.e(`## in OrgUnit::getList Error: `, error.config)
    })
  }

  getTree (get_data_url, callback) {
    let __fetch_url = `${get_data_url}/uniteorg_get_tree.php`
    axios.post(__fetch_url, {params: orgunit}).then(response => {
      let __data = response.data

      callback(__data)

      log.l('## in OrgUnit::getTree orgunits: ', __data)
    }).catch(error => {
      if (error.response) {
        log.e(`## in OrgUnit::getTree Error data: ${error.response.data}, status: ${error.response.status}, headers: ${error.response.headers}`)
      } else if (error.request) {
        log.e(`## in OrgUnit::getTree Error request: `, error.request)
      } else {
        log.e(`## in OrgUnit::getTree Error: `, error.message)
      }
      log.e(`## in OrgUnit::getTree Error: `, error.config)
    })
  }
}

export const orgunit = new OrgUnit()
