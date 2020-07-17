const { User } = require("../../model/user");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  //接受post请求参数
  const { email, password } = req.body;
  if (email.trim().length == 0 || password.trim().length == 0) {
    return res.status(400).render("admin/error", {
      msg: "邮箱地址或者密码不能为空",
    });
  }
  //根据邮箱地址查询用户信息
  //如果查询到了用户，变量值是对象；如果没有用户，变量值为空
  const user = await User.findOne({ email });
  if (user) {
    //将用户传来的密码和用户信息中的密码进行对比
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      //登录成功
      //将用户名存储到req下面的username属性中
      req.session.username = user.username;
      //判断用户角色 设置登录拦截
      req.session.role = user.role;
      //在登陆之后要将公共数据渲染到页面上
      // req.app=app.js中创建的的app
      req.app.locals.userInfo = user;
      //判断用户角色信息
      if (user.role == "admin") {
        //重定向到后台管理用户列表页面
        res.redirect("/admin/user");
      } else {
        //重定向到博客首页
        res.redirect("/home/");
      }
    } else {
      res.status(400).render("admin/error", { msg: "邮箱地址或者密码错误" });
    }
  } else {
    res.status(400).render("admin/error", { msg: "邮箱地址或者密码错误" });
  }
};
