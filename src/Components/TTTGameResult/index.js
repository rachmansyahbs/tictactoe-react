import React from 'react';
import ReactDOM from 'react-dom';

import {PLAYER_1, PLAYER_1_SIGN, PLAYER_2, PLAYER_2_SIGN} from '../../data/game_constants';

import stylesheet from './stylesheet.css';

export default class TTTGameResult extends React.Component {
  render() {
    var winner = "Draw";
    switch(this.props.result) {
      case PLAYER_1:
        winner = "Winner: Player 1 (" + PLAYER_1_SIGN + ")";
        break;
      case PLAYER_2:
        winner = "Winner: Player 2 (" + PLAYER_2_SIGN + ")";
        break;
    }

    return (
      <div className="gameresult">
        <div className={"gameresult__status gameresult__status--" + this.props.result}>
          {winner}
        </div>
        <div className="gameresult__actions">
          <button className="gameresult__actionbutton gameresult__actionbutton--newgame" onClick={this.props.onStartNew}>Play Again</button>
          <button className="gameresult__actionbutton gameresult__actionbutton--reset" onClick={this.props.onReset}>Reset Scores</button>
        </div>
      </div>
    );
  }
}