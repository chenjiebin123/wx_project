// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 导航栏假数据
    navList: [{
        src: "/assets/zhishixingqiu.png",
        text: "知识星球",
        url: "/pages/xingqiu/xingqiu",
        id: 0
      },
      {
        src: "/assets/haibao.png",
        text: "分享海报",
        url: "/pages/special/special",
        id: 1
      },
      {
        src: "/assets/kefu.png",
        text: "咨询客服",
        url: "/pages/person/person",
        id: 2
      },
    ],
    login_falge: false,
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  tobar(e) {
    let id = e.currentTarget.dataset.id;
    let url = this.data.navList[id].url;
    // console.log(url);
    if (this.data.navList[id].text != '知识星球') {
      wx.switchTab({
        url: url,
      })
    } else {
      wx.navigateTo({
        url: url,
      })
    }
  },
  clear() {
    wx.clearStorageSync();
    wx.showToast({
      title: '清除成功',
      icon: 'success',
      duration: 2000 //持续的时间
    })
  },
  // 获取用户信息
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        // console.log(res);
        wx.setStorageSync('userxx', res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  // 获取用户信息
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 退出登录
  exit(){
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: function (res) {
          if (res.confirm) { //这里是点击了确定以后
            wx.removeStorageSync('userxx');
              that.setData({
                userInfo:{},
                hasUserInfo: false
              });
              // wx.switchTab({
              //   url: '/pages/person/person'
              // })
          } else { //这里是点击了取消以后
              return ;
          }
      }
  })
  },
  onLoad: function (options) {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    let userxx = wx.getStorageSync('userxx');
    if(userxx){
      // console.log(1);
      this.setData({
        userInfo: userxx,
        hasUserInfo: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})