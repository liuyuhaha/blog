const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//引入joi模块
const Joi = require("joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: true,
      maxlength: 10,
      minlength: 2,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: {
        validator: (v) => {
          //返回布尔值
          //true 验证成功
          //false 验证失败
          //v 要验证的值
          const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0_9-])+(\.[a-zA-Z0-9_-])+/;
          if (regEmail.test(v)) {
            return true;
          } else {
            return false;
          }
        },
        //自定义错误信息
        message: "请输入合法邮箱",
      },
    },
    password: {
      type: String,
      required: true,
      min: 4,
      max: 12,
    },
    //角色 admin 超级管理员
    //normal 普通用户
    role: {
      type: String,
      required: true,
    },
    //状态 0 启用状态
    //1 禁用状态
    state: {
      type: Number,
      default: 0,
    },
  })
);

// 激活用户集合，先创建一个对象
//激活之后立马注释，为了防止重复被创建
async function createUser() {
  const salt = await bcrypt.genSalt(10);
  const pass = await bcrypt.hash("123456", salt);
  const user = await User.create({
    username: "iteheima",
    email: "iteheima@itcasu.cn",
    password: pass,
    role: "admin",
    state: 0,
  });
}
// createUser();

//验证用户信息
const validateUser = (user) => {
  const schema = {
    username: Joi.string()
      .min(2)
      .max(12)
      .required()
      .error(new Error("用户名不符合验证规则")),
    email: Joi.string().email().error(new Error("邮箱地址不符合验证规则")),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required()
      .error(new Error("密码不符合验证规则")),

    //valid规定只能传递设置好的内部值 不是设置好的值就不能给通过验证
    role: Joi.string()
      .valid("normal", "admin")
      .required()
      .error(new Error("角色不符合验证规则")),
    state: Joi.number()
      .valid(0, 1)
      .required()
      .error(new Error("状态值不符合验证规则")),
  };

  //实施验证
  return Joi.validate(user, schema);
};

//将用户集合作为模块成员进行导出
module.exports = {
  User,
  validateUser,
};
