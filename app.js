const cells = document.querySelectorAll('.cell');
const resetBtn = document.querySelector('.reset');
const currentTurn = document.querySelector('.current-turn');
const player1score = document.querySelector('.score1');
const player2score = document.querySelector('.score2');
const draw = document.querySelector('.draw');
const messageContent = document.querySelector('.content');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('close');

const winCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
]

let emptyCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let usedCells = [];
let computer = true;
let turn = true;
let winner = false;
let ties = 0;

let player1 = {
    symbol: '<i class="fa fa-close"></i>',
    played: [],
    score: 0
}

let player2 = {
    symbol: '<i class="fa fa-circle-o"></i>',
    played: [],
    score: 0
}

checkTurn();

setInterval(aiEasy, 3000);

for(let i = 0; i < 9; i++){
  cells[i].addEventListener('click', () => {
    if(!winner){
      if(isEmpty(i)){
        if(turn == true){
          if(!computer){
            addCellsPlayer(player1, i);
            checkWin(player1);
          }
        }else{
          addCellsPlayer(player2, i);
          if(computer){
            emptyCells.splice(emptyCells.indexOf(i), 1);
          }
          checkWin(player2);
        }
        checkTurn(turn);
      }else{
        alert('choose an empty cell');
      }
    }
  })
}

function addCellsPlayer(player, i) {
  cells[i].innerHTML = player.symbol;
  player.played.push(i);
  usedCells.push(i);
  if (turn === true){turn = false}else{turn = true}
}

function checkWin(player) {
  if(!winner){
    winCombos.some(combo => {
      if(combo.every(index => player.played.includes(index))){
        winner = true;
        player.score++;
        showScore();
        setTimeout(showMessage, 500, player, winner);
        reset();
      }
    })
  }
  
  if(!winner && usedCells.length == 9) {
    ties++;
    showScore();
    setTimeout(showMessage, 500);
  }
}

function isEmpty(i) {
  if(usedCells.includes(i)){
    return false;
  }
  return true;
}

function reset() {
    cells.forEach(cell => {
      cell.innerHTML = '';
    })
    winner = false;
    usedCells = [];
    player1.played = [];
    player2.played = [];
    turn = true;
    checkTurn();
}

resetBtn.addEventListener('click', reset);

function checkTurn() {
  if(turn){
    currentTurn.innerHTML = player1.symbol;
  }else{
    currentTurn.innerHTML = player2.symbol
  }
}

function showScore() {
  player1score.innerHTML = player1.score;
  player2score.innerHTML = player2.score;
  draw.innerHTML = ties;
}

closeBtn.addEventListener('click', ()=>{
  overlay.style.display = 'none';
  clearBoard();
})

function clearBoard(){
  cells.forEach(cell => {
    cell.innerHTML = '';
  });

  usedCells = [];

  player1.played = [];
  player2.played = [];
  emptyCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  winner = false;
  turn = true;
  checkTurn(turn);
}

function showMessage(player, winner) {
  overlay.style.display = 'flex';
  if(winner){
    messageContent.innerHTML = player.symbol + ' Is the <h2>Winner</h2>';
  }else{
    messageContent.innerHTML = ' It is a <h2>Draw</h2>';
  }
  reset();
}

function aiEasy() {
  if(computer && !winner && turn){
    let random = Math.floor(Math.random() * emptyCells.length);
    addCellsPlayer(player1, emptyCells[random]);
    emptyCells.splice(random, 1);
    checkWin(player1);
    checkTurn(turn);
  }
  
}

aiEasy();