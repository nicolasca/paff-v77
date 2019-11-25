import React from 'react';
import { PHASES } from '../../../../game/PAFF';
import OrdersProgramming from '../OrdersProgramming/OrdersProgramming';
import ReserveButton from '../Reserve/ReserveButton';
import BlackHole from './BlackHole/BlackHole';
import styles from './GameInformation.module.scss';

function GameInformation(props) {

    const endDeploymentHandler = () => {
        props.events.endPhase();
    }

    const onHideHandler = () => {
        props.moves.hideShowOrders();
    }

    const onRemoveCardHandler = (item) => {
        props.moves.removeCardFromBoard({ card: item.card, previousSquareId: item.previousSquareId });
    }

    return (
        <div className={styles.GameInformation}>

            <div className={styles.PlayerTop}>
                <input type="number" />
                <p>{props.player0.name}</p>
                <p className={styles.FactionPlayer}>
                    <span>{props.G.decks[0].cartes[0].carte.faction.nom}</span>
                    <img src={process.env.PUBLIC_URL + 'assets/factions/logo-' + props.G.decks[0].cartes[0].carte.faction.image}
                        alt={props.G.decks[0].cartes[0].carte.faction.nom + ' image'} />
                </p>
            </div>

            <div className={styles.BlackHoleReserve}>
                <BlackHole
                    removeCardFromBoard={(item) => onRemoveCardHandler(item)}>
                </BlackHole>
                <div>

                </div>
                <ReserveButton
                    onClickReserve={props.onClickReserveHandler}>
                </ReserveButton>
            </div>

            <div className={styles.PlayerBottom}>
                <input type="number" />
                <p>{props.player1.name}</p>
                <p className={styles.FactionPlayer}>
                    <span>{props.G.decks[1].cartes[0].carte.faction.nom}</span>
                    <img src={process.env.PUBLIC_URL + 'assets/factions/logo-' + props.G.decks[1].cartes[0].carte.faction.image}
                        alt={props.G.decks[1].cartes[0].carte.faction.nom + ' image'} />
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

                {
                    props.ctx.phase === PHASES.DEPLOYMENT ?
                        <div className={styles.EndDeployment}>
                            <button className="button" onClick={endDeploymentHandler}>
                                Valider le déploiement
                                </button>
                        </div>
                        : null
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
        </div>
    )
}

export default GameInformation;