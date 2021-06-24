import React, { Component } from 'react';
import { ipcRenderer } from "electron";
import './App.css';

ipcRenderer.on('create-group-reply', (event, result) => {
  console.log('result', JSON.parse(result));
})

class App extends Component {
  createGroup() {
    // ipcRenderer.send('create-group');
  }
  init(){
    // Window.tim.getTimbaseManager().TIMInit();
    console.log(Window.tim.getTimbaseManager().TIMInit)
    // console.log(Window.tim);
  }
  login(){
    console.log(2)
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
