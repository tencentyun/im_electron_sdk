import { TimRender } from "../../../im_electron_sdk/dist/timRender.umd";
const timRenderInstance = new TimRender();
const TimBaseManager = {
    TIMInit:()=>{
        return timRenderInstance.TIMInit();
    },
    TIMLogin:()=>{
        return timRenderInstance.TIMLogin({
            // userID: "3708",
            // userSig: "eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwsbmBhZQ8eKU7MSCgswUJStDEwMDQwtzY1MjiExqRUFmUSpQ3NTU1MjAwAAiWpKZCxIzMzKxNDU3NjGDmpKZDjQ2LKnAz6Q0J9s3LdQsSrvA28kvKinY1LvIOdE9yDk13DEp0SIi2zWtND*53FapFgB-kjCC",
            userData: "xingchenhe-test",
            userID: "lexuslin",
            userSig: "eJwtjM0KgkAURt9l1iF3rjbjCC1chVFBWtR2dKa8ZGL*IUTvnqnf7jsHzoed94nT25oFDB1gq*mTsWVLd5pwYYeuKahcXGOeuqrIsIB7ANyX7hpnY4eKajtyAB-GzbSl158J9FAAV3Kp0GNMK6Ey40UYp7GmLsrRCDc8Qp7dePqWPc-UVqvd4XJNThv2-QHiqDGk"
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