import { TimRender } from "../../../im_electron_sdk/dist/timRender.umd";
const timRenderInstance = new TimRender();
const TimBaseManager = {
    TIMInit:()=>{
        return timRenderInstance.init();
    },
    TIMLogin:()=>{
        return timRenderInstance.login({
            userID: "3708",
            userSig: "eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwsbmBhZQ8eKU7MSCgswUJStDEwMDQwtzY1MjiExqRUFmUSpQ3NTU1MjAwAAiWpKZCxIzMzKxNDU3NjGDmpKZDjQ2LKnAz6Q0J9s3LdQsSrvA28kvKinY1LvIOdE9yDk13DEp0SIi2zWtND*53FapFgB-kjCC",
            userData: "xingchenhe-test"
        })
    }
}

export default TimBaseManager;