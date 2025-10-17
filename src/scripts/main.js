'use strict';

const Game = require('../modules/Game.class.js');

const game = new Game();

const CSS_CLASS_MODIFIER = 'field-cell--';

// === Favicon ===
const favIcon = document.createElement('link');

favIcon.setAttribute('rel', 'icon');
favIcon.setAttribute('href', './images/2048_logo.svg');
favIcon.setAttribute('type', 'image/svg+xml');
document.head.appendChild(favIcon);

// === Elements ===
const control = document.querySelector('.controls');
const btnStart = document.querySelector('.start');
const btnRestart = document.createElement('button');
const startMessage = document.querySelector('.message-start');
const winMessage = document.querySelector('.message-win');
const loseMessage = document.querySelector('.message-lose');
const gameField = document.querySelector('.game-field');
const gameScore = document.querySelector('.game-score');

btnRestart.classList.add('button', 'restart');
btnRestart.textContent = 'Restart';

// === Helpers ===
function renderGameField() {
  const state = game.getState();

  for (let x = 0; x < state.length; x++) {
    for (let y = 0; y < state[x].length; y++) {
      const cell = gameField.rows[x].cells[y];
      const curVal = parseInt(cell.innerText, 10);

      if (state[x][y]) {
        if (state[x][y] !== curVal) {
          if (curVal) {
            cell.classList.remove(CSS_CLASS_MODIFIER + curVal);
          }

          cell.classList.add(CSS_CLASS_MODIFIER + state[x][y]);
          cell.innerText = state[x][y];
        }
      } else {
        if (curVal) {
          cell.classList.remove(CSS_CLASS_MODIFIER + curVal);
        }
        cell.innerText = '';
      }
    }
  }

  gameScore.innerText = game.getScore();
}

// === Callback after move ===
function handleStatus() {
  // eslint-disable-next-line no-shadow
  const status = game.getStatus();

  if (status === 'win') {
    winMessage.classList.remove('hidden');
  } else if (status === 'lose') {
    loseMessage.classList.remove('hidden');
  }
}

// === Start game ===
btnStart.addEventListener('click', () => {
  btnStart.classList.add('hidden');
  startMessage.classList.add('hidden');
  control.appendChild(btnRestart);

  game.start();
  renderGameField();
});

// === Restart game ===
btnRestart.addEventListener('click', () => {
  game.restart();
  renderGameField();
  loseMessage.classList.add('hidden');
  winMessage.classList.add('hidden');
  btnStart.classList.remove('hidden');
  startMessage.classList.remove('hidden');
});

// === Keyboard control ===
document.addEventListener('keydown', (e) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  switch (e.key) {
    case 'ArrowLeft':
      game.moveLeft();
      break;
    case 'ArrowRight':
      game.moveRight();
      break;
    case 'ArrowUp':
      game.moveUp();
      break;
    case 'ArrowDown':
      game.moveDown();
      break;
    default:
      return;
  }

  renderGameField();
  handleStatus();
});
