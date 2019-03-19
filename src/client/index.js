import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app.jsx'

const config = {
  "apiUrl": "http://localhost:3000/api/contatos"
}

ReactDOM.render(
  <App config = { config } />,
  document.getElementById('app')
);

module.hot.accept();
