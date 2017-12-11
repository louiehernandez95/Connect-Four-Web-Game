var vals = function() {
    this.colors = ["black", "red"];
    this.columns = [0, 0, 0, 0, 0, 0, 0];
    this.myTurn = false;
    this.end = false;

    return this;
};
var swooshSound;
var values = vals();
var container = $("#container");
var socket = io.connect('http://localhost:3000');

socket.on("message", function(data) {

    //if new move is sent from opponent
    if (data.move) {
        values.myTurn = true;
        $("#whoPlaysMessage").html("It's your turn. Play!");
        console.log("received ", data.move);
        fillTheHole(data.move, opponentColor);
    }
    //begining of the game, both players are on, server sends who plays first
    if (data.turn) {
        playerColor = values.colors[data.turn - 1];
        opponentColor = values.colors[data.turn % 2];

        if (data.turn == 1 && !values.end) {
            values.myTurn = true;
            $("#whoPlaysMessage").html("You play first!");
        } else {
            $("#whoPlaysMessage").html("Wait for opponent to play!");
        }
    }
    //server sends who won, end of the game
    if (data.win) {
        console.log(data.win);
        if (data.win == "win") { $("#winner").html("<h1>YOU WON!!!</h1>"); };
        if (data.win == "lost") { $("#winner").html("<h1>YOU LOST!!!</h1>"); };
        if (data.win == "tie") { $("#winner").html("<h1>NO ONE WON.</h1>"); };

        $("#whoPlaysMessage").css("display", "none");

        values.end = true;
        values.myTurn = false;
    }
});
var sendMove = function(column) {
    values.myTurn = false;
    $("#whoPlaysMessage").html("Wait for opponent to play!");
    socket.emit("submit-move", { move: column });
};
var fillTheHole = function(column, color) {
    var index = "#cell" + column + values.columns[column];
    $(index).css("background-color", color);
    values.columns[column] += 1;
    swooshSound = new sound("public/media/audio/swoosh.wav");
    swooshSound.play();
};
var draw_grid = function() {
        for (var i = 5; i >= 0; i -= 1) {
            var tempRow = $("<div>").attr("id", "row" + i);
            for (var j = 0; j < 7; j += 1) {
                var tempCell = $("<div>").attr("id", "cell" + j + i).data("col", j);
                tempRow.append(tempCell);
            }
            container.append(tempRow);
        }
    }
    // Taken from https://stackoverflow.com/questions/9419263/playing-audio-with-javascript
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "loop");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}
$(function() {
    draw_grid();

    //listeners for selecting column
    container.on("click", function(e) {
        if (values.myTurn && !values.end) {
            var selectedCol = $("#" + e.target.id).data("col");
            console.log(selectedCol);
            if (columns[selectedCol] < 6) { // limit check, if whole column if full do nothing
                fillTheHole(selectedCol, playerColor);
                sendMove(selectedCol);
                console.log("after sending ", selectedCol);
            }
        }
    });

})