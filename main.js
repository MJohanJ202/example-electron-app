import { BrowserWindow, app, ipcMain } from 'electron/main'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { setMainMenu } from './src-node/menu.js'

function handleSetTitle (event, title) {
  const webContents = event.sender
  const webView = BrowserWindow.fromWebContents(webContents)
  webView?.setTitle(title)
}

const createWebView = () => {
  const webView = new BrowserWindow({
    width: 800,
    height: 600,
    minHeight: 300,
    minWidth: 400,
    webPreferences: {
      preload: join(fileURLToPath(import.meta.url), '..', 'src-node/preload.js')
    }
  })
  webView.loadFile('index.html')
  setMainMenu(webView)
}

app.whenReady().then(() => {
  ipcMain.on('change-name', handleSetTitle)
  createWebView()
  app.on('activate', () => {
    const openView = BrowserWindow.getAllWindows().length === 0
    if (openView) createWebView()
  })
})

app.on('window-all-closed', () => {
  const closeView = process.platform !== 'darwin'
  if (closeView) app.quit()
})

console.log('electron is running')
