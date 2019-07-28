import React from 'react';
import CardList from './CardList/CardList';
import styles from './DeckItem.module.scss';

function DeckItem(props) {

    return (
        <div className={styles.CardList} >
            <div>
                <CardList
                    cards={props.cardsToDisplay}
                    faction={props.selectedFaction}
                >
                </CardList>
            </div>
        </div>
    );
}


export default DeckItem;