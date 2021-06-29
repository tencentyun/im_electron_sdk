import TimBaseManager from "./manager/timBaseManager";

const APIS =  [
    {
        manager:"timBaseManager",
        method:[
            {
                name:"init",
                action:(callback)=>{
                    TimBaseManager.TIMInit().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            },
            {
                name:"login",
                action:(callback)=>{
                    TimBaseManager.TIMLogin().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            }
        ]
    },
    {
        manager:"groupManager",
        method:[
            {
                name:"createGroup",
                action:(callback)=>{
                    TimBaseManager.TIMLogin().then(data=>{
                        callback(JSON.stringify(data))
                    }).catch(err=>{
                        callback(err.toString())
                    })
                }
            }
        ]
    },
]
export default APIS;