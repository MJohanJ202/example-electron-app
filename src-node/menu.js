import { Menu, app } from 'electron/main'
const isMac = process.platform === 'darwin'

const createTemplate = (isMacSystem = false, webView) => {
  const sharedSlots = {
    editSubmenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' }
    ],
    viewMenu: {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    windowMenuSubMenu: [
      { role: 'minimize' },
      { role: 'zoom' }
    ],
    Themes: {
      label: 'Themes',
      submenu: [
        {
          label: 'light',
          click: () => {
            webView.webContents.send('switch-theme', 'light')
            console.log('switch Light theme')
          }
        },
        {
          label: 'dark',
          click: () => {
            webView.webContents.send('switch-theme', 'dark')
            console.log('switch dark theme')
          }
        },
        {
          label: 'profile',
          click: () => {
            webView.webContent.send('switch-theme', 'profile')
            console.log('switch profile theme')
          }
        }
      ]
    }
  }
  const mac = [
    {
      label: app.name,
      submenu: [
        { role: 'theme' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideOthers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'File',
      submenu: [{ role: 'close' }]
    },
    {
      label: 'Edit',
      submenu: [
        ...sharedSlots.editSubmenu,
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]
        }
      ]
    },
    sharedSlots.viewMenu,
    {
      label: 'Window',
      submenu: [
        ...sharedSlots.windowMenuSubMenu,
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ]
    },
    sharedSlots.Themes
  ]
  const other = [
    { role: 'quit' },
    {
      label: 'Edit',
      subMenu: [...sharedSlots.editSubmenu,
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ]
    },
    sharedSlots.viewMenu,
    {
      label: 'Window',
      submenu: [
        ...sharedSlots.windowMenuSubMenu,
        { role: 'close' }
      ]
    },
    sharedSlots.Themes
  ]
  return isMacSystem ? mac : other
}

export const setMainMenu = (webView) => {
  const template = (createTemplate(isMac, webView))

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
