const { globalShortcut } = require('electron')

exports = module.exports = {
	init () {
		this.setMainShow()
	},
	setMainShow () {
		// 开启搜索框快捷键
		// @todo 检查用户系统快捷键冲突
    var ret = globalShortcut.register('alt+x', function() {
      if (mainWin.isVisible()) {
        mainWin.hide()
      } else {
        mainWin.show()
        mainWin.focus()
      }
    })
    if (!ret) {
      console.log('registration failed')
    }
	},
	// 解绑所有快捷键
	unregisterAll () {
		globalShortcut.unregisterAll()
	}
}