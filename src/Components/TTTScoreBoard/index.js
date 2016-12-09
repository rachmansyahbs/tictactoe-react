import React from 'react';
import ReactDOM from 'react-dom';

import stylesheet from './stylesheet.css';

class TTTPlayerLabel extends React.Component {
  render() {
    return (
      <span className="player-label">
      {this.props.player_name} ({this.props.player_sign})
      </span>
    );
  }
}

class TTTScore extends React.Component {
  render() {
    var wrapper_classnames = [
      "score-wrapper",
      "score-wrapper--" + this.props.player.index
    ];
    if(!this.props.gamefinished && this.props.player.turn_active) {
      wrapper_classnames.push("score-wrapper--activeturn");
    }

    return (
      <div className={wrapper_classnames.join(" ")}>
        <div className="score-wrapper__player"><TTTPlayerLabel player_name={this.props.player.name} player_sign={this.props.player.sign} /></div>
        <div className="score-wrapper__score">{this.props.player.score}</div>
      </div>
    )
  }
}

class TTTScoreBoard extends React.Component {
  render() {
    return (
      <div className="scoreboard-wrapper">
        <TTTScore player={this.props.players[0]} gamefinished={this.props.gamefinished} />
        <TTTScore player={this.props.players[1]}  gamefinished={this.props.gamefinished} />
      </div>
    );
  }
}

export {TTTPlayerLabel, TTTScore, TTTScoreBoard};
export default TTTScoreBoard;