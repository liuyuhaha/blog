const guard = (req, res, next) => {
  //判断用户访问的是否是登录页面
  //判断用户的登录状态
  //如果用户是登录 放行
  //如果不是 重定向到登录页面

  //并且用户名不存在
  if (req.url != "/login" && !req.session.username) {
    res.redirect("/admin/login");
  } else {
    if (req.session.role == "normal") {
      return res.redirect("/home/");
    }
    next();
  }
};
module.exports = guard;
