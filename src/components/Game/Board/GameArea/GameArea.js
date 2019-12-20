import React, { useState } from 'react';
import { PHASES } from '../../../../game/PAFF';
import useComponentVisible from '../../../UI/clickOutsideHook';
import CardInGame from '../../CardInGame/CardInGame';
import Battleground from '../Battleground/Battleground';
import GameInformation from '../GameInformation/GameInformation';
import IntiativeModal from '../InitiativeModal/InitiativeModal';
import Reserve from '../Reserve/Reserve';
import styles from './GameArea.module.scss';


function GameArea({ G, ctx, gameMetadata, onRollDice, initiativeFinished, moves, events, onDrop, playerID }) {

  const [isReserveOpen, setReserveOpen] = useState(false);
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

  const getPlayer0 = () => {
    return gameMetadata.find((player) => player.id === 0)
  }

  const getPlayer1 = () => {
    return gameMetadata.find((player) => player.id === 1)
  }

  const topPlayer = () => {
    return gameMetadata.find((player) => player.id === 0)
  }

  const bottomPlayer = () => {
    return gameMetadata.find((player) => player.id === 1)
  }


  let playerHand = [];
  if (G.hands[playerID]) {
    playerHand = G.hands[playerID].map((card, index) => {
      return (

        <div className={styles.Card} key={index}>
          <CardInGame unit={card}>
          </CardInGame>
        </div>
      );
    });
  }


  const otherPlayerID = +playerID === 0 ? 1 : 0;
  const otherHand = G.hands[otherPlayerID].map((card, index) => {
    return (
      <div className={styles.HiddenCard} key={index}>
      </div>
    );
  });

  const onClickReserveHandler = () => {
    setReserveOpen(true);
    setIsComponentVisible(true);
  };


  return (
    <React.Fragment>

      <div className={styles.ScreenGame}>

        {/* Cards inside the reserve. Can be dropped into the battleground */}
        {ctx.phase === PHASES.CHOOSE_ORDERS ?
          <React.Fragment>
            {
              isReserveOpen && isComponentVisible ?
                <div className={styles.Reserve} ref={ref}>
                  {
                    <Reserve
                      topHand={playerHand}
                      bottomHand={otherHand}>
                    </Reserve>
                  }
                </div> : null
            }
          </React.Fragment>
          : null
        }


        {/* During the initiative phase, display the modal to roll the dices */}
        {ctx.phase === PHASES.INITIATIVE ?
          <IntiativeModal
            player0={getPlayer0().name}
            player1={getPlayer1().name}
            score0={G.initiativeScore[0]}
            score1={G.initiativeScore[1]}
            onRollDiceHandler={onRollDice}
            hasResult={initiativeFinished}
          >
          </IntiativeModal> : null}

        {/* Both top and bottom hands displayed during the deployment phase */}
        {ctx.phase === PHASES.DEPLOYMENT ?
          <React.Fragment>
            {
              + playerID === getPlayer0().id ?

                <div className={`${styles.Hand} ${styles.HandTop}`} >
                  {playerHand}
                </div>
                :
                <div className={`${styles.Hand} ${styles.HandTop}`} >
                  {otherHand}
                </div>
            }

            {
              +playerID === getPlayer1().id ?
                <div className={`${styles.Hand} ${styles.HandBottom}`}>
                  {playerHand}
                </div>
                :
                <div className={`${styles.Hand} ${styles.HandBottom}`}>
                  {otherHand}
                </div>
            }
          </React.Fragment>
          : null
        }


        <div className={styles.ZoneDeclaration}>
          <div> A1 </div>
          <div> B1 </div>
          <div> F1 </div>
          <div> F2 </div>
          <div> B2 </div>
          <div> A2 </div>
        </div>


        {/* Game information with: player names, score, orders */}
        <div className={styles.GameInformationContainer}>
          <GameInformation
            G={G}
            ctx={ctx}
            playerID={playerID}
            player0={getPlayer0()}
            player1={getPlayer1()}
            topPlayer={topPlayer()}
            bottomPlayer={bottomPlayer()}
            moves={moves}
            events={events}
            onClickReserveHandler={onClickReserveHandler}>
          </GameInformation>

        </div>

        {/* Battleground area. Where the action takes place */}
        <div className={styles.BattlegroundContainer}>
          <Battleground
            G={G}
            onDrop={onDrop}
            moves={moves}
            playerID={playerID}
          >
          </Battleground>
        </div>

      </div >
    </React.Fragment>

  );
}

export default GameArea;