var xmlhttp = new XMLHttpRequest();
 
fetch('/name',{credentials: "same-origin"}).then(function(response) {
	
	response.text().then(function(text) {
		displyLeaderboard(text)
});
});

console.log( "currentUser2:",currentUser);

function displyLeaderboard(currentUser){
	xmlhttp.open("GET", "info.json", true);
	xmlhttp.send();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var leadboard = JSON.parse(this.responseText);
			console.log( "currentUser3:",currentUser);
		var tbody = document.getElementById('tbMain');
		for(var i = 0; i < leadboard.length; i++){

			
			if(leadboard[i].username== currentUser){
				//console.log( currentUser3);
				displayStauts(leadboard[i],i);
			}
			var trow = getDataRow(leadboard[i],i);     //return tr data
			tbody.appendChild(trow);	    
		}
		}
	};

}

function displayStauts(myrecord, i){
	  var myranking = i + 1;
	  var mywins = myrecord.wins;
	  var mylosses = myrecord.losses;

	 // console.log(myranking,mywins,mylosses);
	  
	  $("#ranking").append(myranking);
	  $("#wins").append(mywins);
	  $("#losses").append(mylosses);
}
	
function getDataRow(h,i){
	   var row = document.createElement('tr');//create row
	   var rankingCell = document.createElement('td');//create coloum Ranking
	   rankingCell.innerHTML = i+1;//fill in data
	   row.appendChild(rankingCell);//add row
	   var usernameCell = document.createElement('td');
	   usernameCell.innerHTML = h.username;
	   row.appendChild(usernameCell);
	   var winsCell = document.createElement('td');
	   winsCell.innerHTML = h.wins;
	   row.appendChild(winsCell);
	   var lossesCell = document.createElement('td');
	   lossesCell.innerHTML = h.losses;
	   row.appendChild(lossesCell);

	   return row;//return tr data
 }  

 
