const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//引入joi模块
// const Joi = require("joi");

//创建文章集合规则
// const Article=mongoose.model('Article',new mongoose.Schema({}))
// const Article=mongoose.model('Article',集合规则名称) 创建集合
// const 集合规则名称=new mongoose.Schema({}) 创建集合规则

const Article = mongoose.model(
  "Article",
  new mongoose.Schema({
    title: {
      type: String,
      required: [true, "请填写文章标题"],
      maxlength: 20,
      minlength: 4,
    },
    author: {
      // 使用id对集合进行关联，以下为id固定写法
      type: mongoose.Schema.Types.ObjectId,
      //    关联集合的名称 User
      ref: "User",
      required: [true, "请传递作者"],
    },
    publishDate: {
      type: Date,
      //默认值，文章的发布时间可自动填写
      default: Date.now,
    },
    // 文章封面
    cover: {
      type: String,
      default: null,
    },
    content: {
      type: String,
    },
  })
);

// //验证文章信息
// const validateArticle = (article) => {
//   const schema = {
//     title: Joi.string()
//       .minlength(4)
//       .maxlength(20)
//       .require()
//       .error(new Error("标题不符合验证规则")),
//   };
//   //实施验证
//   return Joi.validate(article, schema);
// };

//将集合规则作为模块成员进行导出
module.exports = {
  Article,
};
