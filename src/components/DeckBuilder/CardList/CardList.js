import React from 'react';
import CardItem from '../CardItem/CardItem';
import CardSelector from './../CardSelector/CardSelector';
import styles from './CardList.module.css';

function CardList(props) {
  
  const cardList = props.units.map((unit, index) => {
    return (
      <div className={styles.cardItem} key={index}>
        <CardItem unit={unit} faction={props.faction}>
        </CardItem>
       <CardSelector
       count={unit.count}
       clickedPlus={(e) => props.clickedPlus(unit.name)}
      clickedMinus={(e) => props.clickedMinus(unit.name)}
      >

       </CardSelector>
      </div>
      
    )
  });

  return (
    <div>
      { cardList }
    </div>
  );
}

export default CardList;