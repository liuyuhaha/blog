const formidable = require("formidable");
const path = require("path");
const { Article } = require("../../model/article");


module.exports = (req, res) => {
  //创建表单解析对象
  const form = new formidable.IncomingForm(); 
  //配置文件后缀
  form.keepExtensions = true;
  //配置上传文件的存放位置 项目中一般放在public文件夹的uploads文件夹
  form.uploadDir = path.join(__dirname, "../", "../", "public", "uploads");
  //解析表单数据
  form.parse(req, async (err, fields, files) => {
    //fields存储普通表单请求参数 obj
    //files存储上传文件信息
    //解析成功时候的err为null
    await Article.create({
      title: fields.title,
      author: fields.author,
      publishDate: fields.publishDate,
      cover: files.cover.path.split("public")[1],
      content: fields.content,
    });
    res.redirect("/admin/article");
  });
};
