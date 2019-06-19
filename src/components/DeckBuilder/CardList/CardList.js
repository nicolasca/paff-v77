import React from 'react';
import CardItem from '../CardItem/CardItem';
import styles from './CardList.module.css';

function CardList(props) {

  // Separer les unites et ordres
  const unites = Object.keys(props.cards).filter((key) => {
    return props.cards[key].type !== 'ordre';
  });

  const ordres = Object.keys(props.cards).filter((key) => {
    return props.cards[key].type === 'ordre';
  });

  console.log(props.cards);

  console.log(ordres);

  const cardsUnites = unites.map((key, index) => {

    return (
      <div className={styles.cardItem} key={index}>
        <CardItem
          card={props.cards[key]}
          clickedPlus={props.clickedPlus}
          clickedMinus={props.clickedMinus}>
        </CardItem>
      </div>

    )
  });

  const cardsOrdres = ordres.map((key, index) => {

    return (
      <div className={styles.cardItem} key={index}>
        <CardItem
          card={props.cards[key]}
          clickedPlus={props.clickedPlus}
          clickedMinus={props.clickedMinus}>
        </CardItem>
      </div>

    )
  });

  return (
    <div>
      <h3>Unités</h3>
      <div>{cardsUnites}</div>
      <h3>Ordres</h3>
      <div>{cardsOrdres}</div>
    </div>
  );
}

export default CardList;