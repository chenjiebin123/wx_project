// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init(
    {
        env:"cloud1-5ghf2j7234112f04"
    }
)

let db = cloud.database(
    {
        env:"cloud1-5ghf2j7234112f04"
    }
  );
  // 轮播图数据库表
  let classifyList = db.collection("classifyList");




// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    return new Promise((res,rej)=>{
        classifyList.get().then(
            success=>{
                res(success)
            },
            fail=>{}
        )
    })
}