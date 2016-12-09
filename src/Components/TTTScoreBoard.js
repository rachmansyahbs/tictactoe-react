import React from 'react';
import ReactDOM from 'react-dom';

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

export {TTTPlayerLabel, TTTScore, TTTScoreBoard};
export default TTTScoreBoard;