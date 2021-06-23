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
function TIMConvGetConvList(){
    console.log('TIMConvGetConvList res:',tim.getConversationManager().TIMConvGetConvList(
        {
            callback:(code, desc, json, data)=>{
                console.log(code,desc,json,data)
            },
            userData:"user_data:TIMConvGetConvList"
        }
    ))
}
const testConversation = data => {
    tim = data;
    // TIMConvCreate();
    TIMConvGetConvList();
}
module.exports = {
    testConversation
}