//app.js
App({
 onLaunch: function() {
  //云开发初始化
  wx.cloud.init({
    env: 'prod-8aa9a5',
    traceUser: true
   }),
   this.getOpenid();
 },
 globalData: {
  openid: null,
  userInfo: null
 },
 // 获取用户openid
 getOpenid() {
  let app = this;
  wx.cloud.callFunction({
   name: 'getOpenid',
   complete: res => {
    console.log('云函数获取到的openid: ', res.result.openId)
    var openid = res.result.openId;
    app.globalData.openid = openid;
   }
  })
 },
 //校验用户名和密码
 checkNamePassword(name, password) {
  if (name === null || name === undefined || name === '') {
   this.showTips('用户名不能为空');
   return false;
  } else if (password === null || password === undefined || password === '') {
   this.showTips('密码不能为空');
   return false;
  } else if (password.length < 6) {
   this.showTips('密码要大于6位');
   return false;
  }
  return true;
 },
 checkPhoneAddress(phone, address) {
  if (phone === null || phone === undefined || phone === '') {
   this.showTips('电话不能为空');
   return false;
  } else if (phone.length !== 11) {
   this.showTips('电话要11位');
   return false;
  } else if (address === null || address === undefined || address === '') {
   this.showTips('地址不能为空');
   return false;
  } else if (address.length < 6) {
   this.showTips('地址要大于6位');
   return false;
  }
  return true;
 },

 showTips(msg) {
  wx.showToast({
   icon: 'loading',
   title: msg,
  })
 }
})