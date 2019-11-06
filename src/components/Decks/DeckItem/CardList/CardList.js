import React, { useState, useEffect } from 'react';
import CardUnit from '../CardUnit/CardUnit';
import CardOrder from '../CardOrder/CardOrder';
import CardSelector from './../CardSelector/CardSelector';
import styles from './CardList.module.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import { config } from '../../../../config';

function CardList(props) {
  const [orders, setOrders] = useState([]);

  // Separer les unites et ordres
  const unites = Object.keys(props.cards).filter((key) => {
    return props.cards[key].type !== 'ordre';
  });

  const cardsUnites = unites.map((key, index) => {

    return (
      <div className={styles.cardItem} key={index}>
        <CardUnit
          unit={props.cards[key]}>
        </CardUnit>

        <CardSelector
              count={props.cards[key].count}
              name={props.cards[key].nom}
            >
            </CardSelector> 
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
            <CardOrder
              order={ordre}>
            </CardOrder>
          </div>
        )
      });
      setOrders(cardsOrdres);
    }

    if (props.faction) getOrders();

  }, [props.faction]);




  return (
    <div className={styles.CardList}>
      <h3 className="title is-4">Unités</h3>
      <div className={styles.Unites}>{cardsUnites}</div>
      <h3 className="title is-4">Ordres</h3>
      <div className={styles.Ordres}>{orders}</div>
    </div>
  );
}

export default CardList;

CardList.propTypes = {
  cards: PropTypes.object,
  faction: PropTypes.string,
} 
