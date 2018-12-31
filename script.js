let player = 'X';
let players=[]
let christmas=[]
christmas['X'] = '<img class="christmas" src="santa.jpg">';
christmas['O'] = '<img class="christmas" src="grinch.png">';
players['X'] = 'Santa';
players['O'] = 'Grinch';


let count = 0;
let columnarr = [];
let start = function(){
	count = Number(document.getElementById("count").value);
	if(count &&  Number.isInteger(count) && count >= 3){
		document.getElementById('body-div').style.display  = 'block';
		document.getElementById('start-div').style.display  = 'none';
		let gameModel = gameMod();
		let tableRows = '';
		for(let i=0; i<count;i++){
			tableRows += '<tr class="rows">';
			let columns = '';
			for(let j=0; j<count;j++){
				let t =  i*count + j
				if( gameModel== 'Two'){
					columns += '<td class="columns" onclick = "play('+ t +')"></td>';
				}else{
					columns += '<td class="columns" onclick = "playOne('+ t +')"></td>';
				}

			}
			tableRows += columns;
			tableRows += '</tr>';
		}
		document.getElementById('game-body').innerHTML = tableRows;
		columnarr = document.getElementsByClassName('columns');
	}else{
		alert("Your input is blank, less than 3 or it is not an integer");
	}

}
 
let play =function(k){
		if(!columnarr[k].innerHTML){

			columnarr[k].innerHTML = christmas[player];
			let win = winner()
			
			if(win){
				alert(players[player] + ' is the winner');
				location.reload();
			}
			let nowin = noWin();
			if(nowin){
				alert('No Winner! Try again.');
				location.reload();
			}			
			if(player == "X"){
				player = "O";
			}else{
				player = "X";
			}
		
		}
	
}

let playOne = function(k){
	if(!columnarr[k].innerHTML){

			columnarr[k].innerHTML = christmas['X'];
			let win = winner()
			
			if(win){
				alert('Santa is the winner');
				location.reload();
				return false;
			}
						let nowin = noWin();
			if(nowin){
				alert('No Winner');
				location.reload();
			}
			let playerIndex = Math.floor(Math.random() * count*count); 
			setTimeout(function(){
				playerIndex = Math.floor(Math.random() * count*count);
				
				while(columnarr[playerIndex].innerHTML){
					
					playerIndex = Math.floor(Math.random() * count*count); 
				}
				columnarr[playerIndex].innerHTML = christmas['O'];

				let win1 = winner()
			
				if(win1){
					alert('Grinch is the winner');
					location.reload();
					return false;
				}
				let nowin1 = noWin();
				if(nowin1){
					alert('No Winner');
					location.reload();
				}
			},500);
			
			
		
		}
}



let winner = function(){

	for(let i=0; i<count; i++){	
		let c = winByColumn(i)
		if(c){
			return true;
		}
		c = winByRow(i)
		if(c){
			return true;
		}
		c = winByDiameter1()
		if(c){
			return true;
		}
		c = winByDiameter2()
		if(c){
			return true;
		}
		
	}
	return false;
}
let winByRow = function(i){
	
	let k = columnarr[i*count].innerHTML ;
	
	if(!k){
		return false;
	}
	for(let j=0; j<count; j++){
		let index =  i*count + j
		if(columnarr[index].innerHTML != k){
			return false;
		}

	}
	return true
}
let winByColumn = function(i){
	console.log()
	let k = columnarr[i].innerHTML ;
	
	if(!k){
		return false;
	}
	let end = count*(count-1)+i;
	// console.log(end)
	for(let j=i; j <= end; j+= count){
		// console.log(j)
		
		if(columnarr[j].innerHTML != k){
			return false;
		}

	}
	return true
}
let winByDiameter1 = function(){
	let k = columnarr[0].innerHTML ;
	
	if(!k){
		return false;
	}
	for(let j=0; j<count; j++){
		let index =  j*count + j;
		if(columnarr[index].innerHTML != k){
			return false;
		}

	}
	return true;
}

let winByDiameter2 = function(){
	let k = columnarr[count-1].innerHTML ;
	
	if(!k){
		return false;
	}
	for(let j=1; j<=count; j++){
		let index =  j*count - j;
		console.log(index)
		if(columnarr[index].innerHTML != k){
			return false;
		}

	}
	return true;
}


let noWin = function(){
		for (let i = 0; i<columnarr.length; i++) {
			if(!columnarr[i].innerHTML){
				return false;
			}
		
		}
		return true;
}

let gameMod = function(){
	let playy = document.getElementsByName('play');
 
		   for(let i = 0; i < playy.length; i++)
		   {
		      if(playy[i].checked)
		      {
		         return playy[i].value;
		      }
		   }

}



