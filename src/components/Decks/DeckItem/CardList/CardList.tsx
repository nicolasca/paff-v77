import React, { FunctionComponent, useEffect } from "react";
import { IFaction } from "../../../../models/IFaction";
import CardUnit from "../CardItem/CardUnit";
import CardSelector from "../CardSelector/CardSelector";
import styles from "./CardList.module.css";

interface CardListProps {
  cards: any;
  faction: IFaction;
}

const CardList: FunctionComponent<CardListProps> = props => {

  const [unitsOptions, setUnitsOptions] = React.useState<JSX.Element[]>([]);

  useEffect(() => {
    if (props.cards) {
      const options = Object.keys(props.cards).map((key, index) => {
        const unit = props.cards[key];

        return (
          <div className={styles.cardItem} key={index}>
            {/* {props.faction.name === "Sephosi" ? (
              <CardUnitSephosi unit={unit}></CardUnitSephosi>
            ) : (
                <CardUnit unit={unit}></CardUnit>
              )} */}
            <CardUnit unit={unit}></CardUnit>
            <CardSelector count={unit.count! | 0} name={unit.name}></CardSelector>
          </div>
        );
      });
      setUnitsOptions(options);
    }


  }, [props]);

  return (
    <div className={styles.CardList}>
      <h3>Unités</h3>
      <div className={styles.Unites}>
        {unitsOptions}
      </div>
    </div>
  );
};

export default CardList;
