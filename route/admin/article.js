const { Article } = require("../../model/article");
//分页功能 导入mongoose-sex-page模块
const pagination = require("mongoose-sex-page");

module.exports = async (req, res) => {
  //公共信息 标识当前访问的是文章管理页面
  req.app.locals.currentLink = "article";

  //接收传递页码数据
  const page = req.query.page;

  //查询所有文章数据 指定分页条件
  //这个articles不再是之前查询出来的array 而是对象
  const articles = await pagination(Article)
    .find()
    .page(page) //指定当前页
    .size(2) //指定每页显示数据条数
    .display(3) //指定客户端要显示的页码数量
    .populate("author")
    .exec(); //向数据库中发送查询请求

  // res.send(articles);
  // return;

  res.render("admin/article", {
    articles,
  });
};
