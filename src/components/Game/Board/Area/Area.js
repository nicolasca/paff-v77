import React from 'react';
import SquareDrop from './../Square/SquareDrop';
import CardInGame from './../../CardInGame/CardInGame';
import CardUnit from './../../../Decks/DeckItem/CardUnit/CardUnit';
import IntiativeModal from './../InitiativeModal/InitiativeModal';
import { PHASES } from './../../../../game/PAFF';
import styles from './Area.module.scss';


function Area(props) {

    const renderSquare = (i, squareId) => {

        return (
            <SquareDrop
                key={i}
                square={squareId}
                moveCard={(item) => props.onDrop(item, squareId)}>
                {
                    props.squares[squareId] ?
                        <div className={styles.Card}
                            onMouseEnter={props.mouseEnter.bind(this, props.squares[squareId])}
                            onMouseLeave={props.mouseLeave}>
                            <CardInGame
                                unit={props.squares[squareId]}
                                previousSquareId={squareId}>
                            </CardInGame>
                        </div>
                        : null
                }

            </SquareDrop>
        );
    }

    let tbody = [];
    const spacePositions = [3, 7, 12, 16, 21, 25, 30, 34, 39, 43, 48, 52];
    let squareId = 1;

    for (let i = 1; i < 55; i++) {
        if (spacePositions.includes(i)) {
            tbody.push(<div key={i} className="space"></div>);
        } else {

            tbody.push(renderSquare(i, squareId));
            squareId += 1;
        }
    }

    const hands = props.hands[props.playerID].map((card, index) => {
        return (

            <div className={styles.Card} key={index}
                onMouseEnter={props.mouseEnter.bind(this, card)}
                onMouseLeave={props.mouseLeave}
            >
                <CardInGame unit={card}>
                </CardInGame>
            </div>


        );
    });

    console.log(props.playerID);
    console.log('player0', props.player0);
    console.log('player1', props.player1);
    console.log(props.hands);


    return (
        <div>
            {props.ctx.phase === PHASES.INITIATIVE ?
                <IntiativeModal
                    player0={props.player0.name}
                    player1={props.player1.name}
                    score0={props.score0}
                    score1={props.score1}
                    onRollDiceHandler={props.onRollDice}
                    hasResult={props.initiativeFinished}
                >
                </IntiativeModal> : null}

            <div>
                <h2>{props.player0.name}</h2>
            </div>
            {
                +props.playerID === props.player0.id ?
                    <div className={styles.Cards}>
                        {hands}
                    </div>
                    : null
            }

            <div className={styles.Board}>
                {tbody}
            </div>

            {
                +props.playerID === props.player1.id ?
                    <div className={styles.Cards}>
                        {hands}
                    </div>
                    : null
            }

            <div>
                <h2>{props.player1.name}</h2>
            </div>


            <div className={styles.CardHover}>
                {props.cardHover ?
                    <CardUnit unit={props.cardHover}>
                    </CardUnit>
                    : null
                }

            </div>
        </div>
    );
}

export default Area;