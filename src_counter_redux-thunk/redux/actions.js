/*
包含N个用来创建action的工厂函数(action creator)
*/
import { INCREMENT , DECREMENT } from "./action_types"

export const increment = number => ({type: INCREMENT,number: number,})//增加的action
export const decrement = number => ({type: DECREMENT,number: number,})//减少的action
export const incrementAsync = number => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(increment(number))
        },1000)
    }
} //异步增加action,返回的是函数,在里面执行异步代码(定时器，ajax请求，promise函数)
