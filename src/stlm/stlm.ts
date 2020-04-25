import {Client} from 'ssh2';

import {Host} from '../types/HostType'
import {Logfile} from '../types/LogfileType'
import {Log} from '../types/LogType'
import {Id} from '@feathersjs/feathers';

import app from '../app';

const hostsService = app.service('hosts')
const logfilesService = app.service('logfiles')
const logsService = app.service('logs')

class StlmHost {
  host:Host;
  logfies: Logfile[];
  logs: Log[];

  connection: Client;

  constructor (host: Host) {
    this.host = host
    this.logfies = []
    this.logs = []
    this.connection = new Client();

    this.initHooks()
  }

  initHooks() {
    this.connection.on("ready", this.onReady)
    this.connection.on("close", this.onClose)
    this.connection.on("timeout", this.onTimeout)
  }

  onReady() {
    this.fetchLog()
  }

  onClose() {
  }

  onTimeout() {
  }

  connect() {
    this.connection.connect({
      host:this.host.host,
      username:this.host.username,
      password:this.host.password
    })
  }

  close() {
    this.connection.end()
  }

  activate() {
    this.connect()
  }

  deactivate() {
    this.close()
  }

  fetchLog() {
    this.connection.sftp((err, sftp) => {
      if (err) throw err;

      for (let level of ['err', 'info']) {
        sftp.readdir("stlm-test-data/" + 'level',
          (err, list) => {
            if (err) throw (err);

            for (let file of list) {
              logfilesService.create({
                filename:file.filename,
                path: file.longname,
                type: level
              })
            }
        })
      }
    })
  }
}

class StlmManager {
  hosts: StlmHost[];

  constructor () {
    this.hosts = []

    hostsService.on("create", (message, context) => {
      this.add(context.result)
    })

    hostsService.on("remove", (message, context) => {
      this.remove(context.result._id)
    })

    hostsService.on("update", (message, context) => {
      let host = this.at(context.result._id)
      if (host == undefined) {
        return
      }

      if (host.host.isActivated) {
        host.activate()
      } else {
        host.deactivate()
      }
    })
  }

  add(host: Host) {
    this.hosts.push(new StlmHost(host));
  }

  at(id: Id) {
    return this.hosts.find(n => n.host._id == id)
  }

  remove(id: Id) {
    let index = this.hosts.findIndex(n => n.host._id == id)
    this.hosts.splice(index, 1);
  }
}

const manager = new StlmManager();

export {StlmHost};
export default manager;
