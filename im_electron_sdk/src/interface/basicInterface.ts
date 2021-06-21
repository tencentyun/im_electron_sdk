
import { libMethods } from "./libMethodInterface"

interface CommonCallbackFun {
    (code: number, desc: Buffer, json_data: Buffer, data: Buffer): void;
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