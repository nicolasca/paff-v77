import React from 'react';

function CardItem(props) {
console.log();

  return (
    <div>
      <div>
        <span>Nom: { props.unit.name }</span> <br />
        <span> { props.unit.depl } pt(s)</span>
      </div>
    </div>
  );
}

export default CardItem;