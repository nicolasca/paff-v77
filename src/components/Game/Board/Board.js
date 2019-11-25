import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Draft from '../Draft/Draft';
import { PHASES } from './../../../game/PAFF';
import GameArea from './GameArea/GameArea';


function Board(props) {

  const [initiativeFinished, setInitiativeFinished] = useState(false);
  const { G, events } = props;

  const selectedDeckHandler = (deck, orders) => {
    props.moves.setDeck(deck, props.playerID, orders);
  }



  const onRollDiceHandler = () => {
    props.moves.rollDice(props.playerID);
  }

  useEffect(() => {
    setInitiativeFinished(G.initiativeScore[0] !== null && G.initiativeScore[1] !== null);
    if (G.initiativeScore[0] !== null && G.initiativeScore[1] !== null
      && props.ctx.phase === PHASES.INITIATIVE) {
      setTimeout(() => {
        events.setPhase(PHASES.DEPLOYMENT);
      }, 5000);
    }
  }, [G.initiativeScore, props.ctx.phase, events]);

  const onDropHandler = (item, squareId) => {
    props.moves.drop({ card: item.card, squareId: squareId, previousSquareId: item.previousSquareId });
  }

  let screenPhase = '';

  switch (props.ctx.phase) {
    case PHASES.DRAFT:
      screenPhase = (<Draft onClickHandler={selectedDeckHandler}></Draft>);
      break;
    case PHASES.INITIATIVE:
    case PHASES.DEPLOYMENT:
    case PHASES.CHOOSE_ORDERS:

      screenPhase = (
        <GameArea
          G={G}
          ctx={props.ctx}
          moves={props.moves}
          events={events}
          onDrop={(item, squareId) => onDropHandler(item, squareId)}
          onRollDice={onRollDiceHandler}
          gameMetadata={props.gameMetadata}
          initiativeFinished={initiativeFinished}
          playerID={props.playerID}
          cardHover={props.cardHover}
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