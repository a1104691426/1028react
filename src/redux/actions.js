//设置头部标题的同步action
import {reqLogin} from '../api'
import storageUtils from '../utils/storageUtils'
import {SET_HEAD_TITLE,RECEIVE_USER,SHOW_ERROR_MSG,RESET_USER} from  './action_types'

export const setHeadTitle = (headTitle) => ({type: SET_HEAD_TITLE , data: headTitle})
export const receiveUser = (user) => ({type:RECEIVE_USER, user})
export const showErrorMsg = (errorMsg) => ({type:SHOW_ERROR_MSG, errorMsg})
//退出登录
export const logout = () => {
    //删除local中的user
    storageUtils.removeUser()
    //返回action对象
    return {type:RESET_USER}
}

//实现登录异步action
export const login = (username,password) => {
    return async dispatch => {
        const result = await reqLogin(username,password)
        if(result.status===0){
            const user = result.data
            //保存local中
            storageUtils.saveUser(user)
            //分发接收用户的同步action
            dispatch(receiveUser(user))
        } else {
            const msg = result.msg
            dispatch(showErrorMsg(msg))
        }
    }
}