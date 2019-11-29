import React, { useState } from 'react';
import { PHASES } from '../../../../game/PAFF';
import useComponentVisible from '../../../UI/clickOutsideHook';
import CardInGame from '../../CardInGame/CardInGame';
import Battleground from '../Battleground/Battleground';
import GameInformation from '../GameInformation/GameInformation';
import IntiativeModal from '../InitiativeModal/InitiativeModal';
import Reserve from '../Reserve/Reserve';
import styles from './GameArea.module.scss';


function GameArea(props) {

  const [isReserveOpen, setReserveOpen] = useState(false);
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(true);

  const getPlayer0 = () => {
    return props.gameMetadata.find((player) => player.id === 0)
  }

  const getPlayer1 = () => {
    return props.gameMetadata.find((player) => player.id === 1)
  }

  const topPlayer = () => {
    return props.gameMetadata.find((player) => player.id === 0)
  }

  const bottomPlayer = () => {
    return props.gameMetadata.find((player) => player.id === 1)
  }


  const playerHand = props.G.hands[props.playerID].map((card, index) => {
    return (

      <div className={styles.Card} key={index}>
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

  const onClickReserveHandler = () => {
    setReserveOpen(true);
    setIsComponentVisible(true);
  };


  return (
    <React.Fragment>

      <div className={styles.ScreenGame}>

        {/* Cards inside the reserve. Can be dropped into the battleground */}
        {props.ctx.phase === PHASES.CHOOSE_ORDERS ?
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
        {props.ctx.phase === PHASES.INITIATIVE ?
          <IntiativeModal
            player0={getPlayer0().name}
            player1={getPlayer1().name}
            score0={props.G.initiativeScore[0]}
            score1={props.G.initiativeScore[1]}
            onRollDiceHandler={props.onRollDice}
            hasResult={props.initiativeFinished}
          >
          </IntiativeModal> : null}

        {/* Both top and bottom hands displayed during the deployment phase */}
        {props.ctx.phase === PHASES.DEPLOYMENT ?
          <React.Fragment>
            {
              + props.playerID === getPlayer0().id ?

                <div className={`${styles.Hand} ${styles.HandTop}`} >
                  {playerHand}
                </div>
                :
                <div className={`${styles.Hand} ${styles.HandTop}`} >
                  {otherHand}
                </div>
            }

            {
              +props.playerID === getPlayer1().id ?
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
            G={props.G}
            ctx={props.ctx}
            player0={getPlayer0()}
            player1={getPlayer1()}
            topPlayer={topPlayer()}
            bottomPlayer={bottomPlayer()}
            moves={props.moves}
            events={props.events}
            onClickReserveHandler={onClickReserveHandler}>
          </GameInformation>

        </div>

        {/* Battleground area. Where the action takes place */}
        <div className={styles.BattlegroundContainer}>
          <Battleground
            G={props.G}
            onDrop={props.onDrop}
          >
          </Battleground>
        </div>

      </div >
    </React.Fragment>

  );
}

export default GameArea;