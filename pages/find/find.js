// pages/find/find.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        show: true,
        clear_flag: false,
        cont: "",
        findArr: [],
        findHistory: []
    },
    // 判断输入框是否有值
    inputCont() {
        if (this.data.cont != "") {
            // console.log(this.data.cont);
            this.setData({
                clear_flag: true
            })
        } else {
            this.setData({
                clear_flag: false
            })
        }
    },
    // 按回车搜索
    enter() {
        let cont = this.data.cont;
        let that = this;
        wx.cloud.callFunction({
            name: "findArticle",
            data: {
                cont
            },
            success: (res) => {
                if (res.errMsg == "cloud.callFunction:ok") {
                    // console.log(res);
                    if (res.result.errMsg == "collection.get:ok") {
                        that.data.findHistory.unshift(cont);
                        wx.setStorageSync('findHistory', that.data.findHistory)
                        that.setData({
                            findArr: res.result.data,
                            cont: ''
                        });
                    }
                }
                let finddata = that.data.findArr;
                // 把返回来的数据存储到本地
                wx.setStorageSync('finddata', finddata)
                // 跳转到列表页
                wx.navigateTo({
                    url: `/pages/articleList/articleList`,
                })
            },
            fail: (err) => {
                console.log("失败");
            }
        })
    },
    // 取消按钮，隐藏输入框
    hideSearch() {
        this.setData({
            show: true,
            cont: ""
        })
    },
    // 点击原始输入框，显示'输入框'和'取消按钮'
    showSearch() {
        this.setData({
            show: false
        })
    },
    // 清除输入框
    clearInput() {
        this.setData({
            cont: "",
            clear_flag: false
        })
    },
    // 清除搜索历史记录
    clearHistory() {
        let that = this;
        wx.showModal({
            title: '提示',
            content: '确定要清空吗？',
            success: function (res) {
                if (res.confirm) { //这里是点击了确定以后
                    wx.removeStorageSync('findHistory');
                    that.setData({
                        findHistory: []
                    })
                } else { //这里是点击了取消以后
                    return ;
                }
            }
        })
    },
    // 点击历史记录搜索
    tofind(event){
        let text = event.target.dataset.text;
        // console.log(text);
        this.setData({
            cont:text
        });
        this.enter()

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 记录本地存储的历史记录

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
        let historyArr = wx.getStorageSync('findHistory');
        let a= new Set(historyArr);
        let arr=[...a];
        if (historyArr) {
            this.setData({
                findHistory: arr
            })
        }
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