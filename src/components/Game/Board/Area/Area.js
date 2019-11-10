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
                            onMouseEnter={props.mouseEnter.bind(this, props.squares[squareId])}>
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

    const playerHand = props.hands[props.playerID].map((card, index) => {
        return (

            <div className={styles.Card} key={index}
                onMouseEnter={props.mouseEnter.bind(this, card)}
            >
                <CardInGame unit={card}>
                </CardInGame>
            </div>


        );
    });

    const otherPlayerID = +props.playerID === 0 ? 1 : 0;
    const otherHand = props.hands[otherPlayerID].map((card, index) => {
        return (
            <div className={styles.HiddenCard} key={index}>
            </div>
        );
    });

    return (
        <React.Fragment>
            {
                +props.playerID === props.player0.id ?
                    <div className={`${styles.Hand} ${styles.HandTop}`} >
                        {playerHand}
                    </div>
                    :
                    <div className={`${styles.Hand} ${styles.HandTop}`} >
                        {otherHand}
                    </div>
            }

            <div className={styles.ScreenGame}>
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

                <div className={styles.PlayerTop}>
                    <p>{props.player0.name}</p>
                    <p className={styles.FactionPlayer}>
                        <span>{props.decks[0].cartes[0].carte.faction.nom}</span>
                        <img src={process.env.PUBLIC_URL + 'assets/factions/logo-' + props.decks[0].cartes[0].carte.faction.image}
                            alt={props.decks[0].cartes[0].carte.faction.nom + ' image'} />
                    </p>
                </div>


                <div className={styles.Board}>
                    {tbody}
                </div>

                {
                    +props.playerID === props.player1.id ?
                        <div className={`${styles.Hand} ${styles.HandBottom}`}>
                            {playerHand}
                        </div>
                        :
                        <div className={`${styles.Hand} ${styles.HandBottom}`}>
                            {otherHand}
                        </div>
                }

                <div className={styles.PlayerBottom}>
                    <p>{props.player1.name}</p>
                    <p className={styles.FactionPlayer}>
                        <span>{props.decks[1].cartes[0].carte.faction.nom}</span>
                        <img src={process.env.PUBLIC_URL + 'assets/factions/logo-' + props.decks[1].cartes[0].carte.faction.image}
                            alt={props.decks[1].cartes[0].carte.faction.nom + ' image'} />
                    </p>
                </div>


                <div className={styles.CardHover}>
                    {props.cardHover ?
                        <CardUnit unit={props.cardHover}>
                        </CardUnit>
                        : null
                    }

                </div>
            </div >
        </React.Fragment>

    );
}

export default Area;