
let tim = null;
function TIMGetServerTime(){
    console.log('TIMGetServerTime res',tim.getTimbaseManager().TIMGetServerTime());
}
function TIMGetLoginUserID(){
    console.log('TIMGetLoginUserID res:',tim.getTimbaseManager().TIMGetLoginUserID({callback:(code, desc, json, data)=>{
        console.log(code,desc,json,data)
    },userData:'user_data:TIMGetLoginUserID'}))
}
function TIMLogout(){
    console.log("TIMLogout res:",tim.getTimbaseManager().TIMLogout({
        callback:(code,desc,json,data)=>{
            console.log(code,desc,json,data)
        },
        userData:"user_data:TIMLogout"
    }));
}
function  TIMGetLoginStatus(){
    console.log('TIMGetLoginStatus res:',tim.getTimbaseManager().TIMGetLoginStatus())
}
const testBaseManager = data => {
    tim = data;
    TIMGetServerTime();
    TIMGetLoginUserID();
    TIMGetLoginStatus();
}
module.exports = {
    testBaseManager
}