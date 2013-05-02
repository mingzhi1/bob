var fs = require('fs');
var mongoose = require('mongoose');
var content = fs.readFileSync('./config/db.json');
var config = JSON.parse(content);

exports.config = {
    session_secret: process.env.SESSION_SECRET || 'SESSION_SECRET',
    cookie_secret: process.env.COOKIE_SECRET || 'COOKIE_SECRET',
    auth_cookie_name: process.env.AUTH_COOKIE_NAME || 'note_secret',
    login_path: '/login',//用户登录地址
    time_zone: 8,//时区，不般不用改
    admin_user_email: process.env.ADMIN_USER_EMAIL || 'mingzhip@gmail.com',//默认超级管理员的邮箱地址
    nodeMailer: {
        service: "Gmail",
        from: "mingzhip@gmail.com",
        auth: {
            user: "mingzhip@gmail.com",
            pass: "xxxxx"
        }
    }
};

exports.database = mongoose.connect(config.db, function (err) {
        if (err) {
            console.error('connect to %s error: ', config.db, err.message);
            process.exit(1);
        }
    });
    
exports.runtime = {};