import React from 'react';
import ReactDOM from 'react-dom';

import TicTacToe from './Components/TicTacToe';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <TicTacToe />
      </div>
    );
  }
}