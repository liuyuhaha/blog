const express = require("express");
const app = express();
const path = require("path");
//处理post请求参数
const boyParse = require("body-parser");
// 导入expression
const session = require("express-session");
//dateformat全局配置时间格式化
const dateFormat = require("dateformat");
//  express-art-template基于art-template所以 可以直接引入a-t 全局配置模板引擎
const template = require("art-template");
//morgan第三方模块 返回的是一个方法
const morgan = require("morgan");
//config模块 返回模块对象
const config = require("config");

//连接数据库
require("./model/connect");
//一开始引入数据库对象，只是为了激活数据库而已
//require在导入模块的时候同时执行文件
// require("./model/user");

//处理post请求参数
app.use(boyParse.urlencoded({ extended: false }));

//配置session 密钥 拦截所有请求并将请求交给session方法
app.use(
  session({
    resave: false, //添加 resave 选项
    saveUninitialized: false, //添加 saveUninitialized 选项
    secret: "aF,.j)wBhq+E9n#aHHZ91Ba!VaoMfC", // 建议使用 128 个字符的随机字符串
    cookie: { maxAge: 1800 * 1000 },
  })
);

//为res.render渲染页面
//告诉express模版用什么引擎去渲染模版
//告诉express框架模版的所在位置
//告诉express框架模版的后缀
app.engine("art", require("express-art-template"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "art");

//时间格式全局配置 向模版内部导入dateformate模板变量
template.defaults.imports.dateFormat = dateFormat;

//开放静态资源
app.use(express.static(path.join(__dirname, "public")));

console.log(config.get("title"));

//获取系统文件环境变量 process是全局对象下的属性对象 返回值是对象
//  env是process下的属性
if (process.env.NODE_ENV == "development") {
  //当前是开发环境
  //  在开发环境中 将客户端发送到服务端的请求信息打印到控制台中
  app.use(morgan("dev"));
} else {
  //当前是生产环境
}

//引入路由对象
const home = require("./route/home");
const admin = require("./route/admin");

//配置登录拦截 写在路由之前
app.use("/admin", require("./middleware/loginGuard"));

//为路由对匹配路径 用app.use拦截请求
app.use("/home", home);
app.use("/admin", admin);

//错误处理
app.use((err, req, res, next) => {
  //  接收next()传递过来的信息 保存在err中
  //  JSON.parse将字符串转化为对象形式
  const result = JSON.parse(err);
  //传递过来的除了path message之外还有其他类似于id的值
  // { path: "/admin/user-edit", message: "密码错误 无法修改" ,id}
  let params = [];
  for (let attr in result) {
    //    只有attr不等于path就可以进行参数拼接
    if (attr !== "path") {
      //message="密码错误 无法修改" 拼接好的字符串
      params.push(attr + "=" + result[attr]);
    }
  }
  res.redirect(`${result.path}?${params.join("&")}`);
});

app.listen(80);
console.log("网站服务器启动成功，请访问localhost");
