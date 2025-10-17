'use strict';

/**
 * This class represents the game.
 * Now it has a basic structure, that is needed for testing.
 * Feel free to add more props and methods if needed.
 */
class Game {
  constructor(initialState) {
    this.initialState = initialState
      ? initialState.map((r) => [...r])
      : Array.from({ length: 4 }, () => Array(4).fill(0));

    this.state = this._clone(this.initialState);
    this.score = 0;
    this.status = 'idle';
    this.started = false;
  }

  // =====================
  // 🔹 Вспомогательные методы
  // =====================
  _clone(state) {
    return state.map((r) => [...r]);
  }

  _getEmptyCells() {
    const empty = [];

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (this.state[r][c] === 0) {
          empty.push([r, c]);
        }
      }
    }

    return empty;
  }

  _addRandomCell() {
    const empty = this._getEmptyCells();

    if (!empty.length) {
      return;
    }

    const [r, c] = empty[Math.floor(Math.random() * empty.length)];

    this.state[r][c] = Math.random() < 0.9 ? 2 : 4;
  }

  _transpose(state) {
    return state[0].map((_, c) => state.map((r) => r[c]));
  }

  _reverseRows(state) {
    return state.map((row) => [...row].reverse());
  }

  _mergeRow(row) {
    const filtered = row.filter(Boolean);
    const newRow = [];
    let score = 0;

    for (let i = 0; i < filtered.length; i++) {
      if (filtered[i] === filtered[i + 1]) {
        const merged = filtered[i] * 2;

        newRow.push(merged);
        score += merged;
        i++;
      } else {
        newRow.push(filtered[i]);
      }
    }

    while (newRow.length < 4) {
      newRow.push(0);
    }

    return {
      row: newRow, score,
    };
  }

  _boardsEqual(a, b) {
    return a.flat().every((v, i) => v === b.flat()[i]);
  }

  _canMove() {
    const state = this.state;

    // Есть пустая клетка?
    if (state.flat().includes(0)) {
      return true;
    }

    // Есть одинаковые по горизонтали?
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 3; c++) {
        if (state[r][c] === state[r][c + 1]) {
          return true;
        }
      }
    }

    // Есть одинаковые по вертикали?
    for (let c = 0; c < 4; c++) {
      for (let r = 0; r < 3; r++) {
        if (state[r][c] === state[r + 1][c]) {
          return true;
        }
      }
    }

    return false;
  }

  // =====================
  // 🔹 Основные методы API
  // =====================
  getState() {
    return this._clone(this.state);
  }

  getScore() {
    return this.score;
  }

  getStatus() {
    return this.status;
  }

  start() {
    if (this.status === 'idle') {
      this.state = this._clone(this.state);
      this.status = 'playing';
      this._addRandomCell();
      this._addRandomCell();
      this.started = true;
    }
  }

  restart() {
    this.state = this._clone(this.initialState);
    this.score = 0;
    this.status = 'idle';
    this.started = false;
  }

  _moveBase(state, direction) {
    // direction: 'left' | 'right' | 'up' | 'down'
    let newState = this._clone(state);
    let totalScore = 0;

    if (direction === 'up' || direction === 'down') {
      newState = this._transpose(newState);
    }

    if (direction === 'right' || direction === 'down') {
      newState = this._reverseRows(newState);
    }

    const moved = newState.map((row) => {
      const { row: newRow, score } = this._mergeRow(row);

      totalScore += score;

      return newRow;
    });

    let result = moved;

    if (direction === 'right' || direction === 'down') {
      result = this._reverseRows(result);
    }

    if (direction === 'up' || direction === 'down') {
      result = this._transpose(result);
    }

    return {
      result, totalScore,
    };
  }

  _move(direction) {
    if (!this.started || this.status !== 'playing') {
      return;
    }

    const { result, totalScore } = this._moveBase(this.state, direction);

    if (this._boardsEqual(this.state, result)) {
      // Ничего не изменилось
      return;
    }

    this.state = result;
    this.score += totalScore;

    if (this.state.flat().includes(2048)) {
      this.status = 'win';

      return;
    }

    this._addRandomCell();

    if (!this._canMove()) {
      this.status = 'lose';
    }
  }

  moveLeft() {
    this._move('left');
  }

  moveRight() {
    this._move('right');
  }

  moveUp() {
    this._move('up');
  }

  moveDown() {
    this._move('down');
  }
}

module.exports = Game;
