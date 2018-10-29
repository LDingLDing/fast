const { app, BrowserWindow } = require('electron')
const Conf = require('./configs/app')
const shortcut = require('./system/shortcut')
// const { autoUpdater } = require("electron-updater")

// 创建主窗口
function createMainWindow () {
  global.mainWin = new BrowserWindow({
    width: 510, 
    height: 105,
    maximizable: false, // 可否最大化
    fullscreenable: false, // 是否可以进入全屏状态
    resizable: false, // 是否可调节大小
    alwaysOnTop: true, // 是否总是在所有窗口最顶部
    transparent: true, // 窗口背景是否透明
    skipTaskbar: true, // 在任务栏是否显示
    frame: false, // 是否有边框
    show: false, // 是否启动时就显示
    center: true // 是否居中显示弹窗
  })

  // 然后加载内部html
  mainWin.loadFile('web/index.html')
  
  mainWin.on('ready-to-show', () => {
    mainWin.focus()
  })
  // 当 window 被关闭，这个事件会被触发。
  mainWin.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    mainWin = null
  })
  mainWin.on('move', () => {
    // 拖动窗口时需要隐藏下拉框
    mainDropWin.hide()
  })

  global.mainDropWin = new BrowserWindow({
    parent: mainWin,
    maximizable: false, // 可否最大化
    fullscreenable: false, // 是否可以进入全屏状态
    // resizable: false, // 是否可调节大小
    alwaysOnTop: true, // 是否总是在所有窗口最顶部
    // transparent: true, // 窗口背景是否透明
    skipTaskbar: true, // 在任务栏是否显示
    frame: false, // 是否有边框
    show: false, // 是否启动时就显示
    // modal: true, // 是否为模态窗口
  })
  mainDropWin.loadFile('web/drop.html')

  // 打开开发者工具
  Conf.devtool && mainWin.webContents.openDevTools({mode: 'detach'})

  require('./ipc/index').init(mainWin)
  require('./system/base')

  // updateHandle()
}

// 防止重复开启应用
const gotTheLock = app.requestSingleInstanceLock()
if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWin) {
      if (mainWin.isMinimized()) {
        mainWin.restore()
      }
      mainWin.show()
      mainWin.focus()
    }
  })

  // Electron 会在初始化后并准备
  // 创建浏览器窗口时，调用这个函数。
  // 部分 API 在 ready 事件触发后才能使用。
  app.on('ready', () => {
    createMainWindow()
    shortcut.init()
    require('./system/tray')
  })
}

app.on('open-url', function(event) {
  shell.openExternal(url)
  mainWin.hide()
  event.preventDefault()
})

app.on('will-quit', function() {
  // Unregister all shortcuts.
  shortcut.unregisterAll()
})

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (mainWin === null) {
    createWindow()
  }
})

// function updateHandle() {
//   let message = {
//     error: '检查更新出错',
//     checking: '正在检查更新……',
//     updateAva: '检测到新版本，正在下载……',
//     updateNotAva: '现在使用的就是最新版本，不用更新',
//   }
//   const os = require('os')

//   autoUpdater.setFeedURL('http://www.baidu.com')
//   autoUpdater.on('error', function (error) {
//     sendUpdateMessage(message.error)
//   })
//   autoUpdater.on('checking-for-update', function () {
//     sendUpdateMessage(message.checking)
//   })
//   autoUpdater.on('update-available', function (info) {
//     sendUpdateMessage(message.updateAva)
//   })
//   autoUpdater.on('update-not-available', function (info) {
//     sendUpdateMessage(message.updateNotAva)
//   })

//   // 更新下载进度事件
//   autoUpdater.on('download-progress', function (progressObj) {
//     mainWin.webContents.send('downloadProgress', progressObj)
//   })
//   autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {

//     ipcMain.on('isUpdateNow', (e, arg) => {
//       console.log(arguments)
//       console.log("开始更新")
//       //some code here to handle event
//       autoUpdater.quitAndInstall()
//     })

//     mainWin.webContents.send('isUpdateNow')
//   })

//   ipcMain.on("checkForUpdate",() => {
//       //执行自动更新检查
//       autoUpdater.checkForUpdates()
//   })
// }

// // 通过main进程发送事件给renderer进程，提示更新信息
// function sendUpdateMessage(text) {
//   mainWin.webContents.send('message', text)
// }