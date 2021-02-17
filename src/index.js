import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Boxes (squares) {
      return (
        <button className="singleBox"  onClick={squares.onClick}>
          {squares.value}
        </button>
      );
  }

  class BoardSetup extends React.Component {
    constructor(squares) {
      super(squares);
      this.state = {
        boxes: Array(9).fill(null),
      };
    }

    updateSelected(num) {
      const boxes = this.state.boxes.slice();
      if (checkWinner(boxes) || boxes[num]) {
      return;
      }
      boxes[num] = this.state.nextTurn ? 'X' : 'O';
      this.setState({
        boxes: boxes,
        nextTurn: !this.state.nextTurn,
      });
    }
    updateSquare(num) {
      return (
        <Boxes
          value={this.state.boxes[num]}
          onClick={() => this.updateSelected(num)}
      />
      );
    }
    restartGame() {
      this.state = {
        boxes: Array(9).fill(null),
      }
      for (let x = 0; x < 10; x++) {
        this.updateSelected(x);
      }
    }
    render() {
     let filled = false;
     let updateTurn;
     const winner = checkWinner(this.state.boxes);
     const boxes = this.state.boxes.slice();
     let currentPlayer;
     if (this.state.nextTurn == undefined) {
       this.state.nextTurn = true;
     }
     if (!boxes.includes(null)) {
       filled = true;
     }
     if (winner) {
       updateTurn = winner + " WON!";
     } else if (filled && !winner) {
       updateTurn = "Tie Game!"
     } else {
       if (this.state.nextTurn) {
         currentPlayer = "Player 1";
       } else {
         currentPlayer = "Player 2";
       }
       updateTurn = currentPlayer + "'s turn"
     }
      return (
        <div>
          {winner && <h3 className="endGame">{updateTurn}</h3> }
          {filled && !winner && <h3 className="endGame">{updateTurn}</h3> }
          {!winner && !filled && <h3 className="updateTurn">{updateTurn}</h3>}

          <div>
            {this.updateSquare(0)}
            {this.updateSquare(1)}
            {this.updateSquare(2)}
          </div>
          <div>
            {this.updateSquare(3)}
            {this.updateSquare(4)}
            {this.updateSquare(5)}
          </div>
          <div >
            {this.updateSquare(6)}
            {this.updateSquare(7)}
            {this.updateSquare(8)}
          </div>
          <button className="resetButton" onClick={() => this.restartGame()}>Reset Game</button>

        </div>

      );
    }
  }
  function playGame () {
      return (
        <div className="game">
          <div className="game-board">
            <BoardSetup />
          </div>
        </div>
      );
  }
  function checkWinner (boxes, filled) {
    const checkRows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < checkRows.length; i++) {
      const [a, b, c] = checkRows[i];
      if (boxes[a] && boxes[a] === boxes[b] && boxes[a] === boxes[c]) {
        return boxes[a];
      }
    }
    return null;
  }

  ReactDOM.render(
    playGame(),
    document.getElementById('root')
  );
