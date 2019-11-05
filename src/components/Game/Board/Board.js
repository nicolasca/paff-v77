import React from 'react';
import Draft from './Draft';
import CardItem from '../../Decks/DeckItem/CardItem/CardItem'
import styles from './Board.module.css';
import { PHASES } from './../../../game/PAFF';
import IntiativeModal from './InitiativeModal/InitiativeModal';

function Board(props) {

    const selectedDeckHandler = (deck) => {
        props.moves.setDeck(deck, props.playerID);
    }

    const getPlayer0 = () => {
        return props.gameMetadata.find((player) => player.id == 0)
    }

    const getPlayer1 = () => {
        return props.gameMetadata.find((player) => player.id == 1)
    }

    const topPlayer = () => {
        return props.gameMetadata.find((player) => player.id == props.playerID)
    }

    const bottomPlayer = () => {
        return props.gameMetadata.find((player) => player.id != props.playerID)
    }

    const onRollDice = () => {
        props.moves.rollDice(props.playerID);
    }

    const initiativeFinished = () => {
        console.log(props.G.initiativeScore[0] !== null && props.G.initiativeScore[1] !== null);

        return props.G.initiativeScore[0] !== null && props.G.initiativeScore[1] !== null;
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
        case PHASES.INITIATIVE:

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
                    {props.ctx.phase === PHASES.INITIATIVE ?
                        <IntiativeModal
                            player0={getPlayer0().name}
                            player1={getPlayer1().name}
                            score0={props.G.initiativeScore[0]}
                            score1={props.G.initiativeScore[1]}
                            onRollDiceHandler={onRollDice}
                            hasResult={props.G.initiativeScore[0] !== null && props.G.initiativeScore[1] !== null}
                        >
                        </IntiativeModal> : null}

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