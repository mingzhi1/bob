exports.config = {
    session_secret: process.env.SESSION_SECRET || 'SESSION_SECRET',
    cookie_secret: process.env.COOKIE_SECRET || 'COOKIE_SECRET',
    time_zone: 8,
    nodeMailer: {
        service: "Gmail",
        from: "mingzhip@gmail.com",
        auth: {
            user: "mingzhip@gmail.com",
            pass: "xxxxx"
        }
    }
};

exports.database = "mongodb://robot:ming@linus.mongohq.com:10099/talk";

exports.botData = {
    name:'bob',
    sex:'male'
};

exports.runtime = {};