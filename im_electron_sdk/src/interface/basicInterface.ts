
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
    Imsdklib: libMethods
}

export {
    initConfig,
    sdkconfig,
    CommonCallbackFun,
}