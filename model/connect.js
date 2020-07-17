const mongoose = require("mongoose");
// mongoose.set("useCreateIndex", true);
//导入config配置模块
const config = require("config");

mongoose
  .connect(
    `mongodb://${config.get("db.user")}:${config.get("db.pwd")}@${config.get(
      "db.host"
    )}:${config.get("db.port")}/${config.get("db.name")}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, //定义索引 设置useCreateIndex全局选项以选择使用猫鼬createIndex()代替
    }
  )
  .then(() => console.log("数据库连接成功"))
  .catch((err) => console.log(err, "数据库连接失败"));
