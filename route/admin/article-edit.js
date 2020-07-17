const { Article } = require("../../model/article");

module.exports = async (req, res) => {
  //公共信息 标识当前访问的是文章管理页面
  req.app.locals.currentLink = "article";

  const { message, id } = req.query;
  //判断添加文章和修改表单
  if (id) {
    //修改表单
    //  根据id获取相应的数据
    let articles = await Article.findOne({ _id: id });
    res.render("admin/article-edit", {
      articles,
      id,
      link: `/admin/article-modify?id=${id}`,
      button: "修改",
      msg: message,
    });
  } else {
    //添加文章
    res.render("admin/article-edit", {
      link: `/admin/article-add`,
      button: "提交",
      msg: message,
    });
  }
};
