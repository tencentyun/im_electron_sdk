import { ipcRenderer } from "electron";

export const callMethodWithChannel = (channel: string) => (eventName: string, args: {}) => {
    ipcRenderer.send("call-method", {
        channel,
        eventName,
        args
    })
}

export const callGroupManager = callMethodWithChannel('groupManager');

export const callBaseManager = callMethodWithChannel('baseManager');