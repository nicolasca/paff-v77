import React from 'react';
import { PHASES } from '../../../../game/PAFF';
import OrdersProgramming from '../OrdersProgramming/OrdersProgramming';
import ReserveButton from '../Reserve/ReserveButton';
import BlackHole from './BlackHole/BlackHole';
import styles from './GameInformation.module.scss';
import SelectedOrders from './SelectedOrders/SelectedOrders';

function GameInformation({ G, ctx, events, moves, player0, player1, onClickReserveHandler, deploymentPoints, playerID }) {

  const endDeploymentHandler = () => {
    events.endPhase();
  }
  const onRemoveCardHandler = (item) => {
    moves.removeCardFromBoard({ card: item.card, previousSquareId: item.previousSquareId });
  }

  function onChangeScoreHandler(playerID, event) {
    moves.changeScoreVictory(playerID, event.target.value);
  }

  return (
    <div className={styles.GameInformation}>

      <div className={styles.PlayerTop + ' ' + styles.Player}>
        <input value={G.victoryPoints[0]} onChange={(event) => onChangeScoreHandler(0, event)} type="number" />
        <p>{player0.name}</p>
        <p className={styles.FactionPlayer}>
          <span>{G.decks[0].cartes[0].carte.faction.nom}</span>
          <img src={process.env.PUBLIC_URL + 'assets/factions/logo-' + G.decks[0].cartes[0].carte.faction.image}
            alt={G.decks[0].cartes[0].carte.faction.nom + ' image'} />
        </p>
      </div>

      <div className={styles.PlayerBottom + ' ' + styles.Player}>
        <input value={G.victoryPoints[1]} onChange={(event) => onChangeScoreHandler(1, event)} type="number" />
        <p>{player1.name}</p>
        <p className={styles.FactionPlayer}>
          <span>{G.decks[1].cartes[0].carte.faction.nom}</span>
          <img src={process.env.PUBLIC_URL + 'assets/factions/logo-' + G.decks[1].cartes[0].carte.faction.image}
            alt={G.decks[1].cartes[0].carte.faction.nom + ' image'} />
        </p>
      </div>

      {playerID ?

        <>

          {
            ctx.phase === PHASES.DEPLOYMENT ?
              <div className={styles.Deployment}>
                <div>
                  <span> Pts de déploiement de {player0.name}: </span> <span>{deploymentPoints[0]}</span>
                </div>
                <div>
                  <span> Pts de déploiement de {player1.name}: </span> <span>{deploymentPoints[1]}</span>
                </div>
                <div className={styles.EndDeployment}>
                  <button className="button" onClick={endDeploymentHandler}>
                    Valider le déploiement</button>
                </div>
              </div>

              :
              <div className={styles.BlackHoleReserve}>
                <BlackHole
                  removeCardFromBoard={(item) => onRemoveCardHandler(item)}>
                </BlackHole>
                <div>

                </div>

                {ctx.phase === PHASES.CHOOSE_ORDERS ||
                  ctx.phase === PHASES.APPLY_ORDERS ?
                  <ReserveButton
                    onClickReserve={onClickReserveHandler}>
                  </ReserveButton>
                  : null
                }
              </div>
          }


          {ctx.phase === PHASES.CHOOSE_ORDERS ?
            <React.Fragment>

              <div className={styles.OrdersTop}>

                {
                  +playerID === player0.id ?
                    <OrdersProgramming
                      moves={moves}
                      orders={G.availableOrders[0]}>
                    </OrdersProgramming> : null
                }
              </div>

              <div className={styles.OrdersBottom}>

                {
                  +playerID === player1.id ?
                    <OrdersProgramming
                      moves={moves}

                      orders={G.availableOrders[1]}>
                    </OrdersProgramming> : null
                }
              </div>
            </React.Fragment>
            : null
          }

          {ctx.phase === PHASES.APPLY_ORDERS ?
            <div className={styles.SelectedOrdresContainer}>
              <SelectedOrders
                events={events}
                selectedOrdersProgs={G.selectedOrdersProgs}>
              </SelectedOrders>
            </div>

            : null
          }

        </>

        : null
      }

    </div>
  )
}

export default GameInformation;