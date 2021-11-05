import ajax from "./ajax";
import jsonp from 'jsonp'
import { message } from "antd";

const BASE = ''
export const reqLogin = (username,password)=> ajax(BASE+'/login',{username,password},'POST')
export const reqAddUser = (user)=> ajax(BASE+'/manage/user/add',user,'POST')

export const reqCity = () =>{
    return new Promise((resolve,reject)=>{
            const url = `https://restapi.amap.com/v3/ip?key=2cd9b7e1e586c66c3b98e07f887ed382`
            jsonp(url,{},(err,data)=>{
                if(!err&&data.status==='1'){
                    const cityAdcode = data.adcode
                    resolve(cityAdcode)
                }else{
                    message.error('获取IP信息失败')
                
            }
    })
    })

}
 
export const reqWeather = () =>{
    return new Promise((resolve,reject)=>{
        reqCity().then(cityAdcode =>{
            const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=2cd9b7e1e586c66c3b98e07f887ed382&output=JSON&city=${cityAdcode}`
            jsonp(url,{},(err,data)=>{
                if(!err&&data.status==='1'){
                    const weather = data.lives[0].weather
                    resolve(weather)
                    console.log(url,weather);
                }else{
                    message.error('获取天气信息失败')
            }
    })
    })})
}