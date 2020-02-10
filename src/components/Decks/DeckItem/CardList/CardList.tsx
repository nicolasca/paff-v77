import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";
import { config } from "../../../../config";
import { IOrder, IUnit } from "../../../../models/ICard";
import { IFaction } from "../../../../models/IFaction";
import CardOrder from "../CardItem/CardOrder";
import CardUnit from "../CardItem/CardUnit";
import CardUnitSephosi from "../CardItem/CardUnitSephosi";
import CardSelector from "../CardSelector/CardSelector";
import styles from "./CardList.module.css";

interface CardListProps {
  units: IUnit[];
  faction: IFaction;
}

const CardList: FunctionComponent<CardListProps> = props => {
  const [orders, setOrders] = useState([]);

  const cardsUnites = props.units.map((unit, index) => {
    return (
      <div className={styles.cardItem} key={index}>
        {props.faction.name === "Sephosi" ? (
          <CardUnitSephosi unit={unit}></CardUnitSephosi>
        ) : (
            <CardUnit unit={unit}></CardUnit>
        )}

        <CardSelector
          count={unit.count! | 0}
          name={unit.nom}
        ></CardSelector>
      </div>
    );
  });

  useEffect(() => {
    async function getOrders() {
      const ordresAll = await axios.get(config.host + ":3008/ordres");

      // Populate les ordres
      const ordres = ordresAll.data.filter((order: IOrder) => {
        return (
          (typeof order.faction === "object" &&
            order.faction.slug === props.faction.slug) ||
          order.faction === "commun"
        );
      });

      const cardsOrdres = ordres.map((ordre: IOrder, index: number) => {
        return (
          <div className={styles.cardItem} key={index}>
            <CardOrder order={ordre}></CardOrder>
          </div>
        );
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
};

export default CardList;
