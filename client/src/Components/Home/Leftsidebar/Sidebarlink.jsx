import React from 'react';
import './sidebar.css';

function Sidebarlink({ text, Icon }) {
  return (
    <div className="link">
      <Icon style={{ marginRight: '7px' }} />
      {text}
    </div>
  );
}
export default Sidebarlink;
