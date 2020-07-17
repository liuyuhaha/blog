const Joi = require("joi");

//定义对象的验证规则
const schema = {
  username: Joi.string()
    .alphanum()
    .min(2)
    .max(30)
    .required()
    .error(new Error("username属性没有通过验证")),

  password: Joi.string(),

  repeat_password: Joi.ref("password"),

  access_token: [Joi.string(), Joi.number()],

  birth_year: Joi.number()
    .integer()
    .min(1900)
    .max(2020)
    .error(new Error("birth属性没有通过验证")),
};

async function run() {
  try {
    //实施验证
    await Joi.validate({ username: "123", birth_year: 2022 }, schema);
  } catch (ex) {
    console.log(ex.message);
    // return终止程序继续往下运行
    return;
  }
  console.log("验证通过");
}
// function run() {
//   Joi.validate({ username: "123", birth_year: 1997 }, schema)
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

run();
