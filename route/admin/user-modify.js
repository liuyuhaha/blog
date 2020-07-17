const { User } = require("../../model/user");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => { 
  //post表单参数
  const body = req.body;
  //即将要修改的用户id 
  const id = req.query.id;
  //根据用户id查询用户信息，并取得密码和数据库密码进行比对
  const user = await User.findOne({ _id: id });
  //返回的是布尔值
  const isValid = await bcrypt.compare(body.password, user.password);

  if (isValid) {
    // 如果密码比对成功，将用户信息更新到数据库中
    await User.updateOne(
      { _id: id },
      {
        username: body.username,
        email: body.email, 
        role: body.role,
        state: body.state,
      }
    );
    res.redirect("/admin/user");
  } else {
    //密码比对失败
    return next(
      JSON.stringify({
        path: "/admin/user-edit",
        message: "密码错误无法修改",
        id,
      })
    );
  }
};
