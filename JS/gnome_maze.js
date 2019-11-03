var canvas = document.getElementById('GameBoardCanvas');
//var winning_modal = document.querySelector(".modal");
//var losing_modal = document.querySelector(".modal");

let winning_modal = document.getElementById('modal_win');
let losing_modal = document.getElementById('modal_lose');
//The game board 1 = walls, 0 = free space, and -1 = the goal
var board = [
    [ 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [ 1, 1, 1, 0, 0, 0, 1, 0, 0, 0],
    [ 1, -1, 1, 0, 0, 1, 1, 1, 1, 0],
    [ 0, 0, 1, 1, 1, 1, 0, 0, 1, 0],
    [ 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 1, 1, 1, 0, 1, 1],
    [ 1, 0, 1, 0, 0, 0, 1, 0, 1, -2],
    [ 1, 0, 1, 0, 0, 0, 1, 1, 1, 0],
    [ 1, 0, 1, 0, 1, 0, 0, 0, 1, 0],
    [-1, 0, 1, 0, 1, 1, 0, 0, 0, 0]
];
var player = {
    x: 0,
    y: 0
};

var gnome = new Image();
gnome.src = "../images/gnome.jpg"
gnome.onload = start;
function start(){
    draw();
}

function draw(){
    var width = canvas.width;
    var blockSize = width/board.length;
    var ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, width, width);
    ctx.fillStyle= "rgb(43, 36, 71)";
    

    for(var y = 0; y < board.length; y++){
        for(var x = 0; x < board[y].length; x++){
            if(board[y][x] === 1){
                ctx.fillRect(x*blockSize, y*blockSize, blockSize, blockSize);
            }
            else if(board[y][x] === -1){
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.strokeStyle = "gold";
                ctx.moveTo(x*blockSize, y*blockSize);
                ctx.lineTo((x+1)*blockSize, (y+1)*blockSize);
                ctx.moveTo(x*blockSize, (y+1)*blockSize);
                ctx.lineTo((x+1)*blockSize, y*blockSize);
                ctx.stroke();
            }
            else if(board[y][x] === -2){
                ctx.beginPath();
                ctx.lineWidth = 5;
                ctx.strokeStyle = "gold";
                ctx.moveTo(x*blockSize, y*blockSize);
                ctx.lineTo((x+1)*blockSize, (y+1)*blockSize);
                ctx.moveTo(x*blockSize, (y+1)*blockSize);
                ctx.lineTo((x+1)*blockSize, y*blockSize);
                ctx.stroke();
            }
        }
    }
    
    var half = blockSize/2;
    ctx.drawImage(gnome, player.x*blockSize, player.y*blockSize, blockSize, blockSize)
} 
function canMove(x, y){
    return (y>=0) && (y<board.length) && (x >= 0) && (x < board[y].length) && (board[y][x] != 1);
}

function checkWalkedOverX(x, y) {
    
    if (board[y][x] == -1) {
        // pop up that says "You are dead!" and boots you out of maze
        losing_modal.style.display = "block";
        console.log("losing modal pop-up!");
        return 
    } else if (board[y][x] == -2) {
        // pop up that says "You reached the exit!" and sends you back to map,
        // and have unlocked next stage
        winning_modal.style.display = "block";
        // update local storage to unlock next place
        console.log("winning modal pop-up!");
        return 
    } else {
        // don't do anything
        return 
    }
}
document.addEventListener("keyup", function(e){
    if ((e.which == 38) && canMove(player.x, player.y - 1))//Up arrow
        player.y--;
    else if((e.which == 40) && canMove(player.x, player.y+1)) // down arrow
        player.y++;
    else if((e.which == 37) && canMove(player.x-1, player.y))
        player.x--;
    else if((e.which == 39) && canMove(player.x+1, player.y))
        player.x++;

    draw();
    
    checkWalkedOverX(player.x, player.y);

    e.preventDefault();
});



 