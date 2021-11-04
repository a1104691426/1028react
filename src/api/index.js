import ajax from "./ajax";
import jsonp from 'jsonp'
import { message } from "antd";

const BASE = ''
export const reqLogin = (username,password)=> ajax(BASE+'/login',{username,password},'POST')
export const reqAddUser = (user)=> ajax(BASE+'/manage/user/add',user,'POST')
export const reqWeather = () =>{
    return new Promise((resolve,reject)=>{
            const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=2cd9b7e1e586c66c3b98e07f887ed382&output=JSON&city=430400`
            jsonp(url,{},(err,data)=>{
                if(!err&&data.status==='1'){
                    const weather = data.lives[0].weather
                    resolve(weather)
                }else{
                    message.error('获取天气信息失败')
            }
    })
    })
}