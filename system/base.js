const { shell } = require('electron')
const fs = require('fs')

// 监听窗口打开新页面的操作（即target="_blank"）
let webContents = mainWin.webContents
webContents.on('new-window', function (e, url, name) {
	shell.openExternal(url)
	e.preventDefault()
})

// 读取用户本地书签
fs.readFile('C:\\Users\\viruser.v-desktop\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Bookmarks', 'utf8', function(err, data){
    // console.log(data)
})
