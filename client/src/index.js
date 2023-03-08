import React from 'react';
import ReactDOM from 'react-dom/client';
import Buton from './Components/button/Buton';

import FullWidthTextField from './Components/input/FullWidthTextField';
import Login from './Pages/Login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <div>
    <FullWidthTextField />
    <Buton />
    <Login />
  </div>,
);
