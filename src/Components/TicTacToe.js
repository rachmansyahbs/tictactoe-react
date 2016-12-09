import React from 'react';
import ReactDOM from 'react-dom';

import utils from '../scripts/utils';
import {EMPTY, PLAYER_1, PLAYER_1_SIGN, PLAYER_2, PLAYER_2_SIGN, BOARD_SIZE} from '../data/game_constants';

import TTTBoard from './TTTBoard';

class TTTPlayerLabel extends React.Component {
  render() {
    return (
      <span>
      {this.props.player_name} ({this.props.player_sign})
      </span>
    );
  }
}

class TTTScore extends React.Component {
  render() {
    return (
      <div>
        <div><TTTPlayerLabel player_name={this.props.player_name} player_sign={this.props.player_sign} /></div>
        <div>{this.props.score}</div>
      </div>
    )
  }
}

class TTTScoreBoard extends React.Component {
  render() {
    return (
      <div>
        <TTTScore player_name={this.props.players[0].name} player_sign={this.props.players[0].sign} score={this.props.players[0].score} />
        <TTTScore player_name={this.props.players[1].name} player_sign={this.props.players[1].sign} score={this.props.players[1].score} />
      </div>
    );
  }
}

export default class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current_player: PLAYER_1,
      scores: [0, 0],
      board: utils.createMatrix(BOARD_SIZE, EMPTY)
    }
  }

  getFlattenedBoard() {
    return utils.flattenMatrix(this.state.board);
  }

  checkWinner() {
    var winner = false;
    var winning_sets = [];

    var flattened_board = this.getFlattenedBoard();

    // Define win conditions
    var possible_winning_sets = [];
    // - Rows
    possible_winning_sets = possible_winning_sets.concat(utils.getRowsIndexes(BOARD_SIZE));
    // - Cols
    possible_winning_sets = possible_winning_sets.concat(utils.getColsIndexes(BOARD_SIZE));
    // - Diagonals
    possible_winning_sets = possible_winning_sets.concat(utils.getDiagonalsIndexes(BOARD_SIZE));

    // Generic function to check win conditions
    for(let i = 0; i < possible_winning_sets.length; i++) {
      let set = utils.getArrayElements(flattened_board, possible_winning_sets[i]);
      let check = utils.checkArraySameValues(set);
      if(check.result && check.value != EMPTY) {
        winner = check.value;
        winning_sets.push(set)
        // - Alternatively can be modified for early exit/return if does not need to handle multiple winning sets (possible, but unlikely)
        // return (winner: check.value, sets: [set]);
      }
    }

    if(winning_sets.length) {
      var result = {
        winner: winner,
        sets: winning_sets
      }

      return result;
    }

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
    // Intentionally not resetting the player's turn
    // Player that made the last move in the previous game (whether it ends up in draw or win for the player) will move second in this game
    this.setState({
      board: utils.createMatrix(BOARD_SIZE, EMPTY)
    })
  }

  resetGameScores() {
    this.setState({
      current_player: PLAYER_1,
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
      this.addScore(winner.winner);
    }

    // Update state
    this.setState(new_state);
  }

  addScore(player) {
    var scores = this.state.scores;
    scores[player-1]++;
    this.setState({scores: scores});
  }

  getPlayers() {
    return [
      {name: "Player 1", sign: PLAYER_1_SIGN, score: this.state.scores[0]},
      {name: "Player 2", sign: PLAYER_2_SIGN, score: this.state.scores[1]},
    ];
  }

  render() {
    var players = this.getPlayers();
    var is_game_finished = this.isGameFinished();
    var check_winner = this.checkWinner();
    var winner_index = false;
    if(check_winner) {
      winner_index = check_winner.winner;
    }
    var winner_text = winner_index ? ("Winner: Player " + winner_index) : "Draw";
    var current_player_text = (
      <TTTPlayerLabel player_name={players[this.state.current_player-1].name} player_sign={players[this.state.current_player-1].sign} />
    );

    return (
      <div>
        <TTTScoreBoard players={players} />
        <div>
          {is_game_finished ? 
            winner_text : 
            <div>{current_player_text}'s Turn</div>
          } 
        </div>

        <TTTBoard
          board={this.state.board}
          makeMove={this.makeMove.bind(this)}
        />

        {is_game_finished &&
        <div>
          <button onClick={this.startNewGame.bind(this)}>Play Again</button>
          <button onClick={this.resetGameScores.bind(this)}>Reset Scores</button>
        </div>
        }
      </div>
    );
  }
}
