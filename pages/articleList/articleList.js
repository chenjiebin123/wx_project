// pages/articleList/articleList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        articleList:[],
        listId:""
    },
    // 请求文章列表
    getArticleList(id){
        let that = this;
        wx.cloud.callFunction({
            name:"getArticleList",
            data:{id},
            success:(res)=>{
                if(res.errMsg=="cloud.callFunction:ok"){
                    console.log(res);
                   if(res.result.errMsg=="collection.get:ok"){
                    that.setData({
                        articleList:res.result.data[0].articleList
                    });
                   }
                }
             console.log(this.data.articleList);
            },
            fail:(err)=>{
                console.log("失败");
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options);
        // 如果是列表页跳转过来就走这里
        if(options.id){
            this.setData({
                listId:options.id
            })
            this.getArticleList(options.id);
        }
        // 如果是搜索跳转过来的就走这里
        else {
            let find = wx.getStorageSync('finddata');
            console.log(find);
            this.setData({
                articleList:find
            })
        }
        // console.log(options.id);
        
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