import React from 'react';
import CardUnit from './CardUnit';
import CardOrder from './CardOrder';
import CardSelector from './../CardSelector/CardSelector';

function CardItem(props) {

  let card = null;
  if (props.card.type !== 'ordre') {
    card = (
      <React.Fragment>
        <CardUnit unit={props.card}></CardUnit>
        {
          props.counter !== "none" ?
            <CardSelector
              count={props.card.count}
              name={props.card.nom}
            >
            </CardSelector> : null
        }

      </React.Fragment>

    );
  } else {
    card = (
      <CardOrder order={props.card}></CardOrder>
    )
  }

  return (
    <React.Fragment>
      {card}
    </React.Fragment>
  );
}

export default CardItem;
