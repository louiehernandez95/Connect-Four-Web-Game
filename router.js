var express = require('express');
var router = express.Router();

var User = require('./models/user');

// GET rules page
router.get('/Connect4rules', function(req, res) {
    console.log(__dirname + '/../html/Connect4rules.html');
    return res.sendFile('html/Connect4rules.html', { root: __dirname }); //path.join(__dirname + '/../html/signup.html'));
});

// GET leaderboard page
router.get('/leaderboard', function(req, res) {
    console.log(__dirname + '/../html/leaderboard.html');
    return res.sendFile('html/leaderboard.html', { root: __dirname }); //path.join(__dirname + '/../html/signup.html'));
});

// GET login page
router.get('/', function(req, res) {
    console.log(__dirname + '/../html/signup.html');
    return res.sendFile('html/index.html', { root: __dirname }); //path.join(__dirname + '/../html/signup.html'));
});




//POST login page
router.post('/', function(req, res, next) {
    // confirm that user typed same password twice
    if (req.body.login && req.body.password) {
        User.authenticate(req.body.login, req.body.password, function(error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/game');
            }
        });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
});
// GET signup Page
router.get('/game', function(req, res, next) {
    return res.sendFile('html/game.html', { root: __dirname });
});

// GET signup Page
router.get('/gamem', function(req, res, next) {
    return res.sendFile('html/gamem.html', { root: __dirname });
});

// GET signup Page
router.get('/signup', function(req, res, next) {
    return res.sendFile('html/signup.html', { root: __dirname });
});

// GET signup Page
router.post('/signup', function(req, res, next) {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.send("passwords dont match");
        return next(err);
    }

    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {

        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
            wins: 0,
            losses: 0


        }

        User.create(userData, function(error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.redirect('/game');
            }
        });

    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
    // return res.sendFile('html/index.html', { root: __dirname });
});

// GET route after registering
router.get('/profile', function(req, res, next) {
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                } else {
                    return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
                }
            }
        });
});

// GET for logout logout
router.get('/logout', function(req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});


//json get route - update for mongo
router.get("/html/info.json", function(req, res) {

    Userinfo.find({}, function(error, info) {
        //add some error checking...
        res.json(info);
        // console.log(res.);
    });
});



module.exports = router;