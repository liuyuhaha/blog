const { Article } = require("../../model/article");
const { Comment } = require("../../model/comment");

module.exports = async (req, res) => {
  //公共信息标识
  req.app.locals.HomeLink = "article";

  //获取req.id参数
  const { id } = req.query;
  //根据文章id查询数据
  let artOne = await Article.findOne({ _id: id }).populate("author");

  //根据文章id查询当前文章多对应的评论信息
  let comments = await Comment.find({ aid: id }).populate("uid");
  // res.send(comments);
  // return;

  res.render("home/article", { artOne, comments });
};
