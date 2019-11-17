import React from 'react';
import SquareDrop from './../Square/SquareDrop';
import OrdersProgramming from './../OrdersProgramming/OrdersProgramming';
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
                    props.G.squares[squareId] ?
                        <div className={styles.Card}
                            onMouseEnter={props.mouseEnter.bind(this, props.G.squares[squareId])}
                            onMouseLeave={props.mouseLeave.bind(this, props.G.squares[squareId])}
                        >
                            <CardInGame
                                unit={props.G.squares[squareId]}
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

    const playerHand = props.G.hands[props.playerID].map((card, index) => {
        return (

            <div className={styles.Card} key={index}
                onMouseEnter={props.mouseEnter.bind(this, card)}
                onMouseLeave={props.mouseLeave.bind(this, card)}
            >
                <CardInGame unit={card}>
                </CardInGame>
            </div>


        );
    });

    const otherPlayerID = +props.playerID === 0 ? 1 : 0;
    const otherHand = props.G.hands[otherPlayerID].map((card, index) => {
        return (
            <div className={styles.HiddenCard} key={index}>
            </div>
        );
    });

    const endDeploymentHandler = () => {
        props.events.endPhase();
    }

    const onHideHandler = () => {
        props.moves.hideShowOrders();
    }

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
                        score0={props.G.initiativeScore[0]}
                        score1={props.G.initiativeScore[1]}
                        onRollDiceHandler={props.onRollDice}
                        hasResult={props.initiativeFinished}
                    >
                    </IntiativeModal> : null}

                <div className={styles.PlayerTop}>
                    <p>{props.player0.name}</p>
                    <p className={styles.FactionPlayer}>
                        <span>{props.G.decks[0].cartes[0].carte.faction.nom}</span>
                        <img src={process.env.PUBLIC_URL + 'assets/factions/logo-' + props.G.decks[0].cartes[0].carte.faction.image}
                            alt={props.G.decks[0].cartes[0].carte.faction.nom + ' image'} />
                    </p>
                </div>


                <div className={styles.OrdersTop}>

                    {
                        (+props.playerID === props.player0.id ||
                            props.G.showOrders[props.topPlayer.id]) ?
                            <OrdersProgramming
                                orders={props.G.availableOrders[0]}>
                            </OrdersProgramming> : null
                    }
                    {
                        +props.playerID === props.player0.id ?
                            <div>
                                {
                                    props.G.showOrders[props.playerID] ?
                                        <button className="button" onClick={onHideHandler}>Cacher</button>
                                        :
                                        <button className="button" onClick={onHideHandler}>Montrer</button>
                                }
                            </div>
                            :
                            null
                    }
                </div>

                <div className={styles.OrdersBottom}>

                    {
                        (+props.playerID === props.player1.id ||
                            props.G.showOrders[props.bottomPlayer.id]) ?
                            <OrdersProgramming
                                orders={props.G.availableOrders[1]}>
                            </OrdersProgramming> : null
                    }
                    {
                        +props.playerID === props.player1.id ?
                            <div>
                                {
                                    props.G.showOrders[props.playerID] ?
                                        <button className="button" onClick={onHideHandler}>Cacher</button>
                                        :
                                        <button className="button" onClick={onHideHandler}>Montrer</button>
                                }
                            </div>
                            :
                            null
                    }
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
                        <span>{props.G.decks[1].cartes[0].carte.faction.nom}</span>
                        <img src={process.env.PUBLIC_URL + 'assets/factions/logo-' + props.G.decks[1].cartes[0].carte.faction.image}
                            alt={props.G.decks[1].cartes[0].carte.faction.nom + ' image'} />
                    </p>
                </div>

                {
                    props.ctx.phase === PHASES.DEPLOYMENT ?
                        <div className={styles.EndDeployment}>
                            <button className="button" onClick={endDeploymentHandler}>
                                Valider le déploiement
                                </button>
                        </div>
                        : null
                }

                {props.cardHover ?
                    <div className={styles.CardHover}>
                        <CardUnit unit={props.cardHover}>
                        </CardUnit>
                    </div>
                    : null
                }

            </div >
        </React.Fragment>

    );
}

export default Area;