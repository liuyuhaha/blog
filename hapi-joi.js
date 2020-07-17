const Joi = require("@hapi/joi");
//定义对象的规则
const schema = Joi.object({
  username: Joi.string().alphanum().min(2).max(30).required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  repeat_password: Joi.ref("password"),

  access_token: [Joi.string(), Joi.number()],

  birth_year: Joi.number().integer().min(1900).max(2013),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

// const schema = {
//   username: Joi.string().min(2).max(5),
// };

//validate方法返回一个promise对象
async function run() {
  const { error, value } = await schema.validate({ username: 1 });
  if (error !== undefined) {
    console.log(error);
  } else {
    console.log("验证通过");
  }
}

run();
