// pages/login/login.js
let app = getApp();
// 获取数据库引用
const db = wx.cloud.database();
const userListDB = db.collection('userlist');

let name = null;
let password = null;
Page({

 data: {
 },

 //输入用户名
 inputName(event) {
  console.log(event.detail.value)
  name = event.detail.value;
 },
 //输入密码
 inputPassword(event) {
  password = event.detail.value;
 },
 //登陆
 login() {
  let that = this;
  if (!app.checkNamePassword(name, password)) {
   return;
  }
  //登陆获取用户信息
  userListDB.where({
   _openid: app.globalData.openid
  }).get({
   success: function(res) {
    let userInfos = res.data;
    console.log(res.data)
    if (userInfos && userInfos.length > 0) {
     let user = userInfos[0];
     if (user.name !== name) {
      app.showTips('用户名不匹配');
     } else if (user.password !== password) {
      app.showTips('密码不匹配');
     } else {
      app.showTips('登陆成功');
      let jsonStr=JSON.stringify(user);
      wx.navigateTo({
       url: '../index/index?jsonStr=' + jsonStr,
      })
     }
    } else {
     app.showTips('用户不存在');
    }
   }
  })
 },
 register() {
  wx.navigateTo({
   url: '../register/register',
  })
 },
 


})