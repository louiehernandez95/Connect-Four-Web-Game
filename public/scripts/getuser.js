
fetch('/name',{credentials: "same-origin"}).then(function(response) {
          console.log("print fetch name process....:")

    response.text().then(function(text) {
        //alert(text);
       document.getElementById('name').innerHTML = text;
    });
});
