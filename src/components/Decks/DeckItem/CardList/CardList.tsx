import React, { FunctionComponent, useEffect } from "react";
import CardUnit from "../CardItem/CardUnit";
import CardSelector from "../CardSelector/CardSelector";
import styles from "./CardList.module.css";
import { IEntity } from "../../../../models/IEntity";

interface CardListProps {
  cards: any;
  entity: IEntity;
}

const CardList: FunctionComponent<CardListProps> = (props) => {
  const [unitsOptions, setUnitsOptions] = React.useState<JSX.Element[]>([]);

  useEffect(() => {
    if (props.cards) {
      const options = Object.keys(props.cards).map((key, index) => {
        const card = props.cards[key];
        console.log(card);

        return (
          <div className={styles.cardItem} key={index}>
            <CardUnit card={card.unit || card}></CardUnit>
            <CardSelector
              count={card.count! | 0}
              name={card.name || card.unit.name}
            ></CardSelector>
          </div>
        );
      });
      setUnitsOptions(options);
    }
  }, [props]);

  return (
    <div className={styles.CardList}>
      <h3>Unités</h3>
      <div className={styles.Unites}>{unitsOptions}</div>
    </div>
  );
};

export default CardList;
