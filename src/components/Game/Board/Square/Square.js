import React from 'react';

function Square(props) {

  const cellStyle = {
    width: '100px',
    height: '125px',
    textAlign: 'center',
    boxShadow: '1px 1px 2px 1px rgba(17, 16, 16, 0.44)',
  };

  return (
    <div style={cellStyle}>
      {props.children}
    </div>
  )
}

export default Square;