import React, { FunctionComponent } from 'react';
import { IFaction } from '../../../models/IFaction';
import CardList from './CardList/CardList';
import styles from './DeckItem.module.scss';

interface DeckItemProps {
  cardsToDisplay: any;
  faction: IFaction;
}

const DeckItem: FunctionComponent<DeckItemProps> = (props) => {
  return (
    <div className={styles.CardList} >
      <div>
        <CardList
          cards={props.cardsToDisplay}
          faction={props.faction}
        >
        </CardList>
      </div>
    </div>
  );
}


export default DeckItem;