import React from 'react';
import ReactDOM from 'react-dom';

import TTTCell from '../TTTCell';

import utils from '../../scripts/utils';
import {EMPTY, PLAYER_1, PLAYER_1_SIGN, PLAYER_2, PLAYER_2_SIGN, BOARD_SIZE} from '../../data/game_constants';

import stylesheet from './stylesheet.css';

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
      >
      {this.props.row.map((cell, col_index) => this.renderCell(cell, col_index, this.props.row_index))}
      </div>
    );
  }
}

export default class TTTBoard extends React.Component {
  render() {
    return (
      <div className="board">
        {this.props.board.map((row, row_i) => (
        <TTTRow key={"row" + (row_i + 1)}
          row={row} row_index={row_i} onClickCell={this.props.makeMove}
        />
        ))}
      </div>
    );
  }
}
