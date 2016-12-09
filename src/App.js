import React from 'react';
import ReactDOM from 'react-dom';

import TicTacToe from './Components/TicTacToe';

import stylesheet from './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div id="app-container">
        <TicTacToe />
      </div>
    );
  }
}