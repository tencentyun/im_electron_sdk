// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')

const path = require('path')

const TIM = require('./im_electron_sdk')
const groupManagerTest = require('./groupManagerTest');
const { LexuslinTest } = require('./LexuslinTest');

const baseManagerTest = require('./baseManaterTest');
const conversationManagerTest = require('./conversationManagerTest')
const tim = new TIM({
  sdkappid: 1400187352
});


// function createGroup() {
//   const groupManager = tim.getGroupManager();
//   console.log(groupManager.createGroup);
//   const res = groupManager.createGroup({
//     params: { name: "test-name" },
//     callback: (code, desc, json, data) => {
//       console.log('登陆成功', code, desc, json, data);
//     }
//   });
// };

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      webSecurity: false,
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

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
    console.log('初始化返回',tim.getTimbaseManager().TIMInit())
    tim.getTimbaseManager().TIMLogin({
      userID: "lexuslin",
      userSig:"eJwtjM0KgkAURt9l1iF3rjbjCC1chVFBWtR2dKa8ZGL*IUTvnqnf7jsHzoed94nT25oFDB1gq*mTsWVLd5pwYYeuKahcXGOeuqrIsIB7ANyX7hpnY4eKajtyAB-GzbSl158J9FAAV3Kp0GNMK6Ey40UYp7GmLsrRCDc8Qp7dePqWPc-UVqvd4XJNThv2-QHiqDGk",
       userData:"hahah"
     }).then(({code, desc, json, data})=>{
      console.log('登陆成功', code, desc, json, data);
      //  test base apis
      baseManagerTest.testBaseManager(tim);
      //  test conversation apis
      conversationManagerTest.testConversation(tim);
      // test group apis
      groupManagerTest.testGroupManager(tim);
 
      // new LexuslinTest(tim).start();
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
