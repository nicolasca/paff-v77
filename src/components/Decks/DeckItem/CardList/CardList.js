import React from 'react';
import CardItem from '../CardItem/CardItem';
import styles from './CardList.module.css';
import PropTypes from 'prop-types';

function CardList(props) {

  // Separer les unites et ordres
  const unites = Object.keys(props.cards).filter((key) => {
    return props.cards[key].type !== 'ordre';
  });

  const ordres = Object.keys(props.cards).filter((key) => {
    return props.cards[key].type === 'ordre';
  });

  const cardsUnites = unites.map((key, index) => {

    return (
      <div className={styles.cardItem} key={index}>
        <CardItem
          card={props.cards[key]}>
        </CardItem>
      </div>

    )
  });

  const cardsOrdres = ordres.map((key, index) => {

    return (
      <div className={styles.cardItem} key={index}>
        <CardItem
          card={props.cards[key]}>
        </CardItem>
      </div>

    )
  });

  return (
    <div className={styles.CardList}>
      <h3 className="title is-4">Unités</h3>
      <div className={styles.Unites}>{cardsUnites}</div>
      <h3 className="title is-4">Ordres</h3>
      <div className={styles.Ordres}>{cardsOrdres}</div>
    </div>
  );
}

export default CardList;

CardList.propTypes = {
  cards: PropTypes.object,
} 
