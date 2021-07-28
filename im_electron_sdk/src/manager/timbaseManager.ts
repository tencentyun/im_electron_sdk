import {
    cache,
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
    randomString,
    transferTIMLogCallbackFun,
} from "../utils/utils";
import { TIMLoginStatus } from "../enum";

class TimbaseManager {
    private _sdkconfig: sdkconfig;
    private _callback: Map<String, Function> = new Map();
    private _ffiCallback: Map<String, Buffer> = new Map();
    private _cache: Map<String, Map<string, cache>> = new Map();
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
            : Buffer.from(" ");

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
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
                this._cache.get("TIMLogin")?.delete(now);
            };

            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMLogin");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: callback,
            });
            this._cache.set("TIMLogin", cacheMap);
            const code: number = this._sdkconfig.Imsdklib.TIMLogin(
                userID,
                userSig,
                this._cache.get("TIMLogin")?.get(now)?.callback,
                userData
            );
            code !== 0 && reject({ code });
        });
    }
    TIMLogout(param: logoutParam): Promise<commonResponse> {
        const userData = param.userData
            ? nodeStrigToCString(param.userData)
            : Buffer.from(" ");
        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
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
                this._cache.get("TIMLogout")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMLogout");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: callback,
            });
            this._cache.set("TIMLogout", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMLogout(
                this._cache.get("TIMLogout")?.get(now)?.callback,
                userData
            );
            code !== 0 && reject({ code });
        });
    }
    TIMGetLoginStatus(): TIMLoginStatus {
        return this._sdkconfig.Imsdklib.TIMGetLoginStatus();
    }
    TIMGetLoginUserID(param: getLoginUserIDParam): Promise<commonResponse> {
        const userData = param.userData
            ? nodeStrigToCString(param.userData)
            : Buffer.from(" ");
        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;
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
                this._cache.get("TIMGetLoginUserID")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMGetLoginUserID");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: callback,
            });
            this._cache.set("TIMGetLoginUserID", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMGetLoginUserID(
                this._cache.get("TIMGetLoginUserID")?.get(now)?.callback,
                userData
            );
            code !== 0 && reject({ code });
        });
    }
    private networkStatusListenerCallback(
        status: number,
        code: number,
        desc: string,
        user_data: string
    ) {
        const fn = this._callback.get("TIMSetNetworkStatusListenerCallback");
        fn && fn(status, code, desc, user_data);
    }
    private kickedOfflineCallback(user_data: string) {
        const fn = this._callback.get("TIMSetKickedOfflineCallback");
        fn && fn(user_data);
    }
    private userSigExpiredCallback(user_data: string) {
        const fn = this._callback.get("TIMSetUserSigExpiredCallback");
        fn && fn(user_data);
    }
    private logCallback(level: number, log: string, user_data: string) {
        const fn = this._callback.get("TIMSetLogCallback");
        fn && fn(level, log, user_data);
    }
    TIMSetNetworkStatusListenerCallback(
        param: TIMSetNetworkStatusListenerCallbackParam
    ) {
        const userData = param.userData
            ? nodeStrigToCString(param.userData)
            : Buffer.from(" ");
        const c_callback = jsFunToFFITIMSetNetworkStatusListenerCallback(
            this.networkStatusListenerCallback.bind(this)
        );
        this._callback.set(
            "TIMSetNetworkStatusListenerCallback",
            param.callback
        );
        this._ffiCallback.set(
            "TIMSetNetworkStatusListenerCallback",
            c_callback
        );
        this._sdkconfig.Imsdklib.TIMSetNetworkStatusListenerCallback(
            this._ffiCallback.get(
                "TIMSetNetworkStatusListenerCallback"
            ) as Buffer,
            userData
        );
    }
    TIMSetKickedOfflineCallback(param: TIMSetKickedOfflineCallbackParam) {
        const userData = param.userData
            ? nodeStrigToCString(param.userData)
            : Buffer.from(" ");
        const c_callback = jsFunToFFITIMSetKickedOfflineCallback(
            this.kickedOfflineCallback.bind(this)
        );
        this._callback.set("TIMSetKickedOfflineCallback", param.callback);
        this._ffiCallback.set("TIMSetKickedOfflineCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMSetKickedOfflineCallback(
            this._ffiCallback.get("TIMSetKickedOfflineCallback") as Buffer,
            userData
        );
    }
    TIMSetUserSigExpiredCallback(param: TIMSetUserSigExpiredCallbackParam) {
        const userData = param.userData
            ? nodeStrigToCString(param.userData)
            : Buffer.from(" ");
        const c_callback = jsFunToFFITIMSetUserSigExpiredCallback(
            this.userSigExpiredCallback.bind(this)
        );
        this._callback.set("TIMSetUserSigExpiredCallback", param.callback);
        this._ffiCallback.set("TIMSetUserSigExpiredCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMSetUserSigExpiredCallback(
            this._ffiCallback.get("TIMSetUserSigExpiredCallback") as Buffer,
            userData
        );
    }
    TIMSetLogCallback(param: TIMSetLogCallbackParam) {
        const user_data = param.user_data
            ? nodeStrigToCString(param.user_data)
            : Buffer.from(" ");
        const c_callback = transferTIMLogCallbackFun(
            this.logCallback.bind(this)
        );
        this._callback.set("TIMSetLogCallback", param.callback);
        this._ffiCallback.set("TIMSetLogCallback", c_callback);
        this._sdkconfig.Imsdklib.TIMSetLogCallback(
            this._ffiCallback.get("TIMSetLogCallback") as Buffer,
            user_data
        );
    }
    TIMSetConfig(param: TIMSetConfigParam) {
        const user_data = param.user_data
            ? nodeStrigToCString(param.user_data)
            : Buffer.from(" ");
        const json_config = nodeStrigToCString(
            JSON.stringify(param.json_config)
        );
        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;

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
                this._cache.get("TIMSetConfig")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMSetConfig");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: callback,
            });
            this._cache.set("TIMSetConfig", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMSetConfig(
                json_config,
                this._cache.get("TIMSetConfig")?.get(now)?.callback,
                user_data
            );
            code !== 0 && reject({ code });
        });
    }
    callExperimentalAPI(
        param: callExperimentalAPIParam
    ): Promise<commonResponse> {
        const user_data = param.user_data
            ? nodeStrigToCString(param.user_data)
            : Buffer.from(" ");
        const json_param = nodeStrigToCString(JSON.stringify(param.json_param));

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;

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
                this._cache.get("callExperimentalAPI")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("callExperimentalAPI");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: callback,
            });
            this._cache.set("callExperimentalAPI", cacheMap);
            const code = this._sdkconfig.Imsdklib.callExperimentalAPI(
                json_param,
                this._cache.get("callExperimentalAPI")?.get(now)?.callback,
                user_data
            );
            code !== 0 && reject({ code });
            code === 0 && resolve({ code });
        });
    }
    TIMProfileGetUserProfileList(
        param: TIMProfileGetUserProfileListParam
    ): Promise<commonResponse> {
        const userData = param.user_data
            ? nodeStrigToCString(param.user_data)
            : Buffer.from(" ");
        const json_param = nodeStrigToCString(
            JSON.stringify(param.json_get_user_profile_list_param)
        );

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;

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
                this._cache.get("TIMProfileGetUserProfileList")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMProfileGetUserProfileList");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: callback,
            });
            this._cache.set("TIMProfileGetUserProfileList", cacheMap);
            const code = this._sdkconfig.Imsdklib.TIMProfileGetUserProfileList(
                json_param,
                this._cache.get("TIMProfileGetUserProfileList")?.get(now)
                    ?.callback,
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
            : Buffer.from(" ");
        const json_param = nodeStrigToCString(
            JSON.stringify(param.json_modify_self_user_profile_param)
        );

        return new Promise((resolve, reject) => {
            const now = `${Date.now()}${randomString()}`;

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
                this._cache.get("TIMProfileModifySelfUserProfile")?.delete(now);
            };
            const callback = jsFuncToFFIFun(cb);
            let cacheMap = this._cache.get("TIMProfileModifySelfUserProfile");
            if (cacheMap === undefined) {
                cacheMap = new Map();
            }
            cacheMap.set(now, {
                cb: cb,
                callback: callback,
            });
            this._cache.set("TIMProfileModifySelfUserProfile", cacheMap);
            const code =
                this._sdkconfig.Imsdklib.TIMProfileModifySelfUserProfile(
                    json_param,
                    this._cache.get("TIMProfileModifySelfUserProfile")?.get(now)
                        ?.callback,
                    userData
                );
            code !== 0 && reject({ code });
        });
    }
}
export default TimbaseManager;
