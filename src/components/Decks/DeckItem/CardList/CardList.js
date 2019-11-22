import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { config } from '../../../../config';
import CardItem from '../CardItem/CardItem';
import styles from './CardList.module.css';

function CardList(props) {
  const [orders, setOrders] = useState([]);

  // Separer les unites et ordres
  const unites = Object.keys(props.cards).filter((key) => {
    return props.cards[key].type !== 'ordre';
  });

  const cardsUnites = unites.map((key, index) => {

    return (
      <div className={styles.cardItem} key={index}>
        <CardItem
          card={props.cards[key]}>
        </CardItem>
      </div>
    );
  });

  useEffect(() => {
    async function getOrders() {
      const ordresAll = await axios.get(config.host + ":3008/ordres");

      // Populate les ordres
      const ordres = ordresAll.data.filter((ordre) => {
        return ordre.faction === 'commun' || ordre.faction.slug === props.faction;
      });


      const cardsOrdres = ordres.map((ordre, index) => {
        return (
          <div className={styles.cardItem} key={index}>
            <CardItem
              card={ordre}>
            </CardItem>
          </div>
        )
      });
      setOrders(cardsOrdres);
    }

    if (props.faction) getOrders();

  }, [props.faction]);




  return (
    <div className={styles.CardList}>
      <h3 className="title">Unités</h3>
      <div className={styles.Unites}>{cardsUnites}</div>
      <h3 className="title">Ordres</h3>
      <div className={styles.Ordres}>{orders}</div>
    </div>
  );
}

export default CardList;

CardList.propTypes = {
  cards: PropTypes.object,
  faction: PropTypes.string,
} 