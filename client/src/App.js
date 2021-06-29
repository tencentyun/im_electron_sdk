import React, { Component } from 'react';
import { TimRender } from "../../im_electron_sdk/dist/timRender.umd";
import APIS from './apis';
import './App.css';

const timRenderInstance = new TimRender();
class App extends Component {
  constructor(){
    super();
    this.state = {
      log:[]
    }
  }
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

    const { data: { json_param } } = res;
    const { create_group_result_groupid } = JSON.parse(json_param);

    console.log("Created group id", create_group_result_groupid);
    this.setState({
      groupId: create_group_result_groupid
    });
  }


  
  showConsole(data){
    const { log } = this.state;
    log.push(data)
    this.setState({
      log:log
    })
  }
  render() {
    const { log } = this.state;
    return (
      <div className="App">
        <div className="btns">
          {
            APIS.map((item,index)=>{
              return (
                <div className="card" key={index}>
                  <div className="title">{item.manager}</div>
                  <div className="btn">
                    {
                      item.method.map((met,idx)=>{
                        return <button key={`${index}${idx}`} onClick={()=>{
                          met.action(this.showConsole.bind(this));
                        }}>{met.name}</button>
                      })
                    }
                  </div>
                </div>
              )
            })
          }
          
        </div>
        <div className="console">
          {
            log.map((item,index)=>{
              return <div className="log-item" key={index}>{item}</div>
            })  
          }
        </div>
      </div>
    );
  }
}

export default App;
