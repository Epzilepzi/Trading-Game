/*jshint esversion: 6 */
const {app, BrowserWindow, Menu, protocol, ipcMain} = require('electron');
const {autoUpdater} = require("electron-updater");
const {productURL} = 'https://github.com/Epzilepzi/Trading-Game/releases';

/* menu */
let template = [];
if (process.platform === 'darwin') {
  // OS X
  const name = app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about'
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click() { app.quit(); }
      },
    ]
  });
}

let win;

function sendStatusToWindow(text) {
  log.info(text);
  win.webContents.send('message', text);
}

function createDefaultWindow() {
  win = new BrowserWindow({
    name: "Game Window",
    width: 900,
    minWidth: 600, 
    height: 700,
    minHeight: 300,
    skipTaskbar: false,
    autoHideMenuBar: true,
    // toolbar: false,
    title: "Spree",
    show: false
  });
  // win.setMenu(null);
  win.loadFile(`index.html`);
  // win.webContents.openDevTools({detach:true});
  win.once('ready-to-show', () => {
    win.show();
  });
  win.on('closed', function() {
    win = null;
  });
  return win;
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
});
autoUpdater.on('update-available', (ev, info) => {
  sendStatusToWindow('Update available.');
});
autoUpdater.on('update-not-available', (ev, info) => {
  sendStatusToWindow('Update not available.');
});
autoUpdater.on('error', (ev, err) => {
  sendStatusToWindow('Error in auto-updater.');
});
autoUpdater.on('download-progress', (ev, progressObj) => {
  sendStatusToWindow('Download progress...');
});
autoUpdater.on('update-downloaded', (ev, info) => {
  sendStatusToWindow('Update downloaded; will install in 5 seconds');
});

app.on('ready', function() {
  const template = [
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'}
      ]
    },
  ];
  
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'}
      ]
    });
  }
  // Create the Menu
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  createDefaultWindow();
});

app.on('window-all-closed', () => {
  app.quit();
});
