const { ipcMain } = require('electron')
exports = module.exports = {
	init (browser) {
    // 关闭窗口
    ipcMain.on('external.closeWebDlg', (event) => {
      browser.close()
      event.returnValue = true
    })
    // 最小化到系统托盘
    ipcMain.on('external.closeTaskbar', (event) => {
      browser.setSkipTaskbar(true)
      browser.hide()
      event.returnValue = true
    })
    // 隐藏窗口
    ipcMain.on('external.hide', (event) => {
      browser.hide()
      event.returnValue = true
    })
    // 显示窗口
    ipcMain.on('external.show', (event) => {
      browser.show()
      event.returnValue = true
    })
    // 最小化窗口
    ipcMain.on('external.minimize', (event) => {
      browser.minimize()
      event.returnValue = true
    })
    // 还原窗口
    ipcMain.on('external.restore', (event) => {
      browser.restore()
      event.returnValue = true
    })
    // 最大化窗口
    ipcMain.on('external.maximize', (event) => {
      browser.maximize()
      event.returnValue = true
    })
    // 关闭窗口
    ipcMain.on('window-close', (event) => {
      browser.close()
      event.returnValue = true
    })

    // Getter
    // 获取窗口id
    ipcMain.on('external.getId', (event) => {
      event.returnValue = browser.id
    })
    // 获取窗口的坐标及宽高
    ipcMain.on('external.getRectangle', (event) => {
      event.returnValue = browser.getContentBounds()
    })
    // 获取子窗口（如：下拉框）
    ipcMain.on('external.getChildWin', (event) => {
      event.returnValue = browser.getChildWindows()
    })

    // Setter
    // 设置窗口大小
    ipcMain.on('external.setWinSize', (event, {data}) => {
      browser.setSize(data.width, data.height)
      event.returnValue = true
    })
    // 设置窗口位置
    ipcMain.on('external.setWinPos', (event, {data}) => {
      browser.setPosition(data.x, data.y, data.animate || false)
      event.returnValue = true
    })

    // 以下方法仅支持mainWin
    // 显示下拉框
    ipcMain.on('external.show.drop', (event) => {
      mainDropWin.showInactive()
      event.returnValue = true
    })
    ipcMain.on('external.hide.drop', (event) => {
      mainDropWin.hide()
      event.returnValue = true
    })
    // 设置下拉框大小
    ipcMain.on('external.setWinSize.drop', (event, {data}) => {
      mainDropWin.setSize(data.width, data.height)
      event.returnValue = true
    })
    // 设置下拉框位置
    ipcMain.on('external.setWinPos.drop', (event, {data}) => {
      mainDropWin.setPosition(data.x, data.y, data.animate || false)
      event.returnValue = true
    })
    // 设置下拉框位置
    ipcMain.on('external.focus.drop', (event) => {
      mainDropWin.focus()
      event.returnValue = true
    })

    // 供多个渲染进程之间通讯
    ipcMain.on('external.mainToDrop', (event, {data}) => {
      // mainDropWin.webContents.send(data.methods, data.datas)
    })
    ipcMain.on('external.dropToMain', (event, {data}) => {
      event.returnValue = true
    })
	}
}

