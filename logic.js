//variables - storage of values

let board;
let score = 0;
let rows = 4;
let columns = 4;

// this variable will be used to monitor if the user already won once in the the value of 2048, 4096, or 8192
// If one of these variables value became true, it means the player already won once in specific values
let is2048Exist = false;
let is4096Exist = false;
let is8192Exist = false;

function setGame(){
	board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]

		];  

			//This board will be used as the backend board to design and modify the tiles of the frontend board

// for loop
	for(let r=0; r<rows; r++){
		for (let c=0; c<columns; c++){

				//Creates a div element
			let tile = document.createElement("div");

				//Assign an id based on the position of the tile
			tile.id = r.toString() + "-" + c.toString();

				// Gets the number of the tile from the backend board
					// board [2] [3]
			let num = board [r][c];

			updateTile(tile,num);

			document.getElementById("board").append(tile);
		}
	}

	setTwo();
	setTwo();
}

// This function is to update the color of the tile based on its num value

function updateTile(tile, num){

	tile.innerText = "";
	tile.classList.value ="";

// <div class="tile"></div>
	tile.classList.add("tile");

	if(num > 0){
		tile.innerText = num.toString();

		if(num < 8192) {
			tile.classList.add("x" + num.toString());

		}
		else{
			tile.classList.add("x8192");
		}
	}
}

window.onload = function(){
	setGame(); //we call the setGame function   
	// name_of_function(); --to call the function
}

function handleSlide(e){
	console.log(e.code);

	if(["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.code)){

		if(e.code == "ArrowLeft"){
			slideLeft();
			setTwo();
		}
		else if(e.code == "ArrowRight"){
			slideRight();
			setTwo();
		}
		else if(e.code == "ArrowUp"){
			slideUp();
			setTwo();
		}
		else if(e.code == "ArrowDown"){
			slideDown();
			setTwo();
		}
	}

	 document.getElementById("score").innerText = score;

	// Use setTimeout to delay the alert
    setTimeout(() => {
        // Call hasLost() to check for game over conditions
        if (hasLost()) {
            alert("Game Over! You have lost the game. Game will restart");
            restartGame();
            // You may want to reset the game or perform other actions when the user loses.
            alert("Click any arrow key to restart");
        }
        else{
            checkWin();
        }
    }, 100);
}

document.addEventListener("keydown", handleSlide);

function slideLeft(){

	for(let r=0; r<rows; r++){

		let row = board[r];
		row = slide(row);
		board[r] = row;

		for(let c=0; c<columns; c++){

			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];
			updateTile(tile,num);
		}
	}
}

function filterZero(row){
	return row.filter(num => num != 0);
}

function slide(tiles){

	tiles = filterZero(tiles);

	for(let i=0; i < tiles.length-1; i++){
		if(tiles[i] == tiles[i+1]){
			tiles[i] = tiles[i] * 2; // 2 -> 4
			tiles[i+1] = 0;
			score += tiles[i];
		}
	}

	tiles = filterZero(tiles);


	while(tiles.length < columns){
		tiles.push(0);
	}
	return tiles;
}


function slideRight() {
   
    for(let r = 0; r < rows; r++){
        let row = board[r]

        row.reverse(); 
        row = slide(row); 
        row.reverse();
        board[r] = row;
       
        for(let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num)
        }
    }
}

function slideUp(){

	for(let c=0; c<columns; c++){

		let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
		col = slide(col);

		for(let r=0; r<rows; r++){
			board[r][c] = col[r]
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];
			updateTile(tile,num);
		}
	}
}

function slideDown(){

	for(let c=0; c<columns; c++){

		let col = [board[0][c], board[1][c], board[2][c], board[3][c]];
		col.reverse();
		col = slide(col);
		col.reverse();

		for(let r=0; r<rows; r++){
			board[r][c] = col[r]
			let tile = document.getElementById(r.toString() + "-" + c.toString());
			let num = board[r][c];
			updateTile(tile,num);
		}
	}
}

function hasEmptyTile(){
    for(let r = 0; r < rows; r++){
        for(let c = 0; c < columns; c++){
       
            if(board[r][c] == 0){
                return true
            }
        }
    }
    return false;
}


function setTwo(){

    if(!hasEmptyTile()){
        return;
    }

    let found = false;
    
    while(!found){
   
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);

        if(board[r][c] == 0){
      
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2")

            found = true;
        }
    }
}

function checkWin(){

    for(let r =0; r < rows; r++){
        for(let c = 0; c < columns; c++){
            
            if(board[r][c] == 2048 && is2048Exist == false){
                alert('You Win! You got the 2048');    
                is2048Exist = true;     
            } else if(board[r][c] == 4096 && is4096Exist == false) {
                alert("You are unstoppable at 4096! You are fantastically unstoppable!");
                is4096Exist = true;     
            } else if(board[r][c] == 8192 && is8192Exist == false) {
                alert("Victory!: You have reached 8192! You are incredibly awesome!");
                is8192Exist = true;    
            }
        }
    }
}


function hasLost() {
    
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === 0) {
                
                return false;
            }

            const currentTile = board[r][c];

            if (
                r > 0 && board[r - 1][c] === currentTile ||
                r < rows - 1 && board[r + 1][c] === currentTile ||
                c > 0 && board[r][c - 1] === currentTile ||
                c < columns - 1 && board[r][c + 1] === currentTile
            ) {
                
                return false;
            }
        }
    }

    return true;
}

function restartGame(){
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    
    setTwo();  

}