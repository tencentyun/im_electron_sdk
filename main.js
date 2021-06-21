// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

const TIM = require('./im_electron_sdk')

const tim = new TIM({
  sdkappid:1400187352
});

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show:false,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      nodeIntegrationInWorker:true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  // mainWindow.loadURL(
  //   url.format({
  //       pathname: path.join(__dirname, './client/build/index.html'),
  //       protocol: 'file:',
  //       // slashes: true
  //   })
  // )
  mainWindow.loadURL("http://127.0.0.1:3000")
 
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    const initRes = tim.getTimbaseManager().initSDK();
    console.log("initRes:",initRes);
    const loginRes = tim.getTimbaseManager().login({
      userID:"3708",
      userSig:"eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwsbmBhZQ8eKU7MSCgswUJStDEwMDQwtzY1MjiExqRUFmUSpQ3NTU1MjAwAAiWpKZCxIzMwKqNjIwMYaakpkONNYpwzTSsCzTp9wjyNQxzTnHI7Agy9nUJdyoqCIw0dKkMsrA1zUrx7zCw8LVVqkWAGtSL5A_",
      callback:(code,desc,json,data)=>{
        console.log('登陆成功',code,desc,json,data);
      }
    })
  })
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
