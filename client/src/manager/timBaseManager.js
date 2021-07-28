import TimRender from "../../../im_electron_sdk";
const timRenderInstance = new TimRender();
const TimBaseManager = {
    callExperimentalAPI:()=>{
        return timRenderInstance.callExperimentalAPI({
            json_param: {
                request_internal_operation: 'internal_operation_set_privatization_info',
                request_set_privatization_info_param: {
                    server_address_array: [{
                        server_address_ip: "106.55.144.99",// ip
                        server_address_port: 80// 端口
                    }],
                    server_public_key: '0436ddd1de2ec99e57f8a796745bf5c639fe038d65f9df155e3cbc622d0b1b75a40ee49074920e56c6012f90c77be69f7f'// 公钥
                }
            }
        })
    },
    TIMInit:()=>{
        return timRenderInstance.TIMInit();
    },
    TIMLogin:()=>{
        return timRenderInstance.TIMLogin({
            userID: "3708",
            userSig: "eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwsbmBhZQ8eKU7MSCgswUJStDEwMDQwtzY1MjiExqRUFmUSpQ3NTU1MjAwAAiWpKZCxIzMzKxNDU3NjGDmpKZDjQ2LKnAz6Q0J9s3LdQsSrvA28kvKinY1LvIOdE9yDk13DEp0SIi2zWtND*53FapFgB-kjCC",
            userData: "xingchenhe-test",
            // userID: "lexuslin",
            // userSig: "eJwtjM0KgkAURt9l1iF3rjbjCC1chVFBWtR2dKa8ZGL*IUTvnqnf7jsHzoed94nT25oFDB1gq*mTsWVLd5pwYYeuKahcXGOeuqrIsIB7ANyX7hpnY4eKajtyAB-GzbSl158J9FAAV3Kp0GNMK6Ey40UYp7GmLsrRCDc8Qp7dePqWPc-UVqvd4XJNThv2-QHiqDGk"
        })
    },
    TIMOnInvited:()=>{
        return timRenderInstance.TIMOnInvited({
            callback:(data)=>{
                console.log('被回调',data)
            }
        })
    },
    TIMOnTimeout:()=>{
        return timRenderInstance.TIMOnTimeout({
            callback:(data)=>{
                console.log('超时被回调',data)
            }
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
    },
    TIMProfileGetUserProfileList: () => {
        return timRenderInstance.TIMProfileGetUserProfileList({
            json_get_user_profile_list_param: {
                friendship_getprofilelist_param_identifier_array: ['3708']
            },
            userData:"TIMProfileGetUserProfileList",
        })
    },
    TIMProfileModifySelfUserProfile: () => {
        return timRenderInstance.TIMProfileModifySelfUserProfile({
            json_modify_self_user_profile_param: {
                user_profile_item_nick_name: 'Jingfeng'
            },
            userData:"TIMProfileModifySelfUserProfile",
        })
    }
}

export default TimBaseManager;