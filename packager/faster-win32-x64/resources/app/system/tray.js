const { app, Tray, Menu } = require('electron')


tray = new Tray('./assets/ico/ico.png')
tray.on('click', () => {
  mainWin.show()
})
const contextMenu = Menu.buildFromTemplate([
  {label: '关于 Fast', click: function (menuItem, browserWindow, event) {
    // TODO
  }},
  {label: '退出 Fast', click: function (menuItem, browserWindow, event) {
    app.quit()
  }}
])
tray.setToolTip('Fast!')
tray.setContextMenu(contextMenu)