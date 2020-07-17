const { Article, validateArticle } = require("../../model/article");
const formidable = require("formidable");
const path = require("path");

module.exports = async (req, res) => {
  // 创建表单分析对象;
  const form = new formidable.IncomingForm();
  //配置修改文件的存放位置 项目中一般放在public文件夹的uploads文件夹中
  form.uploadDir = path.join(__dirname, "../", "../", "public", "uploads");
  //配置文件的后缀
  form.keepExtensions = true;
  //解析表单数据
  form.parse(req, async (err, fields, files) => {
    //即将要修改的用户id
    const id = req.query.id;
    // try {
    //   await validateArticle(fields.title);
    // } catch (err) {
    //   return next(
    //     JSON.stringify({ path: "/admin/article-edit", message: err.message })
    //   );
    // }
    //通过验证
    await Article.updateOne(
      { _id: id },
      {
        title: fields.title,
        publishDate: fields.publishDate,
        cover: files.cover.path.split("public")[1],
        content: fields.content,
      }
    );
    res.redirect("/admin/article");
  });
};
