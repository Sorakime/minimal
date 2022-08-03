const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('node', {
  prev: () => {
    ipcRenderer.invoke('prev');
  },
  forward: () => {
    ipcRenderer.invoke('forward');
  },
  open: (url) => {
    ipcRenderer.invoke('open', url);
  }
});
