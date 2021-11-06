import axios from "axios";
import { message } from "antd";
export default function ajax(url, data = {}, type = "GET") {
  //统一处理请求异常
  //在外层包一个自己创建的promise对象
  //在请求出错时，不reject(error),而是显示错误提示
  return new Promise((resolve, reject) => {
    let promise;
    //1.执行异步ajax请求

    if (type === "GET") {
      promise = axios.get(url, {
        params: data,
      });
    } else {
      promise = axios.post(url, data);
    }
    //2.如果成功了，调用resolve(value)
    promise
      .then((response) => {
        resolve(response.data);
        //3.如果失败了,不调用reject（reason）,而是提示异常信息
      })
      .catch((error) => {
        message.error("请求出错了:" + error.message);
      });
  });
}

// ajax('/login',{username:'Tom',password:'12345'},'POST').then()
// ajax('/manage/user/add',{username:'Tom',password:'12345',phone:'17607397199'},'POST').then()
