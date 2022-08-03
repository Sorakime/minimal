const {app, BrowserWindow, BrowserView, ipcMain} = require('electron');
let win;
let browser;

function nw() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'Minimal',
    webPreferences: {
      preload: `${__dirname}/../preload/navigation.js`
    }
  });
  win.webContents.openDevTools({
    mode: 'undocked'
  });
  win.webContents.loadFile(`${__dirname}/../renderer/navigation.html`);
  browser = new BrowserView({
    webPreferences: {
      scrollBounce: true
    }
  });

  browser.webContents.loadURL('https://www.google.com');
  win.addBrowserView(browser);
  browser.setBounds({
    x: 0,
    y: 30,
    width: win.getSize()[0],
    height: win.getSize()[1] - 30
  });
  win.on('resize', () => {
    browser.setBounds({
      x: 0,
      y: 30,
      width: win.getSize()[0],
      height: win.getSize()[1] - 30
    });
  });
  win.on('enter-full-screen', () => {
    browser.setBounds({
      x: 0,
      y: 0,
      width: win.getSize()[0],
      height: win.getSize()[1]
    });
  });

  browser.setBackgroundColor('#efefef');
  browser.webContents.setUserAgent(
    browser.webContents.getUserAgent()
      .replace('minimal', 'Chrome')
      .replace(/Electron\/[0-9 | .]/, '')
      .replace('Chrome/1.0.0', '')
  );

  // ipc
  ipcMain.handle('prev', () => {
    browser.webContents.goBack();
  });
  ipcMain.handle('forward', () => {
    browser.webContents.goForward();
  });
  ipcMain.handle('open', (e, url) => {
    console.log(url.indexOf('http'));
    if (url.indexOf('http') !== 0) url = 'http://' + url;
    console.log(url);
    browser.webContents.loadURL(url);
  });
}

app.on('ready', nw);
