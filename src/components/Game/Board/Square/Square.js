import React from 'react';

function Square(props) {

  const cellStyle = {
    border: '1px solid #555',
    width: '100px',
    height: '125px',
    textAlign: 'center',
    boxShadow: '1px 1px 2px 1px rgba(85, 85, 85, 0.5)',
  };

  return (
    <div style={cellStyle}>
      {props.children}
    </div>
  )
}

export default Square;