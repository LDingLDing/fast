const { ipcRenderer } = require('electron')

ipcRenderer.on("message", (event, text) => {
    console.log(arguments);
    this.tips = text;
});
//注意：“downloadProgress”事件可能存在无法触发的问题，只需要限制一下下载网速就好了
ipcRenderer.on("downloadProgress", (event, progressObj)=> {
    console.log(progressObj);
    this.downloadPercent = progressObj.percent || 0;
});
ipcRenderer.on("isUpdateNow", () => {
    ipcRenderer.send("isUpdateNow");
});