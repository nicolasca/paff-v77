import React, { FunctionComponent } from 'react';
import { IUnit } from '../../../models/ICard';
import { IFaction } from '../../../models/IFaction';
import CardList from './CardList/CardList';
import styles from './DeckItem.module.scss';

interface DeckItemProps {
  cardsToDisplay: IUnit[];
  faction: IFaction;
}

const DeckItem: FunctionComponent<DeckItemProps> = (props) => {
  return (
    <div className={styles.CardList} >
      <div>
        <CardList
          units={props.cardsToDisplay}
          faction={props.faction}
        >
        </CardList>
      </div>
    </div>
  );
}


export default DeckItem;