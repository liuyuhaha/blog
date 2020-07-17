const { User } = require("../../model/user");

module.exports = async (req, res) => {
  //接收服务器传来的get参数
  const id = req.query.id;
  await User.findOneAndDelete({ _id: id });
  res.redirect("/admin/user");
};
