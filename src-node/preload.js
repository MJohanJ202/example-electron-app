const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  changeNameApp: (title) => ipcRenderer.send('change-name', title),
  onUpdateTheme: (cbMethod) => ipcRenderer.on('switch-theme', cbMethod)
})
