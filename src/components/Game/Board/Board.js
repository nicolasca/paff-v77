import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Draft from '../Draft/Draft';
import { PHASES } from './../../../game/PAFF';
import GameArea from './GameArea/GameArea';


function Board({ G, events, moves, playerID, ctx, gameMetadata }) {

  const [initiativeFinished, setInitiativeFinished] = useState(false);

  const selectedDeckHandler = (deck, orders) => {
    moves.setDeck(deck, playerID, orders);
  }



  const onRollDiceHandler = () => {
    moves.rollDice(playerID);
  }

  useEffect(() => {
    setInitiativeFinished(G.initiativeScore[0] !== null && G.initiativeScore[1] !== null);
    if (G.initiativeScore[0] !== null && G.initiativeScore[1] !== null
      && ctx.phase === PHASES.INITIATIVE) {
      setTimeout(() => {
        events.setPhase(PHASES.DEPLOYMENT);
      }, 5000);
    }
  }, [G.initiativeScore, ctx.phase, events]);

  const onDropHandler = (item, squareId) => {
    moves.drop({ card: item.card, squareId: squareId, previousSquareId: item.previousSquareId });
  }

  let screenPhase = '';

  switch (ctx.phase) {
    case PHASES.DRAFT:
      screenPhase = (<Draft onClickHandler={selectedDeckHandler}></Draft>);
      break;
    case PHASES.INITIATIVE:
    case PHASES.DEPLOYMENT:
    case PHASES.CHOOSE_ORDERS:

      screenPhase = (
        <GameArea
          G={G}
          ctx={ctx}
          moves={moves}
          events={events}
          onDrop={(item, squareId) => onDropHandler(item, squareId)}
          onRollDice={onRollDiceHandler}
          gameMetadata={gameMetadata}
          playerID={playerID}
          initiativeFinished={initiativeFinished}
        >
        </GameArea>)

      break;
    default:
      console.log('No phase');
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {screenPhase}
      </div>
    </DndProvider>

  );
}


export default Board;