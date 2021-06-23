
import { libMethods } from "./libMethodInterface"

interface CommonCallbackFun {
    (code: number, desc: string, json_param: string, user_data: string): void;
}

interface initConfig {
    sdkappid: number,
}

interface sdkconfig {
    sdkappid: number,
    consoleTag: string,
    Imsdklib: libMethods,

}
interface commonResponse {
    code: number,
    desc?: string,
    json_param?: string,
    user_data?: string
}
export {
    initConfig,
    sdkconfig,
    CommonCallbackFun,
    commonResponse
}