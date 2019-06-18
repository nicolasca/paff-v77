import React from 'react';
import CardItem from '../CardItem/CardItem';
import CardSelector from './../CardSelector/CardSelector';
import styles from './CardList.module.css';

function CardList(props) {
  
  const cardList = Object.keys(props.units).map((key, index) => {

    return (
      <div className={styles.cardItem} key={index}>
        <CardItem unit={props.units[key]} faction={props.faction}>
        </CardItem>
       <CardSelector
       count={props.units[key].count}
       clickedPlus={(e) => props.clickedPlus(props.units[key].name)}
      clickedMinus={(e) => props.clickedMinus(props.units[key].name)}
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