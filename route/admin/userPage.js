//获取数据库中用户的信息
const { User } = require("../../model/user");

module.exports = async (req, res) => {
  //公共信息 标识当前访问的是用户管理页面
  req.app.locals.currentLink = "user";

  //接收客户端传递过来的当前页参数
  let page = req.query.page || 1;
  //每一页显示的数据条数
  let pagesize = 2;
  //查询数据总数
  let count = await User.countDocuments({});
  //总页数
  let total = Math.ceil(count / pagesize);
  //页码对应的开始页
  let start = (page - 1) * pagesize;

  const result = await User.find({}).limit(pagesize).skip(start);
  res.render("admin/user", {
    users: result,
    page: page,
    total: total,
    count,
  });
};
