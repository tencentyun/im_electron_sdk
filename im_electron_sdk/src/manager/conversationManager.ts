import { sdkconfig } from "../interface/inerface";

class ConversationManager {

    private _sdkconfig:sdkconfig;
    constructor(config:sdkconfig) {
        this._sdkconfig = config;
    }
}
export default ConversationManager;