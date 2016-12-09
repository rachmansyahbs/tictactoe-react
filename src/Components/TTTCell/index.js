import React from 'react';
import ReactDOM from 'react-dom';

import {EMPTY, PLAYER_1, PLAYER_1_SIGN, PLAYER_2, PLAYER_2_SIGN} from '../../data/game_constants';

import stylesheet from './stylesheet.css';

export default class TTTCell extends React.Component {
  render() {
    var class_names = [
      "board__cell",
      "board__cell--" + this.props.cell_value
    ];

    return (
      <div key={"col-" + (this.props.row_index + 1) + "-" + (this.props.col_index + 1)} 
        className={class_names.join(" ")}
        onClick={this.props.onClick}
      >
      {this.props.cell_value == EMPTY && ""}
      {this.props.cell_value == PLAYER_1 && PLAYER_1_SIGN}
      {this.props.cell_value == PLAYER_2 && PLAYER_2_SIGN}
      </div>
    );
  }  
}
