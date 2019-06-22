import React from 'react';
import CardUnit from './CardUnit';
import CardOrder from './CardOrder';
import CardSelector from './../CardSelector/CardSelector';

function CardItem(props) {

  let card = null;
  if (props.card.type !== 'ordre') {
    card = (
      <CardUnit unit={props.card}></CardUnit>
    );
  } else {
    card = (
      <CardOrder order={props.card}></CardOrder>
    )
  }

  return (
    <div>
      {card}
      <CardSelector
        count={props.card.count}
        name={props.card.name}
      >
      </CardSelector>
    </div>
  );
}

export default CardItem;
