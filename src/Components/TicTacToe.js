import React from 'react';
import ReactDOM from 'react-dom';

import utils from '../scripts/utils';

// Constant for game states
const EMPTY = 0;
const PLAYER_1 = 1;
const PLAYER_2 = 2;
const BOARD_SIZE = 3;
const game_state = {
  current_player: PLAYER_1,
  board: utils.createMatrix(3, EMPTY),
  scores: [0, 0]
}

// DEBUG
// inline style
const board_style = {
  width: "300px",
  height: "300px",
  border: "2px solid black",
  boxSizing: "border-box"
}
const row_style = {
  display: "flex",
  height: "calc(100%/3)"
}
const cell_style = {
  "flex": "1 1 0",
  border: "1px solid black",
  boxSizing: "border-box",
  width: "calc(100%/3)",
  height: "100%",
  cursor: "pointer"
}
// 

class TTTScore extends React.Component {
  render() {
    return (
      <div>
        <div>{this.props.player_name}</div>
        <div>{this.props.score}</div>
      </div>
    )
  }
}

class TTTStateBoard extends React.Component {
  render() {
    return (
      <div>
        <TTTScore player_name={this.props.players[0].name} score={this.props.players[0].score} />
        <TTTScore player_name={this.props.players[1].name} score={this.props.players[1].score} />
        <div>{this.props.players[this.props.current_player_index].name}'s Turn</div>
      </div>
    );
  }
}

class TTTCell extends React.Component {
  render() {
    return (
      <div key={"col-" + (this.props.row_index + 1) + "-" + (this.props.col_index + 1)} 
        className="board__col" style={cell_style}
        onClick={this.props.onClick}
      >
      {this.props.cell_value == EMPTY && ""}
      {this.props.cell_value == PLAYER_1 && "X"}
      {this.props.cell_value == PLAYER_2 && "O"}
      </div>
    );
  }  
}

class TTTRow extends React.Component {
  renderCell(cell, col_i, row_i) {
    return (
      <TTTCell key={"cell-" + (row_i + 1) + "-" + (col_i + 1)}
        row_index={row_i}
        col_index={col_i}
        cell_value={cell}
        onClick={() => this.props.onClickCell(row_i, col_i)}
      />
    );
  }

  render() {
    return (
      <div key={"row-" + (this.props.row_index + 1)} 
        className="board__row" 
        style={row_style}
      >
      {this.props.row.map((cell, col_index) => this.renderCell(cell, col_index, this.props.row_index))}
      </div>
    );
  }
}

export default class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, game_state);
  }

  getFlattenedBoard() {
    return [].concat.apply([], this.state.board);
  }

  checkWinner() {
    // Check win conditions
    // Rows
    // Cols
    // Diagonals

    return false;
  }

  isBoardFull() {
    const flattened_board = this.getFlattenedBoard();
    return flattened_board.filter((cell, i) => cell != EMPTY).length == flattened_board.length;
  }

  isGameFinished() {
    return this.isBoardFull() || this.checkWinner();
  }

  startNewGame() {
    this.setState({
      board: game_state.board
    })
  }

  resetGameScores() {
    this.setState({
      scores: [0, 0]
    });
    this.startNewGame();
  }

  makeMove(row_index, col_index) {
    // Check if game is finished
    if(this.isGameFinished()) {
      return;
    }
    // Check input validity
    if(row_index >= 3 || col_index >= 3) {
      return;
    }

    var current_player = this.state.current_player;
    var board = this.state.board;
    // Check whether cell is empty
    if(board[row_index][col_index] != EMPTY) {
      return;
    }

    board[row_index][col_index] = current_player;

    var next_player = current_player % 2 + 1;

    var new_state = {
      current_player: next_player,
      board: board
    }

    // Check winner
    var winner = this.checkWinner();
    if(winner) {
      // TO-DO
    }

    // Update state
    this.setState(new_state);
  }

  render() {
    var is_game_finished = this.isGameFinished();
    var winner_index = this.checkWinner();
    var winner_text = winner_index ? "Player " + winner_index : "Draw";

    var players = [
      {name: "Player 1", score: this.state.scores[0]},
      {name: "Player 2", score: this.state.scores[1]},
    ]

    return (
      <div>
        <TTTStateBoard players={players} current_player_index={this.state.current_player - 1}/>
        <div>
          {is_game_finished && 
            <div>Finished</div>
          }
          {is_game_finished && 
            <div>{winner_text}</div>
          }
        </div>
        <div className="board" style={board_style}>
          {this.state.board.map((row, row_i) => (
          <TTTRow key={"row" + (row_i + 1)}
            row={row} row_index={row_i} onClickCell={this.makeMove.bind(this)}
          />
          ))}
        </div>
      </div>
    );
  }
}
