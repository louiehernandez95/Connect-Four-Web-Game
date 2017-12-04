var mongoose = require('mongoose');
var autoIncrement = require("mongoose-auto-increment");
var mconnection = mongoose.connect('mongodb://appUser:password33!@ds119446.mlab.com:19446/connect4');

//define Mongoose schema for comments
var CommentSchema = mongoose.Schema({
    //"com_id": Number,
    "com_pid": Number,
    "com_name": String,
    "com_date": Date,
    "com_content": String

});

//model comment
//var Comment = mongoose.model("comments", CommentSchema); 
autoIncrement.initialize(mconnection);
CommentSchema.plugin(autoIncrement.plugin, 'comments');
var Comment = mconnection.model("comments", CommentSchema);
module.exports = Comment;