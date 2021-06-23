let tim = null;

function TIMConvCreate(){
    console.log('TIMConvCreate res:',tim.getConversationManager().TIMConvCreate({
        convId:"C2C_3708",
        convType:1,
        callback:(code, desc, json, data)=>{
            console.log(code,desc,json,data)
        },
        userData:"user_data:TIMConvCreate"
    }))
}
const testConversation = data => {
    tim = data;
    TIMConvCreate();
}
module.exports = {
    testConversation
}