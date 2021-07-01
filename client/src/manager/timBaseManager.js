import { TimRender } from "../../../im_electron_sdk/dist/timRender.umd";
const timRenderInstance = new TimRender();
const TimBaseManager = {
    TIMInit:()=>{
        return timRenderInstance.TIMInit();
    },
    TIMLogin:()=>{
        return timRenderInstance.TIMLogin({
            userID: "3708",
            userSig: "eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwsbmBhZQ8eKU7MSCgswUJStDEwMDQwtzY1MjiExqRUFmUSpQ3NTU1MjAwAAiWpKZCxIzMzKxNDU3NjGDmpKZDjQ2LKnAz6Q0J9s3LdQsSrvA28kvKinY1LvIOdE9yDk13DEp0SIi2zWtND*53FapFgB-kjCC",
            userData: "xingchenhe-test"
        })
    },
    TIMUninit:()=>{
        return timRenderInstance.TIMUninit()
    },
    TIMGetSDKVersion:()=>{
        return timRenderInstance.TIMGetSDKVersion();
    },
    TIMGetServerTime:()=>{
        return timRenderInstance.TIMGetServerTime();
    },
    TIMLogout:()=>{
        return timRenderInstance.TIMLogout({
            userData:"logout"
        })
    },
    TIMGetLoginStatus:()=>{
        return timRenderInstance.TIMGetLoginStatus()
    },
    TIMGetLoginUserID:()=>{
        return timRenderInstance.TIMGetLoginUserID({
            userData:"getLoginUserID"
        })
    },
    TIMSetNetworkStatusListenerCallback:()=>{
       return timRenderInstance.TIMSetNetworkStatusListenerCallback({
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