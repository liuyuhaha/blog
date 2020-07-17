const express = require("express");
const admin = express.Router();
// const bcrypt = require("bcrypt");
// 导入用户集合的构造函数
// const { User } = require("../model/user");

//渲染登录页面
admin.get("/login", require("./admin/loginPage"));

//实现登录功能
admin.post("/login", require("./admin/login"));

//渲染user用户管理页面
admin.get("/user", require("./admin/userPage"));

//退出功能
admin.get("/logout", require("./admin/logout"));

// 渲染用户编辑页面
admin.get("/user-edit", require("./admin/user-edit"));

//创建实现用户添加功能路由
admin.post("/user-edit", require("./admin/user-edit-fn"));

//创建实现用户修改功能路由
admin.post("/user-modify", require("./admin/user-modify"));

//创建删除用户功能路由
admin.get("/user-delete", require("./admin/delete"));

//渲染文章管理页面
admin.get("/article", require("./admin/article"));

//渲染user-edit文章编辑页面
admin.get("/article-edit", require("./admin/article-edit"));

//创建实现添加文章功能的路由页面
admin.post("/article-add", require("./admin/article-add"));

//创建文章修改功能路由
admin.post("/article-modify", require("./admin/article-modify"));

//删除文章功能路由
admin.get("/article-delete", require("./admin/article-delete"));

module.exports = admin;
