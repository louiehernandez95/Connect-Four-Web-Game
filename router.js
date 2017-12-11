var express = require('express');
var router = express.Router();

var User = require('./public/models/user');
var Comment = require('./public/models/commentmodal');

// GET rules page
router.get('/Connect4rules', function(req, res) {
    console.log(__dirname + '/../html/Connect4rules.html');
    //path.join(__dirname + '/../html/signup.html'));
    if (req.session) {
        //validate active session
        return res.sendFile('public/html/Connect4rules.html', { root: __dirname });
    }
    return res.redirect('/');
});

// GET leaderboard page
router.get('/leaderboard', function(req, res) {
    console.log(__dirname + '/../html/leaderboard.html');
    if (req.session) {
        //validate active session
        return res.sendFile('public/html/leaderboard.html', { root: __dirname });
    }
    return res.redirect('/');
});

// GET login page
router.get('/', function(req, res) {
    console.log(__dirname + '/../html/signup.html');
    return res.sendFile('public/html/index.html', { root: __dirname }); //path.join(__dirname + '/../html/signup.html'));
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
    if (req.session) {
        //validate active session
        return res.sendFile('public/html/game.html', { root: __dirname });
    }
    return res.redirect('/');
});

// GET signup Page
router.get('/gamem', function(req, res, next) {
    if (req.session) {
        //validate active session
        return res.sendFile('public/html/gamem.html', { root: __dirname });
    }
    return res.redirect('/');
});

// GET signup Page
router.get('/signup', function(req, res, next) {
    return res.sendFile('public/html/signup.html', { root: __dirname });
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


router.get('/name', function(req, res, next) {
    User.findById(req.session.userId)
        .exec(function(error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    return res.send('Guest');
                } else {
                    return res.send(user.username);
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
router.get("/info.json", function(req, res) {

    User.find({}, function(error, info) {
        //add some error checking...
        res.json(info);
        // console.log(res.);
    }).sort({ "wins": -1, "losses": 1 });
});


//json get route - update for mongo
router.get("/comments.json", function(req, res) {
    console.log("for get for get for get");

    Comment.find({}, function(error, comments) {
        //add some error checking...
        res.json(comments);
    });
});

//json post route - update for mongo
router.post("/comments", function(req, res) {

    console.log("for post for post for post");

    var newComment = new Comment({
        //"com_id": req.body.com_id,
        "com_pid": req.body.com_pid,
        "com_name": req.body.com_name,
        "com_date": req.body.com_date,
        "com_content": req.body.com_content
    });
    newComment.save(function(error, result) {
        if (error !== null) {
            console.log(error);
            res.send("error reported");
        } else {
            Comment.find({}, function(error, result) {
                console.log(result);
                res.json(result);
            })
        }
    });
});



module.exports = router;