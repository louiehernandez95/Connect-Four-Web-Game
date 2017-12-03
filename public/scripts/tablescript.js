var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var leadboard = JSON.parse(this.responseText);
  		 
	   var tbody = document.getElementById('tbMain');
	   for(var i = 0; i < leadboard.length; i++){
	     var trow = getDataRow(leadboard[i],i);     //return tr data
	     tbody.appendChild(trow);
	    
	   }
    }
};
xmlhttp.open("GET", "info.json", true);
xmlhttp.send();
	
function getDataRow(h,i){
	   var row = document.createElement('tr');//create row
	   var rankingCell = document.createElement('td');//create coloum Ranking
	   rankingCell.innerHTML = i+1;//fill in data
	   row.appendChild(rankingCell);//add row
	   var nameCell = document.createElement('td');
	   nameCell.innerHTML = h.Name;
	   row.appendChild(nameCell);
	   var winsCell = document.createElement('td');
	   winsCell.innerHTML = h.Wins;
	   row.appendChild(winsCell);
	   var lossesCell = document.createElement('td');
	   lossesCell.innerHTML = h.Losses;
	   row.appendChild(lossesCell);

	   return row;//return tr data
 }  
	
