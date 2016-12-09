import React from 'react';
import ReactDOM from 'react-dom';

import utils from '../../scripts/utils';
import {EMPTY, PLAYER_1, PLAYER_1_SIGN, PLAYER_2, PLAYER_2_SIGN, BOARD_SIZE} from '../../data/game_constants';

import TTTBoard from '../TTTBoard';
import {TTTPlayerLabel, TTTScore, TTTScoreBoard} from '../TTTScoreBoard';
import TTTGameResult from '../TTTGameResult';

import stylesheet from './stylesheet.css';

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
    // Reset board
    this.setState({
      board: utils.createMatrix(BOARD_SIZE, EMPTY)
    });
    // Set the turn to the other player
    // (Player that made the last move in the previous game (whether it ends up in draw or win for the player) will move second in this game)
    this.changePlayerTurn();
  }

  resetGameScores() {
    this.setState({
      scores: [0, 0]
    });
    this.startNewGame();
    this.changePlayerTurn(PLAYER_1);
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

    // Check winner
    var winner = this.checkWinner();
    if(winner) {
      this.addScore(winner.winner);
      return;
    }

    // Update board
    this.setState({
      board: board
    });
    // Shift turn
    this.changePlayerTurn()
  }

  changePlayerTurn() {
    var next_player = this.state.current_player % 2 + 1;
    if(arguments.length > 0 && [PLAYER_1, PLAYER_2].indexOf(arguments[0]) >= 0) {
      next_player = arguments[0];
    }
    this.setState({
      current_player: next_player
    });
  }

  addScore(player) {
    var scores = this.state.scores;
    scores[player-1]++;
    this.setState({scores: scores});
  }

  getPlayers() {
    return [
      {index: PLAYER_1, name: "Player 1", sign: PLAYER_1_SIGN, score: this.state.scores[0], turn_active: this.state.current_player == PLAYER_1},
      {index: PLAYER_2, name: "Player 2", sign: PLAYER_2_SIGN, score: this.state.scores[1], turn_active: this.state.current_player == PLAYER_2},
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
      <div className={"game  game--finished game--1"}>
        <TTTScoreBoard players={players} gamefinished={is_game_finished} />
        <div>
        </div>

        <TTTBoard
          board={this.state.board}
          makeMove={this.makeMove.bind(this)}
        />

        {is_game_finished &&
          <TTTGameResult 
            onStartNew={this.startNewGame.bind(this)} 
            onReset={this.resetGameScores.bind(this)} 
            result={winner_index}
          />
        }
      </div>
    );
  }
}
