const { Tray, Menu} = require('electron')


tray = new Tray('./assets/ico/ico.png')
tray.on('click', () => {
  win.show()
  win.setSkipTaskbar(true)
})
const contextMenu = Menu.buildFromTemplate([
  {label: '关于 Fast', click: function (menuItem, browserWindow, event) {
    // TODO
  }},
  {label: '退出 Fast', click: function (menuItem, browserWindow, event) {
    win.close()
  }}
])
tray.setToolTip('Fast!')
tray.setContextMenu(contextMenu)