import React from 'react';
import Draft from './Draft';
import CardItem from '../../Decks/DeckItem/CardItem/CardItem'
import styles from './Board.module.css';
import { PHASES } from './../../../game/PAFF';

function Board(props) {

    const selectedDeckHandler = (deck) => {
        // props.G.decks[props.playerID] = deck;
        props.moves.setDeck(deck, props.playerID);
    }

    const topPlayer = () => {
        return props.gameMetadata.find((player) => player.id == props.playerID)
    }

    const bottomPlayer = () => {
        return props.gameMetadata.find((player) => player.id != props.playerID)
    }

    const cellStyle = {
        border: '1px solid #555',
        width: '100px',
        height: '150px',
        textAlign: 'center',
    };


    let screenPhase = '';

    switch (props.ctx.phase) {
        case PHASES.DRAFT:
            screenPhase = (<Draft onClickHandler={selectedDeckHandler}></Draft>);
            break;
        case PHASES.DEPLOYMENT:

            let tbody = [];

            const spacePositions = [3, 7, 12, 16, 21, 25, 30, 34, 39, 43, 48, 52];

            for (let i = 1; i < 55; i++) {
                if (spacePositions.includes(i)) {
                    tbody.push(<div key={i} className="space"></div>);
                } else {
                    tbody.push(<div style={cellStyle} key={i}>
                        {props.G.cells[i]}
                    </div>);
                }
            }

            console.log(props.G.decks);
            console.log(props.playerID);

            const cards = props.G.decks[props.playerID].cartes.map((card, index) => {
                return (
                    <div className={styles.Card} key={index}>
                        <CardItem counter="none"
                            card={card.carte}>
                        </CardItem>
                    </div>
                );
            });

            screenPhase = (
                <div>
                    <div>
                        {topPlayer().name}
                    </div>
                    <div className={styles.Cards}>
                        {cards}

                    </div>
                    <div className={styles.Board}>
                        {tbody}
                    </div>

                    <div>
                        {bottomPlayer().name}
                    </div>
                </div>);
            break;
        default:
            console.log('No phase');
    }

    return (
        <div>
            {screenPhase}
        </div>
    );
}

export default Board;