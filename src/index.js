import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import App from './App';
import stylesheet from './style.css';

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <App/>
    </AppContainer>,
    document.getElementById('app')
  );
};

render();

if(module.hot) {
  module.hot.accept('./App', render);
}