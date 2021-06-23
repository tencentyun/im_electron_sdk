let tim = null;

function TIMConvCreate(){
    tim.getConversationManager().TIMConvCreate({
        convId:"C2C_3708",
        convType:1,
        
        userData:"user_data:TIMConvCreate"
    }).then(data=>{
        console.log('TIMConvCreate res',data)
    })
}
function TIMConvGetConvList(){
    tim.getConversationManager().TIMConvGetConvList(
        {
            
            userData:"user_data:TIMConvGetConvList"
        }
    ).then(data=>{
        console.log('TIMConvGetConvList res',data)
    })
}
const testConversation = data => {
    tim = data;
    // TIMConvCreate();
    TIMConvGetConvList();
}
module.exports = {
    testConversation
}