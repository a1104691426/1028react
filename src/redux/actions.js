/*
包含N个用来创建action的工厂函数(action creator)
*/
import { INCREMENT , DECREMENT } from "./action_types"

export const increment = number => ({type: INCREMENT,number: number,})//增加的action
export const decrement = number => ({type: DECREMENT,number: number,})//减少的action
