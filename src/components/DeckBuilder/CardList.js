import React from 'react';
import CardItem from './CardItem';

function CardList(props) {
  
  const cardList = props.units.map((unit) => {
    return (
      <CardItem unit={unit} key={unit.id}></CardItem>
    )
  });

  console.log(cardList);
  

  return (
    <div>
      { cardList }
    </div>
  );
}

export default CardList;