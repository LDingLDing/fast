const { shell } = require('electron')

// 监听窗口打开新页面的操作（即target="_blank"）
let webContents = mainWin.webContents
webContents.on('new-window', function (e, url, name) {
	shell.openExternal(url)
	e.preventDefault()
})