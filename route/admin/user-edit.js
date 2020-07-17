//获取数据库中用户的信息
const { User } = require("../../model/user");

module.exports = async (req, res) => {
  //公共信息 标识当前访问的是用户管理页面
  req.app.locals.currentLink = "user";

  //获取地址栏中的id参数
  const { message, id } = req.query;

  //如果当前传递了id参数
  if (id) {
    //修改操作
    let user = await User.findOne({ _id: id });
    //  将用户信息显示在页面上
    res.render("admin/user-edit", {
      msg: message,
      user: user,
      link: `/admin/user-modify?id=${id}`,
      button: "修改",
      id,
    });
  } else {
    //添加操作
    res.render("admin/user-edit", {
      msg: message,
      link: "/admin/user-edit",
      button: "提交",
    });
  }
};
