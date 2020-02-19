import React, { FunctionComponent } from "react";
import { IUnit } from "../../../../models/ICard";
import { IFaction } from "../../../../models/IFaction";
import CardUnit from "../CardItem/CardUnit";
import CardUnitSephosi from "../CardItem/CardUnitSephosi";
import CardSelector from "../CardSelector/CardSelector";
import styles from "./CardList.module.css";

interface CardListProps {
  units: IUnit[];
  faction: IFaction;
}

const CardList: FunctionComponent<CardListProps> = props => {
  const cardsUnites = props.units.map((unit, index) => {
    return (
      <div className={styles.cardItem} key={index}>
        {props.faction.name === "Sephosi" ? (
          <CardUnitSephosi unit={unit}></CardUnitSephosi>
        ) : (
          <CardUnit unit={unit}></CardUnit>
        )}

        <CardSelector count={unit.count! | 0} name={unit.name}></CardSelector>
      </div>
    );
  });

  return (
    <div className={styles.CardList}>
      <h3>Unités</h3>
      <div className={styles.Unites}>{cardsUnites}</div>
    </div>
  );
};

export default CardList;
