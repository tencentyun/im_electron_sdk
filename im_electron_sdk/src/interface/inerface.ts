interface TIMInitFun {
    (sdkappid:number,sdkconfig:Buffer): number;
}

interface initConfig {
    sdkappid:number,
}
interface sdkconfig {
    sdkappid:number,
    consoleTag:string,
    Imsdklib:libMethods
}
interface libMethods {
    TIMInit:TIMInitFun
}
export {
    initConfig,
    sdkconfig,
    libMethods
}