//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
  },
  
  onLoad: function (options) {
   console.log({ options})
   let user=JSON.parse(options.jsonStr);
   console.log({ user });
   if (user){
    this.setData({
     userInfo: user
    })

   }
  },
 
})
