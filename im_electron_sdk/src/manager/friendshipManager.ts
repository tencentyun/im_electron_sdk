import { CommonCallbackFun, loginParam, sdkconfig } from "../interface/inerface";
import path from "path";
import { jsFuncToFFIFun, nodeStrigToCString } from "../utils/utils";

class  FriendshipManager {
    private _sdkconfig:sdkconfig;
    constructor(config:sdkconfig) {
        this._sdkconfig = config;
    }

    TIMFriendshipGetFriendProfileList(func:CommonCallbackFun) :number{
        const loginCallback = jsFuncToFFIFun(func);
        const userData = Buffer.from("");
        return 1;
        // return this._sdkconfig.Imsdklib.TIMFriendshipGetFriendProfileList(loginCallback,userData);
    }  
}
export default FriendshipManager;