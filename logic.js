// variables - storage of values
let board;
let score = 0;
let rows = 4;
let column = 4;
//variable use to monitor if user won
let is2048exist = false;
let is4096exist = false;
let is8192exist = false;


function checkwin() {
	
for (let r = 0; r<rows; r++) {

	for (let c = 0; c<column; c++)
	{
		//this are function which display wins once
		if (board [r][c] == 2048 && is2048exist == false){
			alert("You Win! You got the 2048");
			is2048exist = true;
		}
		else if (board [r][c] == 4096 && is4096exist == false){
			alert("You are unstoppable at 4096! You are fantastically");
			is4096exist = true;
	}
		else if (board [r][c] == 8192 && is8192exist == false){
			alert("Victory! You have reached 8192! You are incredibly");
			is8192exist = true;
	}

}

}

}

function talo(){

for (let r = 0; r<rows; r++) {

	for (let c = 0; c<column; c++)
	{	
if (board[r][c] == 0){
	return false;
}
const curentTile = board[r][c];

if (r > 0 && board [r-1][c] === curentTile ||
	r < rows - 1 && board[r+1][c] === curentTile ||
	c > 0 && board [r][c-1] === curentTile ||
	c < column - 1 && board[r][c+1] === curentTile) 
{
	return false;

} return true;	

	}

		}


	}

function setGame() {



	board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 1024, 1024],
		[0, 0, 0, 0]
]; //this board will be used as the backend board to design and 
	//modify the tiles of the frontend board

//loop
for (let r = 0; r<rows; r++) {

	for (let c = 0; c<column; c++){

		//creates div element
		let tile = document.createElement ("div");

		//assign an id of thile
		tile.id = r.toString() + "-" + c.toString();

		//get the number of tile from backend .board row and column
		let num = board	[r][c];
		updateTile(tile, num);

		document.getElementById("board").append(tile);

	}
}

setTwo();
setTwo();

}
// This function is to update the color of the tile based on its num value
function updateTile(tile, num){

	tile.innerText = "";
	tile.classList.value = "";

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
	setGame();

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
	setTimeout(() => {
	checkwin();
	}, 100)

	if(talo() == true){
		setTimeout(() => {
			alert("Game over. You have lost the game. Game will restart");
			restartGame();
			alert("Click any arrow key to restart")
		}, 100);
	}
}

document.addEventListener("keydown", handleSlide);
//slideleft function will use to merge matching adjacent tiles


//temporarily removes zero 2  0  0  2 -> 2  2
function filterZero (row){
	return row.filter(num => num !=0);
}

function slide(row) {
	row = filterZero(row);

	for (let i=0; i<row.length-1; i++) {
		if(row[i] == row[i+1]){
			row [i] *= 2;
			row[i+1] = 0;
		}
	}

	row = filterZero(row);

	while(row.length < column) {
		row.push(0);
	}
	return row;
}

function slideLeft(){
	//for loop for multiple access or reuse the code
	for (let r = 0; r<rows; r++) {

	let row = board[r];
	row = slide(row);
	board[r] = row;

	for (let c = 0; c<column; c++){
		let tile = document.getElementById(r.toString() + "-" + c.toString());
		let num = board[r][c];
		updateTile(tile, num)

		}

	}

	
}

function slideRight(){
	//for loop for multiple access or reuse the code
	for (let r = 0; r<rows; r++) {

	let row = board[r];
	row.reverse();
	row = slide(row);
	row.reverse();
	board[r] = row;

	for (let c = 0; c<column; c++){
		let tile = document.getElementById(r.toString() + "-" + c.toString());
		let num = board[r][c];
		updateTile(tile, num)

		}

	}

	
}

function slideUp(){
	//for loop for multiple access or reuse the code
	for (let c = 0; c<column; c++) {

	let col = [board[0][c], board[1][c], board[2][c], board[3][c]] ;
	col = slide(col);
	
	for (let r = 0; r<rows; r++){

		board [r][c] = col[r];
		let tile = document.getElementById(r.toString() + "-" + c.toString());
		let num = board[r][c];
		updateTile(tile, num)

		}

	}

	
}

function slideDown(){
	//for loop for multiple access or reuse the code
	for (let c = 0; c<column; c++) {



	let col = [board[0][c], board[1][c], board[2][c], board[3][c]] ;
	col.reverse();
	col = slide(col);

	col.reverse();
	
	for (let r = 0; r<rows; r++){

		board [r][c] = col[r];
		let tile = document.getElementById(r.toString() + "-" + c.toString());
		let num = board[r][c];
		updateTile(tile, num);
		//update tile used to change color of tile

		}

	}



	
}

function hasEmptyTile(){

	for(let r = 0; r<rows; r++){
		for(let c = 0; c<column; c++) {
			if(board[r][c] == 0) {
				return true;
			}
		}
	}

	return false;
}

function setTwo() {
	if(hasEmptyTile() == false) {
		return;
	}

	let found = false;

	while(found == false) {
		let r = Math.floor(Math.random() * rows);
		let c = Math.floor(Math.random() * column);

		if(board[r][c] == 0) {

			board [r][c] = 2;
			let tile = document.getElementById(r.toString() + "-" + c.toString());

			tile.innerText = "2";
			tile.classList.add("x2");

			found = true;
		}
	}

}

function restartgame(){
	board = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
]

	setTwo();
	setTwo();
}