/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './sidebar.css';

function Sidebarlink({ text, Icon, callback }) {
  return (
    <div className="link" onClick={callback}>
      <Icon style={{ marginRight: '7px' }} />
      {text}
    </div>
  );
}
export default Sidebarlink;
