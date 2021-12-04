//reducer函数模块：根据当前的state和指定的action返回一个新的state

//管理count状态数据的reducer
import { INCREMENT , DECREMENT } from "./action_types"
export default function count(state=0,action){
    switch(action.type){
        case INCREMENT:
            return state + action.number
        case DECREMENT:
            return state -action.number
        default:
            return state
    }
    
}