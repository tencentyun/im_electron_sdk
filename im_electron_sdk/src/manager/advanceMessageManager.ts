import { 
    sdkconfig, 
    ErrorResponse, 
    Json_advance_message_param,
    Json_value_msg
} from "../interface";
import { nodeStrigToCString, jsFuncToFFIFun } from "../utils/utils";

class AdvanceMessageManage {
    private _sdkconfig:sdkconfig;
    private stringFormator = (str: string | undefined): Buffer => str ? nodeStrigToCString(str) : Buffer.from("");

    getErrorResponse(params: ErrorResponse) {
        return {
            code: params.code || -1, 
            desc: params.desc || "error",
            json_params: params.json_params || "",
            user_data: params.user_data || ""
        }
    }

    getErrorResponseByCode(code: number) {
        return this.getErrorResponse({ code })
    }
    
    constructor(config:sdkconfig) {
        this._sdkconfig = config;
    }

    TIMMsgSendMessage(conv_id: string, conv_type: number, json_advance_message_param: Json_value_msg, message_id_buffer: string, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_advance_message_param));
        const userData = this.stringFormator(user_data);
        const c_conv_id = this.stringFormator(conv_id);
        const c_message_id_buffer = this.stringFormator(message_id_buffer);
    
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMMsgSendMessage(c_conv_id, conv_type, params, undefined, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }

    TIMMsgCancelSend(conv_id: string, conv_type: number, message_id: string, user_data: string) :Promise<any> {
        const userData = this.stringFormator(user_data);
        const c_conv_id = this.stringFormator(conv_id);
        const c_message_id = this.stringFormator(message_id);
    
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMMsgCancelSend(c_conv_id, conv_type, c_message_id, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }

    TIMMsgFindMessages(json_advance_message_param: [string], user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_advance_message_param));
        const userData = this.stringFormator(user_data);
    
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(json_params === "[]") 
                    reject(this.getErrorResponse({ code, desc: "message is not found" }))
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMMsgFindMessages(params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }

    TIMMsgReportReaded(conv_id: string, conv_type: number, message_id: string, user_data: string) :Promise<any> {
        const c_user_data = this.stringFormator(user_data);
        const c_conv_id = this.stringFormator(conv_id);
    
        return this.TIMMsgFindMessages([message_id], user_data).then(res => {
            return new Promise((resolve, reject) => {
                const json_msg_param_array = res.json_params
                const json_msg_param = JSON.stringify(JSON.parse(json_msg_param_array)[0])
                const c_json_msg_param = this.stringFormator(json_msg_param)
                const code = this._sdkconfig.Imsdklib.TIMMsgReportReaded(c_conv_id, conv_type, c_json_msg_param, jsFuncToFFIFun((code, desc, json_params, user_data) => {
                    if(code === 0) {
                        resolve({ code, desc, json_params, user_data })
                    }
                    else
                        reject(this.getErrorResponse({ code, desc }))
                }), c_user_data)

                code !== 0 && reject(this.getErrorResponse({ code }))
            })
        })
    }

    TIMMsgRevoke(conv_id: string, conv_type: number, message_id: string, user_data: string) :Promise<any> {
        const c_user_data = this.stringFormator(user_data);
        const c_conv_id = this.stringFormator(conv_id);

        return this.TIMMsgFindMessages([message_id], user_data).then(res => {
            return new Promise((resolve, reject) => {
                const json_msg_param_array = res.json_params
                const json_msg_param = JSON.stringify(JSON.parse(json_msg_param_array)[0])
                const c_json_msg_param = this.stringFormator(json_msg_param)
                const code = this._sdkconfig.Imsdklib.TIMMsgRevoke(c_conv_id, conv_type, c_json_msg_param, jsFuncToFFIFun((code, desc, json_params, user_data) => {
                    if(code === 0) {
                        resolve({ code, desc, json_params, user_data })
                    }
                    else
                        reject(this.getErrorResponse({ code, desc }))
                }), c_user_data)

                code !== 0 && reject(this.getErrorResponse({ code }))
            })
        })
    }
    
    TIMMsgFindByMsgLocatorList(conv_id: string, conv_type: number,json_advance_message_param: Json_advance_message_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_advance_message_param));
        const userData = this.stringFormator(user_data);
        const c_conv_id = this.stringFormator(conv_id);
        
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMMsgFindByMsgLocatorList(c_conv_id, conv_type, params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    
    TIMMsgImportMsgList(conv_id: string, conv_type: number,json_advance_message_param: Json_advance_message_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_advance_message_param));
        const userData = this.stringFormator(user_data);
        const c_conv_id = this.stringFormator(conv_id);
        
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMMsgImportMsgList(c_conv_id, conv_type, params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    
    TIMMsgSaveMsg(conv_id: string, conv_type: number,json_advance_message_param: Json_advance_message_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_advance_message_param));
        const userData = this.stringFormator(user_data);
        const c_conv_id = this.stringFormator(conv_id);
        
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMMsgSaveMsg(c_conv_id, conv_type, params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    
    TIMMsgGetMsgList(conv_id: string, conv_type: number,json_advance_message_param: Json_advance_message_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_advance_message_param));
        const userData = this.stringFormator(user_data);
        const c_conv_id = this.stringFormator(conv_id);
        
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMMsgGetMsgList(c_conv_id, conv_type, params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    
    TIMMsgDelete(conv_id: string, conv_type: number,json_advance_message_param: Json_advance_message_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_advance_message_param));
        const userData = this.stringFormator(user_data);
        const c_conv_id = this.stringFormator(conv_id);
        
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMMsgDelete(c_conv_id, conv_type, params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    
    TIMMsgListDelete(conv_id: string, conv_type: number,json_advance_message_param: Json_advance_message_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_advance_message_param));
        const userData = this.stringFormator(user_data);
        const c_conv_id = this.stringFormator(conv_id);
        
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMMsgListDelete(c_conv_id, conv_type, params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    
    TIMMsgClearHistoryMessage(conv_id: string, conv_type: number,json_advance_message_param: Json_advance_message_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_advance_message_param));
        const userData = this.stringFormator(user_data);
        const c_conv_id = this.stringFormator(conv_id);
        
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMMsgClearHistoryMessage(c_conv_id, conv_type, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    
    TIMMsgSetC2CReceiveMessageOpt(json_advance_message_param: Json_advance_message_param, opt: number, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_advance_message_param));
        const userData = this.stringFormator(user_data);
        
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMMsgSetC2CReceiveMessageOpt(params, opt, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    
    TIMMsgGetC2CReceiveMessageOpt(json_advance_message_param: Json_advance_message_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_advance_message_param));
        const userData = this.stringFormator(user_data);
        
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMMsgGetC2CReceiveMessageOpt(params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    
    TIMMsgSetGroupReceiveMessageOpt(group_id: string, opt: number, user_data: string) :Promise<any> {
        const userData = this.stringFormator(user_data);
        const c_group_id = this.stringFormator(group_id);
        
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMMsgSetGroupReceiveMessageOpt(c_group_id, opt, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    
    TIMMsgDownloadElemToPath(json_advance_message_param: Json_advance_message_param, path: string, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_advance_message_param));
        const userData = this.stringFormator(user_data);
        const c_path = this.stringFormator(path);
        
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMMsgDownloadElemToPath(params, c_path, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    
    TIMMsgDownloadMergerMessage(json_advance_message_param: Json_advance_message_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_advance_message_param));
        const userData = this.stringFormator(user_data);
        
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMMsgDownloadMergerMessage(params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    
    TIMMsgBatchSend(json_advance_message_param: Json_advance_message_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_advance_message_param));
        const userData = this.stringFormator(user_data);
        
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMMsgBatchSend(params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
    
    TIMMsgSearchLocalMessages(json_advance_message_param: Json_advance_message_param, user_data: string) :Promise<any> {
        const params = this.stringFormator(JSON.stringify(json_advance_message_param));
        const userData = this.stringFormator(user_data);
        
        return new Promise((resolve, reject) => {
            const callback = jsFuncToFFIFun((code, desc, json_params, user_data) => {
                if(code === 0) 
                    resolve({ code, desc, json_params, user_data })
                else
                    reject(this.getErrorResponse({ code, desc }))
            })
            const code = this._sdkconfig.Imsdklib.TIMMsgSearchLocalMessages(params, callback, userData)
            
            code !== 0 && reject(this.getErrorResponse({ code }))
        })
    }
}
export default AdvanceMessageManage;