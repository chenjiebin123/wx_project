let db = wx.cloud.database(
  {
      env:"cloud1-5ghf2j7234112f04"
  }
);
// 轮播图数据库表
let bannerList = db.collection("bannerList");



Page({
  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    bannerArr: [],
    //最新文章数组
    newArticle:[],
    // 导航栏假数据
    navList: [{
        src: "/assets/nav-search.png",
        text: "搜索",
        url:"/pages/find/find",
        id: 0
      },
      {
        src: "/assets/nav-classify.png",
        text: "分类",
        url:"/pages/special/special",
        id: 1
      },
      {
        src: "/assets/nav-xingqiu.png",
        text: "星球",
        url:"/pages/xingqiu/xingqiu",
        id: 2
      },
      {
        src: "/assets/nav-person.png",
        text: "我的",
        url:"/pages/person/person",
        id: 3
      },
    ],
    //走马灯假数据
    ts_text: " 富强、民义、文明、和谐，自由、平等、公正、法治，爱国、敬业、诚信、友善",
    //
    flag: true,
    // 走马灯文字盒子长度
    textWidth: 0,
    // 走马灯文字盒子的初始位置
    move:10,
    // 定时器
    time: null,
    // 动画效果
    tran_flag:"transform: translate(-0px);"
  },
  // 执行走马灯
  zmd() {
    let box = wx.createSelectorQuery();
    let that = this;
    // console.log(box);
    let text = box.select(".textMove-text").boundingClientRect(function (rect) {
      let textWidth = rect.width;
      let move =that.data.move;
      let tran_flag = that.data.tran_flag;
      // console.log(move);
        if(Math.abs(move) >textWidth+1&&move<0){
          move=220;
         
          tran_flag=`transform: translate(${move}px);transition:none;`;
          that.setData({
           move:move,
           tran_flag:tran_flag
         })
         }
         else{
           move-=1;
           tran_flag=`transform: translate(${move}px);`;
           that.setData({
             move:move,
             tran_flag:tran_flag
           })
         }
    }).exec();
  },
  // 开始走马灯
  startzmd() {
    let that = this;
    that.stopzmd();
    that.data.time = setInterval(function () {
      that.zmd()
    }, 25)
  },
  // 暂停走马灯（清除定时器）
  stopzmd() {
    let that = this;
    if (that.data.time != null) {
      
      clearInterval(that.data.time);
    }
  },
  // 导航栏跳转
  tobar(e){
    let id = e.currentTarget.dataset.id;
    let url = this.data.navList[id].url;
    // console.log(url);
   if(this.data.navList[id].text != '星球'){
    wx.switchTab({
      url: url,
    })
   }
   else{
     wx.navigateTo({
       url: url,
     })
   }
  },
  // 跳转分类页面
  toSpecial(){
    wx.switchTab({
      url: '/pages/special/special',
    })
  },
  // 获取轮播图数据
  getbanner(){
    let that = this;
    let banners = wx.getStorageSync('banners');
    // console.log(banners);
   if(banners!=""){
    that.setData({
      bannerArr:banners
    })
   }
   else{
    bannerList.get()
    .then(
      res =>{
        if(res.errMsg=="collection.get:ok"){
          let arr = res.data;
          that.setData({
            bannerArr:arr
          });
          wx.setStorageSync('banners', arr);
        }
      },
      err =>{

      }
    )
   }
  },
  getNewArticle(hot){
    let that = this;
    wx.cloud.callFunction({
      name:"getNewArticle",
      data:{hot},
      success:res=>{
        // console.log(res);
        if(res.errMsg=="cloud.callFunction:ok") {
          if(res.result.errMsg=="collection.get:ok"){
            that.setData({
              newArticle:res.result.data
            })
          }
        }
      },
      fail:err=>{
        console.log("失败");
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.getbanner();
  this.getNewArticle(true);
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
    this.startzmd()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.time);
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