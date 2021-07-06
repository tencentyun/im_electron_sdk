import {
    CommonCallbackFun,
    GroupAttributeCallbackFun,
    GroupTipCallBackFun,
    TIMSetKickedOfflineCallback,
    TIMSetUserSigExpiredCallback,
    TIMSetNetworkStatusListenerCallback,
    TIMLogCallbackFun,
} from "../interface";
import {
    convEventCallback,
    convTotalUnreadMessageCountChangedCallback,
} from "../interface/conversationInterface";
const path = require("path");
const os = require("os");
const ref = require("ref-napi");
const ffi = require("ffi-napi");

const ffipaths: any = {
    linux: path.resolve(
        process.cwd(),
        "./im_electron_sdk/lib/linux/lib/libImSDK.so"
    ),
    x64: path.resolve(
        process.cwd(),
        "./im_electron_sdk/lib/windows/lib/Win64/ImSDK.dll"
    ),
    ia32: path.resolve(
        process.cwd(),
        "./im_electron_sdk/lib/windows/lib/Win32/ImSDK.dll"
    ),
};
function getFFIPath() {
    let res = "";
    const platform = os.platform().toLowerCase();
    switch (platform) {
        case "linux":
            res = ffipaths[platform];
            break;
        case "win32":
            const cpu = os.arch();
            res = ffipaths[cpu];
            break;
    }
    if (!res) {
        throw new Error(`tencent im sdk not support ${platform} os now.`);
        return;
    }
    return res;
}
function nodeStrigToCString(str: string): Buffer {
    const buffer = Buffer.from(str);
    return ref.readCString(buffer, 0);
}
function jsFuncToFFIFun(fun: CommonCallbackFun) {
    const callback = ffi.Callback(
        ref.types.void,
        [ref.types.int32, "string", "string", "string"],
        function (
            code: number,
            desc: string,
            json_param: string,
            user_data: string
        ) {
            fun(code, desc, json_param, user_data);
        }
    );
    return callback;
}
function jsFuncToFFIConvEventCallback(fun: convEventCallback) {
    const callback = ffi.Callback(
        ref.types.void,
        [ref.types.int, ref.types.CString, ref.types.CString],
        function (
            conv_event: number,
            json_conv_array: Buffer,
            user_data: Buffer
        ) {
            fun(conv_event, json_conv_array.toString(), user_data.toString());
        }
    );
    return callback;
}
function jsFunToFFITIMSetConvTotalUnreadMessageCountChangedCallback(
    fun: convTotalUnreadMessageCountChangedCallback
) {
    const callback = ffi.Callback(
        ref.types.void,
        [ref.types.int, ref.types.CString],
        function (total_unread_count: number, user_data: Buffer) {
            fun(total_unread_count, user_data.toString());
        }
    );
    return callback;
}
function jsFunToFFITIMSetNetworkStatusListenerCallback(
    fun: TIMSetNetworkStatusListenerCallback
) {
    const callback = ffi.Callback(
        ref.types.void,
        [ref.types.int, ref.types.CString],
        function (
            status: number,
            code: number,
            desc: Buffer,
            user_data: Buffer
        ) {
            fun(status, code, desc.toString(), user_data.toString());
        }
    );
    return callback;
}

function jsFunToFFITIMSetKickedOfflineCallback(
    fun: TIMSetKickedOfflineCallback
) {
    const callback = ffi.Callback(
        ref.types.void,
        [ref.types.int, ref.types.CString],
        function (user_data: Buffer) {
            fun(user_data.toString());
        }
    );
    return callback;
}
function jsFunToFFITIMSetUserSigExpiredCallback(
    fun: TIMSetUserSigExpiredCallback
) {
    const callback = ffi.Callback(
        ref.types.void,
        [ref.types.int, ref.types.CString],
        function (user_data: Buffer) {
            fun(user_data.toString());
        }
    );
    return callback;
}
function transformGroupTipFun(fun: GroupTipCallBackFun) {
    const callback = ffi.Callback(
        ref.types.void,
        [ref.types.CString, ref.types.CString],
        function (json_group_tip_array: Buffer, user_data: Buffer) {
            fun(json_group_tip_array.toString(), user_data.toString());
        }
    );
    return callback;
}

function transformGroupAttributeFun(fun: GroupAttributeCallbackFun) {
    const callback = ffi.Callback(
        ref.types.void,
        [ref.types.CString, ref.types.CString, ref.types.CString],
        function (
            group_id: Buffer,
            json_group_attibute_array: Buffer,
            user_data: Buffer
        ) {
            fun(
                group_id.toString(),
                json_group_attibute_array.toString(),
                user_data.toString()
            );
        }
    );
    return callback;
}
function transferTIMLogCallbackFun(fun: TIMLogCallbackFun) {
    const callback = ffi.Callback(
        ref.types.void,
        [ref.types.int, ref.types.CString, ref.types.CString],
        function (level: number, log: Buffer, user_data: Buffer) {
            fun(level, log.toString(), user_data.toString());
        }
    );
    return callback;
}
export {
    getFFIPath,
    nodeStrigToCString,
    jsFuncToFFIFun,
    jsFuncToFFIConvEventCallback,
    jsFunToFFITIMSetConvTotalUnreadMessageCountChangedCallback,
    jsFunToFFITIMSetNetworkStatusListenerCallback,
    jsFunToFFITIMSetKickedOfflineCallback,
    jsFunToFFITIMSetUserSigExpiredCallback,
    transformGroupTipFun,
    transformGroupAttributeFun,
    transferTIMLogCallbackFun,
};
