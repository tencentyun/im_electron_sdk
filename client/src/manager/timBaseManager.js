import { TimRender } from "../../../im_electron_sdk/dist/timRender.umd";
const timRenderInstance = new TimRender();
const TimBaseManager = {
    TIMInit:()=>{
        return timRenderInstance.init();
    },
    TIMLogin:()=>{
        return timRenderInstance.login({
            userID: "3708",
            userSig: "eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwsbmBhZQ8eKU7MSCgswUJStDEwMDQwtzY1MjiExqRUFmUSpQ3NTU1MjAwAAiWpKZCxIzMzKxNDU3NjGDmpKZDjQ2LKnAz6Q0J9s3LdQsSrvA28kvKinY1LvIOdE9yDk13DEp0SIi2zWtND*53FapFgB-kjCC",
            userData: "xingchenhe-test"
        })
    },
    uninit:()=>{
        return timRenderInstance.uninit()
    },
    getSDKVersion:()=>{
        return timRenderInstance.getSDKVersion();
    },
    getServerTime:()=>{
        return timRenderInstance.getServerTime();
    },
    logout:()=>{
        return timRenderInstance.logout({
            userData:"logout"
        })
    },
    getLoginStatus:()=>{
        return timRenderInstance.getLoginStatus()
    },
    getLoginUserID:()=>{
        return timRenderInstance.getLoginUserID({
            userData:"getLoginUserID"
        })
    },
    setNetworkStatusListenerCallback:()=>{
       return timRenderInstance.setNetworkStatusListenerCallback({
            userData:"setNetworkStatusListenerCallback",
            callback:(data)=>{
                console.log(data,'setNetworkStatusListenerCallback');
            }
        })
    },
    TIMSetKickedOfflineCallback:()=>{
        return timRenderInstance.TIMSetKickedOfflineCallback({
            userData:"TIMSetKickedOfflineCallback",
            callback:(data)=>{
                console.log(data,'TIMSetKickedOfflineCallback');
            }
        })
    },
    TIMSetUserSigExpiredCallback:()=>{
        return timRenderInstance.TIMSetUserSigExpiredCallback({
            userData:"TIMSetUserSigExpiredCallback",
            callback:(data)=>{
                console.log(data,'TIMSetUserSigExpiredCallback');
            }
        })
    }
}

export default TimBaseManager;