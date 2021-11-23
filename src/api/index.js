import ajax from "./ajax";
import jsonp from "jsonp";
import { message } from "antd";

const BASE = "";
export const reqLogin = (username, password) =>
  ajax(BASE + "/login", { username, password }, "POST");
export const reqAddUser = (user) =>
  ajax(BASE + "/manage/user/add", user, "POST");

//获取分类的列表
export const reqCategorys = (parentId) =>
  ajax(BASE + "/manage/category/list", { parentId });
//添加分类
export const reqAddCategory = (parentId, categoryName) =>
  ajax(BASE + "/manage/category/add", { parentId, categoryName }, "POST");
//更新分类
export const reqUpdateCategory = (categoryId, categoryName) =>
  ajax(BASE + "/manage/category/update", { categoryId, categoryName }, "POST");
//获取商品分类列表
export const reqProducts = (pageNum, pageSize) =>
  ajax(BASE + "/manage/product/list", { pageNum, pageSize });
//搜索商品分页列表
export const reqSearchProducts = ({
  pageNum,
  pageSize,
  searchName,
  searchType,
}) =>
  ajax(BASE + "/manage/product/search", {
    pageNum,
    pageSize,
    [searchType]: searchName,
  });
//获取一个分类
export const reqCategory = (categoryId) =>
  ajax(BASE + "/manage/category/info", { categoryId });
//更新商品的状态，上下架！
export const reqUpdateStatus = (productId, status) =>
  ajax(BASE + "/manage/product/updateStatus", { productId, status }, "POST");
//删除图片
export const reqDeleteImg = (name) =>
  ajax(BASE + "/manage/img/delete", { name }, "POST");
//添加/修改商品
export const reqAddOrUpdateProduct = (product) =>
  ajax(
    BASE + "/manage/product/" + (product._id ? "update" : "add"),
    product,
    "POST"
  );
//修改商品
//export const reqUpdateProduct = (product) => ajax(BASE+"/manage/product/update",product,'POST')
//获取所有角色的列表
export const reqRoles = () => ajax (BASE+"/manage/role/list")
//添加角色
export const reqAddRole = (roleName) => ajax (BASE+"/manage/role/add",{roleName},"POST")

export const reqCity = () => {
  return new Promise((resolve, reject) => {
    const url = `https://restapi.amap.com/v3/ip?key=2cd9b7e1e586c66c3b98e07f887ed382`;
    jsonp(url, {}, (err, data) => {
      if (!err && data.status === "1") {
        const cityAdcode = data.adcode;
        resolve(cityAdcode);
      } else {
        message.error("获取IP信息失败");
      }
    });
  });
};

export const reqWeather = () => {
  return new Promise((resolve, reject) => {
    reqCity().then((cityAdcode) => {
      const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=2cd9b7e1e586c66c3b98e07f887ed382&output=JSON&city=${cityAdcode}`;
      jsonp(url, {}, (err, data) => {
        if (!err && data.status === "1") {
          const weather = data.lives[0].weather;
          resolve(weather);
          console.log(url, weather);
        } else {
          message.error("获取天气信息失败");
        }
      });
    });
  });
};
