const express = require("express");

const home = express.Router();

//博客首页
home.get("/", require("./home/index"));
//博客文章详情页面
home.get("/article", require("./home/article"));
//博客评论功能
home.post("/comment", require("./home/comment"));

module.exports = home;
