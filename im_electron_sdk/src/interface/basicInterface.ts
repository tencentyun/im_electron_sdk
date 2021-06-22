
import { libMethods } from "./libMethodInterface"

interface CommonCallbackFun {
    (code: number, desc: String, json_param: String, user_data: String): void;
}

interface initConfig {
    sdkappid: number,
}

interface sdkconfig {
    sdkappid: number,
    consoleTag: string,
    Imsdklib: libMethods,

}

export {
    initConfig,
    sdkconfig,
    CommonCallbackFun,
}