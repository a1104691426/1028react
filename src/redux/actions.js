//设置头部标题的同步action
import {SET_HEAD_TITLE} from  './action_types'
export const setHeadTitle = (headTitle) => ({type: SET_HEAD_TITLE , data: headTitle})