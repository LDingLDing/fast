/*
 * method*   调用的方法名
 * data*     调用方法所需的参数
 */

const {ipcRenderer} = require('electron')

window.API = exports = module.exports = {
  use (obj) {
    return ipcRenderer.sendSync(obj.method, obj)
  }
}