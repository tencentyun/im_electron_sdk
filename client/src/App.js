import React, { Component } from 'react';
import { TimRender } from "../../im_electron_sdk/dist/timRender.umd";

import './App.css';

const timRenderInstance = new TimRender();
class App extends Component {

  async createGroup() {
    const fakeParams = {
      groupName: "test-avchatRoom",
      groupType: 4,
      groupMemberArray: [{
        identifer: "6666",
        nameCard: "member1"
      }],
      notification: "Pls add name card",
      introduction: "use for dev test",
      face_url: "test face_url",
    };
    const res = await timRenderInstance.createGroup({
      params: fakeParams,
      data: "{a:1, b:2}"
    });

    console.log("create group response", res);
  }


  init() {
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
