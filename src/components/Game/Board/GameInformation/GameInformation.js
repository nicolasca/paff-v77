import React from 'react';
import { PHASES } from '../../../../game/PAFF';
import OrdersProgramming from '../OrdersProgramming/OrdersProgramming';
import ReserveButton from '../Reserve/ReserveButton';
import BlackHole from './BlackHole/BlackHole';
import styles from './GameInformation.module.scss';

function GameInformation({ G, ctx, events, moves, player0, player1, onClickReserveHandler, topPlayer, bottomPlayer, playerID }) {

  const endDeploymentHandler = () => {
    events.endPhase();
  }

  const onHideHandler = () => {
    moves.hideShowOrders();
  }

  const onRemoveCardHandler = (item) => {
    moves.removeCardFromBoard({ card: item.card, previousSquareId: item.previousSquareId });
  }

  return (
    <div className={styles.GameInformation}>

      <div className={styles.PlayerTop + ' ' + styles.Player}>
        <input type="number" />
        <p>{player0.name}</p>
        <p className={styles.FactionPlayer}>
          <span>{G.decks[0].cartes[0].carte.faction.nom}</span>
          <img src={process.env.PUBLIC_URL + 'assets/factions/logo-' + G.decks[0].cartes[0].carte.faction.image}
            alt={G.decks[0].cartes[0].carte.faction.nom + ' image'} />
        </p>
      </div>

      <div className={styles.PlayerBottom + ' ' + styles.Player}>
        <input type="number" />
        <p>{player1.name}</p>
        <p className={styles.FactionPlayer}>
          <span>{G.decks[1].cartes[0].carte.faction.nom}</span>
          <img src={process.env.PUBLIC_URL + 'assets/factions/logo-' + G.decks[1].cartes[0].carte.faction.image}
            alt={G.decks[1].cartes[0].carte.faction.nom + ' image'} />
        </p>
      </div>

      {playerID ?

        <React.Fragment>

          <div className={styles.BlackHoleReserve}>
            <BlackHole
              removeCardFromBoard={(item) => onRemoveCardHandler(item)}>
            </BlackHole>
            <div>

            </div>

            {ctx.phase === PHASES.CHOOSE_ORDERS ?
              <ReserveButton
                onClickReserve={onClickReserveHandler}>
              </ReserveButton>
              : null
            }
          </div>

          <div className={styles.OrdersTop}>

            {
              (+playerID === player0.id ||
                G.showOrders[topPlayer.id]) ?
                <OrdersProgramming
                  orders={G.availableOrders[0]}>
                </OrdersProgramming> : null
            }
            {
              +playerID === player0.id ?
                <div>
                  {
                    G.showOrders[playerID] ?
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
              (+playerID === player1.id ||
                G.showOrders[bottomPlayer.id]) ?
                <OrdersProgramming
                  orders={G.availableOrders[1]}>
                </OrdersProgramming> : null
            }
            {
              +playerID === player1.id ?
                <div>
                  {
                    G.showOrders[playerID] ?
                      <button className="button" onClick={onHideHandler}>Cacher</button>
                      :
                      <button className="button" onClick={onHideHandler}>Montrer</button>
                  }
                </div>
                :
                null
            }
          </div>
        </React.Fragment>

        : null
      }

      {
        ctx.phase === PHASES.DEPLOYMENT ?
          <div className={styles.EndDeployment}>
            <button className="button" onClick={endDeploymentHandler}>
              Valider le déploiement
                                </button>
          </div>
          : null
      }

    </div>
  )
}

export default GameInformation;