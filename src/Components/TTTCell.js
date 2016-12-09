import React from 'react';
import ReactDOM from 'react-dom';

import {EMPTY, PLAYER_1, PLAYER_1_SIGN, PLAYER_2, PLAYER_2_SIGN} from '../data/game_constants';

// DEBUG
const cell_style = {
  "flex": "1 1 0",
  border: "1px solid black",
  boxSizing: "border-box",
  width: "calc(100%/3)",
  height: "100%",
  cursor: "pointer"
}
// 

export default class TTTCell extends React.Component {
  render() {
    return (
      <div key={"col-" + (this.props.row_index + 1) + "-" + (this.props.col_index + 1)} 
        className="board__col" style={cell_style}
        onClick={this.props.onClick}
      >
      {this.props.cell_value == EMPTY && ""}
      {this.props.cell_value == PLAYER_1 && PLAYER_1_SIGN}
      {this.props.cell_value == PLAYER_2 && PLAYER_2_SIGN}
      </div>
    );
  }  
}
