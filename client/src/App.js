import React, { Component } from 'react';
import { ipcRenderer } from "electron";
import './App.css';

ipcRenderer.on('create-group-reply', (event, result) => {
  console.log('result', JSON.parse(result));
})

class App extends Component {
  createGroup() {
    ipcRenderer.send('create-group');
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.createGroup}>Create Group</button>
      </div>
    );
  }
}

export default App;
