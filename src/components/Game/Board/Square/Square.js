import React from 'react';

function Square(props) {

  const cellStyle = {
    border: '1px solid #555',
    width: '100px',
    height: '150px',
    textAlign: 'center',
};

  return (
    <div style={cellStyle}>
       { props.children }
    </div>
  )
}

export default Square;