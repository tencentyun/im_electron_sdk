import React, { Component } from 'react';
// import { ipcRenderer, remote } from "electron";
import { TimRender } from "../../im_electron_sdk/dist/timRender.umd";

import './App.css';

const timRenderInstance = new TimRender();

// ipcRenderer.on('create-group-reply', (event, result) => {
//   console.log('result', JSON.parse(result));
// })

class App extends Component {

  createGroup() {

    const fakeParams = {
      groupName: "test-avchatRoom",
      groupType: 4,
      groupMemberArray: [{
        identifer: "6666",
        // customInfo: [
        //     { key: "test1", value: "111" },
        //     { key: "test2", value: "222" }
        // ],
        nameCard: "member1"
      }],
      notification: "Pls add name card",
      introduction: "use for dev test",
      face_url: "test face_url",
      // customInfo: [
      //     { key: "gourp_custom1", value: "111" },
      //     { key: "group_custom2", value: "222" }
      // ]
    };
    // callMethod('createGroup', {a:111, b:222})
    ipcRenderer.send('call-method', {
      eventName: 'TIMGroupCreate',
      data: {
        params: fakeParams,
        data: "{a:1, b:2}"
      }
    });

  }


  init() {
    // Window.tim.getTimbaseManager().TIMInit();
    // console.log(Window.tim);
    timRenderInstance.init();
  }
  async login() {
    const res = await timRenderInstance.login({
      userID: "940928",
      userSig: "eJwtjEEOgjAURO-StaGfUrCQuDFBE8Ru6AWIfMxXgYYSQ2K8uxWY3bw3mQ8zZRW8cWQZEwGw3dKpwX6ilhacSkiF2oxrnrW11LAslACh2kexWA3Olkb0HECBz0on6v4sETIBpaJt6*jujy99NUhedOjm-MRvcigiw-FYnjlctX3VUBs9PlzsdH5g3x*3bjAK",
      userData: "hahah"
    });

    console.log(res);
  }
  render() {
    return (
      <div className="App">
        <button onClick={this.createGroup}>Create Group</button>
        <button onClick={this.init}>init</button>
        <button onClick={this.login}>login</button>
      </div>
    );
  }
}

export default App;
