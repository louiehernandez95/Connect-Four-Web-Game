var mongoose = require('mongoose');
var autoIncrement = require("mongoose-auto-increment");
var db = mongoose.connection;

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
autoIncrement.initialize(db);
CommentSchema.plugin(autoIncrement.plugin, 'comments');
var Comment = db.model("comments", CommentSchema);
module.exports = Comment;