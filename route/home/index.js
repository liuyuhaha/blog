const { Article } = require("../../model/article");

module.exports = async (req, res) => {
  //公共信息标识
  req.app.locals.HomeLink = "index";

  //接受客户端传递过来的当前页参数
  let page = req.query.page;
  //每一页显示的数据条数
  let pagesize = 4;
  //查询总数据条数
  let count = await Article.countDocuments({});
  //总页数
  let total = Math.ceil(count / pagesize);
  //分页功能数据查询
  //  数据开始查询位置 （当前页-1）*每页显示数据条数
  const result = await Article.find()
    .limit(pagesize)
    .skip((page - 1) * pagesize)
    .populate("author");

  

  res.render("home/default", {
    data: result,
    page: page,
    total: total,
    count,
  });
};
