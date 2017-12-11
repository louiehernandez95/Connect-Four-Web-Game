var socket = io.connect('http://localhost:3000');

function addMessage(data) {
    $('#messages').prepend('<li class="list-group-item">' +
        '<h4 class="list-group-item-heading">' + data.name + '</h4>' +
        '<p class="list-group-item-text">' + data.message + '</p>' +
        '</li>');
};

var usersName = "";

fetch('/name', { credentials: "same-origin" }).then(function(response) {
    console.log("print fetch name process....:")

    response.text().then(function(text) {
        usersName = text;
    });
});

// This will be fired 
socket.on('messages-available', function(data) {
    for (var i = 0; i < data.length; i++) {
        addMessage(data[i]);
    }
});

// This listens for any individual messages coming back from the server
socket.on('message-added', addMessage);

// When someone clicks the "Send" button, we'll emit the data to the server
$('#create-message').submit(function(e) {

    // Don't let the form actually post to the server
    e.preventDefault();

    // Send the "add-message" message to the server with our values
    socket.emit('add-message', {
        name: usersName,
        message: $('textarea[name="message"]').val()
    });

    // Clear out the message value
    $('textarea[name="message"]').val('');

});