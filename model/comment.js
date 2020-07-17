const mongoose = require("mongoose");

//创建集合与规则
const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    //关联文章id
    aid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Article",
    },
    //关联用户id
    uid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    //评论发布时间
    time: {
      type: Date,
      default: Date.now,
    },
    //评论发布内容
    content: {
      type: String,
    },
  })
);

//评论集合构造函数作为模块成员进行导出
module.exports = {
  Comment,
};
