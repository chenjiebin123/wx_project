Page({

    /**
     * 页面的初始数据
     */
    data: {
        classifyList:[]
    },
    // 获取分类列表
    getclassifyList(){
        let that = this;
        let classifyList = wx.getStorageSync('classifyList')
       if(classifyList!=""){
        //    console.log(1);
        //    console.log(classifyList);
            that.setData({
                classifyList:classifyList
            })
       }else{
        wx.cloud.callFunction({
            name:"getClassifyList",
            success:(res)=>{
                if(res.errMsg=="cloud.callFunction:ok"){
                    that.setData({
                     classifyList:res.result.data
                    });
                    wx.setStorageSync('classifyList', res.result.data)
                }
            //  console.log(res);
            },
            fail:(err)=>{
                console.log("失败");
            }
        })
       }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      
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
        this.getclassifyList()
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