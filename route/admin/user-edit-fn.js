//引入joi模块 到了user.js模块中
// const Joi = require("joi");
const { User, validateUser } = require("../../model/user");
//引入加密模块
const bcrypt = require("bcrypt");
 
module.exports = async (req, res, next) => {
  //定义验证规则 已被剪切到user.js
  try {
    //实施验证 已被剪切到user.js
    // await Joi.validate(req.body, schema);
    await validateUser(req.body);
  } catch (err) {
    //验证没有通过 错误处理(错误处理用next()方法触发)
    // return res.redirect(`/admin/user-edit?message=${err.message}`);

    //  next()方法只接受字符串格式 所以传递的两个参数只能写成对象的形式再转换为字符串传递
    //    JSON.stringify() 将对象数据类型转换为字符串数据类型
    return next(
      JSON.stringify({ path: "/admin/user-edit", message: err.message })
    );
  }

  //验证通过 根据邮箱地址查询用户是否存在
  const user = await User.findOne({ email: req.body.email });
  //如果用户存在 邮箱地址已被占用
  if (user) {
    // 错误处理
    // return res.redirect(`/admin/user-edit?message=邮箱地址已被占用`);
    return next(
      JSON.stringify({ path: "/admin/user-edit", message: "邮箱地址已被占用" })
    );
  }

  //对密码进行加密处理
  //  生成随机字符串
  const salt = await bcrypt.genSalt(10);
  //    使用随机字符串对密码进行加密处理
  const password = await bcrypt.hash(req.body.password, salt);
  //      替换密码
  req.body.password = password;
  //        将用户信息添加到数据库中
  await User.create(req.body);
  //					跳转到user页面
  res.redirect("/admin/user");
};
