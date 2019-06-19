import React from 'react';
import PropTypes from 'prop-types';
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
        clickedPlus={(e) => props.clickedPlus(props.card.name)}
        clickedMinus={(e) => props.clickedMinus(props.card.name)}
      >
      </CardSelector>
    </div>
  );
}

export default CardItem;

CardItem.propTypes = {
  clickedPlus: PropTypes.func,
  clickedMinus: PropTypes.func,
  card: PropTypes.object,
}