var express = require('express');
var app = express();
var http = require("http");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var userinfoTotal = {};

//app.use(express.static('assets'));
//app.use(express.static('assets/html'));
//app.use(express.static('media'));


//app.get('/', function (req, res) {
   //res.sendfile('index.html');
//})

app.use(express.static(__dirname + "/"));



//parse jQuery JSON to useful JS object
app.use(bodyParser.urlencoded({ extended: false }));

//connect to connect4 DB in MongoDB
mongoose.connect('mongodb://localhost/connect');

//define Mongoose schema for notes
/* var UsersinfoSchema = mongoose.Schema({
"Ranking": String,
"Name": String,
"Psw":String,
"Wins": String,
"Losses": String
}); */
////////////////////////////////////////////////////
var NoteSchema = mongoose.Schema({
  //"created": Date,
  //"note": String
  "Ranking": String

});

//model userinfo
//var Usersinfo = mongoose.model("usersinfo", UsersinfoSchema);
//////////////////////////////////////////////////////////////////////
var Note = mongoose.model("notes", NoteSchema);

//create http server
http.createServer(app).listen(3000);

//var server = app.listen(3000, function () {
    //var host = server.address().address
    //var port = server.address().port
 
    //console.log("Example app listening at http://%s:%s", host, port)
 
 //})

//json get route - update for mongo
/* app.get("/usersinfo.json", function(req, res) {

    console.log("for test for test for test");
    
  Usersinfo.find({}, function (error, usersinfo) {   
    
//add some error checking...
  res.json(usersinfo);
  });
}); */

////////////////////////////////////////////////////////////////
app.get("/notes.json", function(req, res) {
  
    
    Note.find({}, function (error, notes) {
     //add some error checking...
     res.json(notes);
    });
  });

//json post route - update for mongo
/* app.post("/usersinfo", function(req, res) {

console.log("for test for test for test");
var newUsersinfo = new Usersinfo({
"Ranking":req.body.Ranking,
"Name":req.body.Name,
"Psw":req.body.Psw,
"Wins":req.body.Wins,
"Losses":req.body.Losses
});

newUsersinfo.save(function (error, result) {
if (error !== null) {
  console.log(error);
  res.send("error reported");
} else {
    Usersinfo.find({}, function (error, result) {
    res.json(result);
  })
}
});
}); */

//////////////////////////////////////////////////////////////////////
app.post("/notes", function(req, res) {
  
    console.log("for test for test for test");
    var newNote = new Note({
      "Ranking":req.body.Ranking

    });
    newNote.save(function (error, result) {
      if (error !== null) {
        console.log(error);
        res.send("error reported");
      } else {
        Note.find({}, function (error, result) {
          res.json(result);
        })
      }
    });
  });