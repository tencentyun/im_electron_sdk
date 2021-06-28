// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron');
const path = require('path')

const TIM = require('./im_electron_sdk');
console.log(TIM);
const groupManagerTest = require('./groupManagerTest');
const { LexuslinTest } = require('./LexuslinTest');

const baseManagerTest = require('./baseManaterTest');
const conversationManagerTest = require('./conversationManagerTest');

const {subscribe, initTim} = require("./im_electron_sdk");


const tim = initTim(1400187352);

let initSDKResolver = null;
const initPromise = new Promise((resolve) => initSDKResolver = resolve);

subscribe();

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      webSecurity: true,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
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

  mainWindow.once('ready-to-show', async () => {
    mainWindow.show();
    mainWindow.webContents.openDevTools()
    const res = await tim.getTimbaseManager().TIMLogin({
      userID: "940928",
      userSig:"eJwtjEEOgjAURO-StaGfUrCQuDFBE8Ru6AWIfMxXgYYSQ2K8uxWY3bw3mQ8zZRW8cWQZEwGw3dKpwX6ilhacSkiF2oxrnrW11LAslACh2kexWA3Olkb0HECBz0on6v4sETIBpaJt6*jujy99NUhedOjm-MRvcigiw-FYnjlctX3VUBs9PlzsdH5g3x*3bjAK",
      userData:"hahah"
     });

    //  console.log("Login successed", res);
    //  initSDKResolver();

      // //  test base apis
      // baseManagerTest.testBaseManager(tim);
      // // test conversation apis
      // conversationManagerTest.testConversation(tim);
      // // test group apis
      // groupManagerTest.testGroupManager(tim);
      // new LexuslinTest(tim).start();

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
