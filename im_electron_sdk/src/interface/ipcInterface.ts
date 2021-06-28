
enum Managers {
    timBaseManager='timBaseManager',
    advanceMessageManager = 'advanceMessageManager',
    conversationManager = 'conversationManager',
    friendshipManager = 'friendshipManager',
    groupManager = 'groupManager'
}
interface ipcData<T> {
    method:string,
    param?:T,
    manager:Managers,
    callback?:string
}
interface mainRes  {
    callback:Symbol,
    data:any,
}
interface ipcRenderData {
    
}
export { 
    ipcData,
    mainRes
}