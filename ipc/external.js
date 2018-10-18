const { ipcMain } = require('electron')

// 关闭窗口
ipcMain.on('external.closewin', event => {
  win.close()
  event.returnValue = true
})
// 最小化到系统托盘
ipcMain.on('external.closeTaskbar', event => {
  win.setSkipTaskbar(true)
  win.hide()
  event.returnValue = true
})
// 最小化窗口
ipcMain.on('external.minimize', event => {
  win.minimize()
  event.returnValue = true
})
