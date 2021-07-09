import {
    callExperimentalAPIParam,
    CommonCallbackFun,
    commonResponse,
    getLoginUserIDParam,
    loginParam,
    logoutParam,
    sdkconfig,
    TIMProfileGetUserProfileListParam,
    TIMProfileModifySelfUserProfileParam,
    TIMSetConfigParam,
    TIMSetKickedOfflineCallbackParam,
    TIMSetLogCallbackParam,
    TIMSetNetworkStatusListenerCallbackParam,
    TIMSetUserSigExpiredCallbackParam,
} from "../interface";
import path from "path";
import {
    jsFuncToFFIFun,
    jsFunToFFITIMSetKickedOfflineCallback,
    jsFunToFFITIMSetNetworkStatusListenerCallback,
    jsFunToFFITIMSetUserSigExpiredCallback,
    nodeStrigToCString,
    transferTIMLogCallbackFun,
} from "../utils/utils";
import { TIMLoginStatus } from "../enum";

class TimbaseManager {
    private _sdkconfig: sdkconfig;
    constructor(config: sdkconfig) {
        this._sdkconfig = config;
    }
    /**
     * sdk初始化
     */
    TIMInit(): number {
        const sdkconfig: string = JSON.stringify({
            sdk_config_log_file_path: path.resolve(process.cwd(), "./sdk-log"),
            sdk_config_config_file_path: path.resolve(
                process.cwd(),
                "./sdk-config"
            ),
        });
        return this._sdkconfig.Imsdklib.TIMInit(
            this._sdkconfig.sdkappid,
            nodeStrigToCString(sdkconfig)
        );
    }
    TIMUninit(): number {
        return this._sdkconfig.Imsdklib.TIMUninit();
    }
    TIMGetSDKVersion(): Buffer {
        return this._sdkconfig.Imsdklib.TIMGetSDKVersion();
    }
    TIMGetServerTime(): number {
        return this._sdkconfig.Imsdklib.TIMGetServerTime();
    }
    TIMLogin(param: loginParam): Promise<commonResponse> {
        const userID = nodeStrigToCString(param.userID);
        const userSig = nodeStrigToCString(param.userSig);
        const userData = param.userData
            ? nodeStrigToCString(param.userData)
            : Buffer.from("");
        return new Promise((resolve, reject) => {
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                if (code === 0) {
                    resolve({ code, desc, json_param, user_data });
                } else {
                    reject({ code, desc, json_param, user_data });
                }
            };
            const callback = jsFuncToFFIFun(cb);
            const code: number = this._sdkconfig.Imsdklib.TIMLogin(
                userID,
                userSig,
                callback,
                userData
            );
            code !== 0 && reject({ code });
        });
    }
    TIMLogout(param: logoutParam): Promise<commonResponse> {
        const userData = param.userData
            ? nodeStrigToCString(param.userData)
            : Buffer.from("");
        return new Promise((resolve, reject) => {
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                if (code === 0) {
                    resolve({ code, desc, json_param, user_data });
                } else {
                    reject({ code, desc, json_param, user_data });
                }
            };
            const callback = jsFuncToFFIFun(cb);
            const code = this._sdkconfig.Imsdklib.TIMLogout(callback, userData);
            code !== 0 && reject({ code });
        });
    }
    TIMGetLoginStatus(): TIMLoginStatus {
        return this._sdkconfig.Imsdklib.TIMGetLoginStatus();
    }
    TIMGetLoginUserID(param: getLoginUserIDParam): Promise<commonResponse> {
        const userData = param.userData
            ? nodeStrigToCString(param.userData)
            : Buffer.from("");
        return new Promise((resolve, reject) => {
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                if (code === 0) {
                    resolve({ code, desc, json_param, user_data });
                } else {
                    reject({ code, desc, json_param, user_data });
                }
            };
            const callback = jsFuncToFFIFun(cb);
            const code = this._sdkconfig.Imsdklib.TIMGetLoginUserID(
                callback,
                userData
            );
            code !== 0 && reject({ code });
        });
    }
    TIMSetNetworkStatusListenerCallback(
        param: TIMSetNetworkStatusListenerCallbackParam
    ) {
        const callback = jsFunToFFITIMSetNetworkStatusListenerCallback(
            param.callback
        );
        const userData = param.userData
            ? nodeStrigToCString(param.userData)
            : Buffer.from("");

        this._sdkconfig.Imsdklib.TIMSetNetworkStatusListenerCallback(
            callback,
            userData
        );
    }
    TIMSetKickedOfflineCallback(param: TIMSetKickedOfflineCallbackParam) {
        const callback = jsFunToFFITIMSetKickedOfflineCallback(param.callback);
        const userData = param.userData
            ? nodeStrigToCString(param.userData)
            : Buffer.from("");

        this._sdkconfig.Imsdklib.TIMSetKickedOfflineCallback(
            callback,
            userData
        );
    }
    TIMSetUserSigExpiredCallback(param: TIMSetUserSigExpiredCallbackParam) {
        const callback = jsFunToFFITIMSetUserSigExpiredCallback(param.callback);
        const userData = param.userData
            ? nodeStrigToCString(param.userData)
            : Buffer.from("");

        this._sdkconfig.Imsdklib.TIMSetUserSigExpiredCallback(
            callback,
            userData
        );
    }
    TIMSetLogCallback(param: TIMSetLogCallbackParam) {
        const callback = transferTIMLogCallbackFun(param.callback);
        const user_data = param.user_data
            ? nodeStrigToCString(param.user_data)
            : Buffer.from("");

        this._sdkconfig.Imsdklib.TIMSetLogCallback(callback, user_data);
    }
    TIMSetConfig(param: TIMSetConfigParam) {
        const callback = jsFuncToFFIFun(param.callback);
        const user_data = param.user_data
            ? nodeStrigToCString(param.user_data)
            : Buffer.from("");
        const json_config = nodeStrigToCString(
            JSON.stringify(param.json_config)
        );
        this._sdkconfig.Imsdklib.TIMSetConfig(json_config, callback, user_data);
    }
    callExperimentalAPI(param: callExperimentalAPIParam) {
        const callback = jsFuncToFFIFun(param.callback);
        const user_data = param.user_data
            ? nodeStrigToCString(param.user_data)
            : Buffer.from("");
        const json_param = nodeStrigToCString(JSON.stringify(param.json_param));
        this._sdkconfig.Imsdklib.callExperimentalAPI(
            json_param,
            callback,
            user_data
        );
    }
    TIMProfileGetUserProfileList(
        param: TIMProfileGetUserProfileListParam
    ): Promise<commonResponse> {
        const userData = param.user_data
            ? nodeStrigToCString(param.user_data)
            : Buffer.from("");
        const json_param = nodeStrigToCString(
            JSON.stringify(param.json_get_user_profile_list_param)
        );

        return new Promise((resolve, reject) => {
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                if (code === 0) {
                    resolve({ code, desc, json_param, user_data });
                } else {
                    reject({ code, desc, json_param, user_data });
                }
            };
            const callback = jsFuncToFFIFun(cb);
            const code = this._sdkconfig.Imsdklib.TIMProfileGetUserProfileList(
                json_param,
                callback,
                userData
            );
            code !== 0 && reject({ code });
        });
    }
    TIMProfileModifySelfUserProfile(
        param: TIMProfileModifySelfUserProfileParam
    ): Promise<commonResponse> {
        const userData = param.user_data
            ? nodeStrigToCString(param.user_data)
            : Buffer.from("");
        const json_param = nodeStrigToCString(
            JSON.stringify(param.json_modify_self_user_profile_param)
        );

        console.log(json_param);

        return new Promise((resolve, reject) => {
            const cb: CommonCallbackFun = (
                code,
                desc,
                json_param,
                user_data
            ) => {
                if (code === 0) {
                    resolve({ code, desc, json_param, user_data });
                } else {
                    reject({ code, desc, json_param, user_data });
                }
            };
            const callback = jsFuncToFFIFun(cb);

            const code =
                this._sdkconfig.Imsdklib.TIMProfileModifySelfUserProfile(
                    json_param,
                    callback,
                    userData
                );
            code !== 0 && reject({ code });
        });
    }
}
export default TimbaseManager;
