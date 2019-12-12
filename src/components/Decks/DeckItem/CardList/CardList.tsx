import axios from 'axios';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { config } from '../../../../config';
import { IOrder } from '../../../../models/ICard';
import { IFaction } from '../../../../models/IFaction';
import CardOrder from '../CardItem/CardOrder';
import styles from './CardList.module.css';
import CardUnit from '../CardItem/CardUnit';
import CardSelector from '../CardSelector/CardSelector';

interface CardListProps {
  cards: any;
  faction: IFaction;
}

const CardList: FunctionComponent<CardListProps> = (props) => {
  const [orders, setOrders] = useState([]);

  // Separer les unites et ordres
  const unites = Object.keys(props.cards).filter((key) => {
    return props.cards[key].type !== 'ordre';
  });

  const cardsUnites = unites.map((key: string, index: number) => {

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
      const ordres = ordresAll.data.filter((order: IOrder) => {
        return (typeof order.faction === 'object' && order.faction.slug === props.faction.slug) || order.faction === 'commun';
      });


      const cardsOrdres = ordres.map((ordre: IOrder, index: number) => {
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
      <h3>Unités</h3>
      <div className={styles.Unites}>{cardsUnites}</div>
      <h3>Ordres</h3>
      <div className={styles.Ordres}>{orders}</div>
    </div>
  );
}

export default CardList;