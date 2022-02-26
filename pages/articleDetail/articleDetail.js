// pages/articleDetail/articleDetail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        top_falg:false,
        articleData:[], // 文章详情数据
        articleList:[], //文章列表
        listId:"", 
        imgArr:[] //图片数组
    },
    // 返回上一页
    returnBack(){
        wx.navigateBack({
            delta:1
        });
        // wx.navigationStyle
       
    },
    // 盒子滚动事件
    boxscroll(event){
        // console.log(event);
        let that = this;
        let box = wx.createSelectorQuery();
        let text = box.select(".content").boundingClientRect(function (rect) {
            // console.log(rect.top);
            if(rect.top<60){
                that.setData({
                    top_falg:true
                })
            }
            else{
                that.setData({
                    top_falg:false
                })
            }
          }).exec();
    },
    // 获取文章详情
    getArticleDetail(id){
        let that = this;
        console.log(id);
        wx.cloud.callFunction({
            name:"getArticleDetail",
            data:{id},
            success:(res)=>{
                if(res.errMsg=="cloud.callFunction:ok"){
                    console.log(res);
                    let arr = res.result.data[0].list_content;
                    console.log(arr);
                    if(res.result.errMsg=="collection.get:ok"){
                        that.setData({
                            articleData:res.result.data[0]
                        });
                        arr.forEach(item => {
                            if(item.neirongtype=="image"){
                                that.data.imgArr.push(item.url)
                            }
                        });
                    }
                    
                    // console.log(that.data.imgArr);
                }
                // console.log(this.data.articleData);
            },
            fail:(err)=>{
                console.log("失败");
            }
        });
        
    },
    // 获取相关文章
    getArticleList(id){
        let that = this;
        wx.cloud.callFunction({
            name:"getArticleList",
            data:{id},
            success:(res)=>{
                if(res.errMsg=="cloud.callFunction:ok"){
                    // console.log(res);
                   if(res.result.errMsg=="collection.get:ok"){
                    that.setData({
                        articleList:res.result.data[0].articleList
                    });
                   }
                }
            //  console.log(this.data.articleList);
            },
            fail:(err)=>{
                console.log("失败");
            }
        })
    },
    // 浏览所有图片
    lookimg(event){
        // console.log(event);
        let str = event.target.dataset.imgstr
        wx.previewImage({
            current:str,
              urls: this.data.imgArr,
            })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    // console.log(options);
        // console.log(options.id,options.listId);
        // 列表页传递过来的列表Id
        this.setData({
            listId:options.listId
        })
        // 调用函数
        this.getArticleDetail(options.id);
        this.getArticleList(options.listId);
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