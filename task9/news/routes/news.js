/**
 * Created by PRO on 2016/6/19.
 */
var express = require('express');
var router = express.Router();

var db = require('../lib/db');

/* GET news  listing. */

router.get("/del", function(req, res, next) {
    var sql = "DELETE FROM news WHERE id=?";
    db.connection.query(sql, [req.query.id], function(err){
        if(err) throw err;
    });
    var listSql = "SELECT * FROM news ORDER BY id DESC";
    db.connection.query(listSql, function(err, rows){
        if(err) throw err;
        res.render("list-news", {news: rows});
        res.end();
    });
});

// 处理增加新闻条目路由
router.get("/add", function(req, res, next) {
    //读取从传入的参数
    var title    = test(req.query.title);
    var newsDate = test(req.query.newsDate);
    var picture  = test(req.query.picture);
    var abstract = test(req.query.abstract);
    var category = test(req.query.category);
    var label    = test(req.query.label);
    var likes    = test(req.query.likes);
    //更新数据库
    var sql = "INSERT INTO news(title, newsDate, picture, abstract, category, label, likes)" +
              "values(?, ?, ?, ?, ?, ?, ?)";
    db.connection.query(sql, [title, newsDate, picture, abstract,category,label,likes],
        function (err, rows) {
            if(err) throw err;
            res.end("Ok");
        });
});

// 列出全部新闻的路由
router.get("/list", function(req, res, next) {
    var sql = "SELECT * FROM news ORDER BY id DESC";
    db.connection.query(sql, function(err, rows){
        if(err) throw err;
        res.render("list-news", {news: rows});
        res.end();
    });
});

// 根据浏览器传入的参数更新数据库
router.get("/edit", function(req, res, next) {
    //获取从浏览器传入的参数并验证正确性
    var id       = test(req.query.id);
    var title    = test(req.query.title);
    var newsDate = test(req.query.newsDate);
    var picture  = test(req.query.picture);
    var abstract = test(req.query.abstract);
    var category = test(req.query.category);
    var label    = test(req.query.label);
    var likes    = test(req.query.likes);

    var sql = "UPDATE news SET " +
          "title=?, newsDate=?, picture=?, abstract=?, category=?, label=?, likes=?" +
          "WHERE id = ?";
    db.connection.query(sql,
                       [id,title, newsDate, picture, abstract,category,label,likes],
                       function (err) {
                          if(err) throw err;
                            res.send("Success");
                       });
});

router.get("/category", function(req, res, next){
    var category = req.query.category;
    var sql = "SELECT * FROM news WHERE category=?";
    db.connection.query(sql, [category], function(err, rows){
        if(err) throw err;
        res.jsonp({data: rows});
    });
});

//验证从浏览器传出的参数是否正确，
function test(str){
    var result;
    result = str.trim();                //删除两端的空格
    result = result.replace(/</g, "&lt");//替换字符串中<和>，避免执行<script>脚本
    result = result.replace(/>/g, "&gt");
    return result;
}
module.exports = router;