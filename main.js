// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain,dialog,crashReporter } = require('electron')
const path = require('path')
const { TimMain, Tim } = require('./im_electron_sdk');
// const groupManagerTest = require('./groupManagerTest');
// const { LexuslinTest } = require('./LexuslinTest');

// const baseManagerTest = require('./baseManaterTest');
// const conversationManagerTest = require('./conversationManagerTest');
// const tim = new TIM({
//   sdkappid: 1400187352
// });
const tim = new TimMain({
  sdkappid: 1400187352
})

// const tim = new Tim({
//   sdkappid: 1400187352
// })
// let initSDKResolver = null;
// const initPromise = new Promise((resolve) => initSDKResolver = resolve);


// const createGroup = async () => {
//   console.log("invoke create group methos");
//   const groupManager = tim.getGroupManager();
//   try {
//       const fakeParams = {
//           name: "test-name",
//           memberArray: [{
//               identifer: "123",
//               customInfo: [
//                   { key: "test1", value: "111" },
//                   { key: "test2", value: "222" }
//               ]
//           }],
//           customInfo: [
//               { key: "group test1", value: "111" },
//               { key: "group test2", value: "222" }
//           ]
//       };
//       const res = await groupManager.TIMGroupCreate({
//           params: fakeParams,
//           data: "{a:1, b:2}"
//       });
//       console.log("=========res", res);
//       return res;
//   } catch (e) {
//       console.log("=========error===", e)
//   }
// };

// ipcMain.on('create-group', async (event, arg) => {
//   await initPromise;
//   const res = await createGroup();
//   console.log('==============res==============', res);
//   event.sender.send('create-group-reply', JSON.stringify(res));
// })

// let initSDKResolver = null;
// const initPromise = new Promise((resolve) => initSDKResolver = resolve);

// subscribe();

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
  mainWindow.webContents.on("render-process-gone",(event)=>{
    console.log(event)
    // const choice = dialog.showMessageBoxSync(win, {
    //   type: 'question',
    //   buttons: ['Leave', 'Stay'],
    //   title: 'Do you want to leave this site?',
    //   message: 'Changes you made may not be saved.',
    //   defaultId: 0,
    //   cancelId: 1
    // })
    // const leave = (choice === 0)
    // if (leave) {
    //   event.preventDefault()
    // }
    event.preventDefault()
  })
 
  mainWindow.once('ready-to-show', async () => {
    mainWindow.show();
    mainWindow.webContents.openDevTools()
    // tim.getTimbaseManager().TIMInit();
    // const res = await tim.getTimbaseManager().TIMLogin({
    //   userID: "lexuslin",
    //   userSig:"eJwtjM0KgkAURt9l1iF3rjbjCC1chVFBWtR2dKa8ZGL*IUTvnqnf7jsHzoed94nT25oFDB1gq*mTsWVLd5pwYYeuKahcXGOeuqrIsIB7ANyX7hpnY4eKajtyAB-GzbSl158J9FAAV3Kp0GNMK6Ey40UYp7GmLsrRCDc8Qp7dePqWPc-UVqvd4XJNThv2-QHiqDGk", // lexuslin
    //   // userSig: "eJwtjNEKgjAYhd9l1yH-NreG0IWB1IWIZBh0FzjzR9OlS0bRu2fquTvfdzgfco4zb9Q9CQjzgGzmjoVuLZY440a719Bgy1c5FPXNGCxIQH0AqrZcsMVoZ7DXEwdQMGWhFh9-JpmvpAC*bge8T9-5O2eXSGbVgSsXqS6xo6yT9Bg-96W4VrWj4SlV0Lky3JHvDx6uMp4_", // lexuslin3
    //   userData:"hahah"
    //  })
    //  initSDKResolver();

      // //  test base apis
      // baseManagerTest.testBaseManager(tim);
      // // test conversation apis
      // conversationManagerTest.testConversation(tim);
      // // test group apis
      // groupManagerTest.testGroupManager(tim);
      // setTimeout(() => {
      //   new LexuslinTest(tim).start();
      // }, 0)
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
app.on("render-process-gone",(event)=>{
  console.log(event,'**********************************')
  // const choice = dialog.showMessageBoxSync(win, {
  //   type: 'question',
  //   buttons: ['Leave', 'Stay'],
  //   title: 'Do you want to leave this site?',
  //   message: 'Changes you made may not be saved.',
  //   defaultId: 0,
  //   cancelId: 1
  // })
  // const leave = (choice === 0)
  // if (leave) {
  //   event.preventDefault()
  // }
  event.preventDefault()
})
app.on("child-process-gone",(event)=>{
  console.log(event,'12312**********************************')
  // const choice = dialog.showMessageBoxSync(win, {
  //   type: 'question',
  //   buttons: ['Leave', 'Stay'],
  //   title: 'Do you want to leave this site?',
  //   message: 'Changes you made may not be saved.',
  //   defaultId: 0,
  //   cancelId: 1
  // })
  // const leave = (choice === 0)
  // if (leave) {
  //   event.preventDefault()
  // }event.preventDefault()
  event.preventDefault()
})
console.log(crashReporter.getLastCrashReport(),'report')
crashReporter.start({
  productName: 'im-sdk',
  companyName: 'tencent',
  submitURL: 'http://127.0.0.1:5000/crash',
  uploadToServer: true
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
