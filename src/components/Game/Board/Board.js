import React, { useState, useEffect } from 'react';
import Draft from '../Draft/Draft';
import CardInGame from '../CardInGame/CardInGame';
import SquareDrop from './Square/SquareDrop';
import CardUnit from './../../Decks/DeckItem/CardUnit/CardUnit';
import styles from './Board.module.css';
import { PHASES } from './../../../game/PAFF';
import * as actionTypes from '../../../store/actions/actionTypes';
import IntiativeModal from './InitiativeModal/InitiativeModal';
import { connect } from 'react-redux';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

function Board(props) {


    const [initiativeFinished, setInitiativeFinished] = useState(false);
    const { G, events } = props;

    const selectedDeckHandler = (deck) => {
        props.moves.setDeck(deck, props.playerID);
    }

    const getPlayer0 = () => {
        return props.gameMetadata.find((player) => player.id === 0)
    }

    const getPlayer1 = () => {
        return props.gameMetadata.find((player) => player.id === 1)
    }

    const topPlayer = () => {
        return props.gameMetadata.find((player) => player.id === +props.playerID)
    }

    const bottomPlayer = () => {
        return props.gameMetadata.find((player) => player.id !== +props.playerID)
    }

    const onRollDice = () => {
        props.moves.rollDice(props.playerID);
    }
    const mouseEnterHandler = (card) => {
        props.showCardHover(card);
    }

    const mouseLeaveHandler = () => {
        props.hideCardHover();
    }

    useEffect(() => {
        setInitiativeFinished(G.initiativeScore[0] !== null && G.initiativeScore[1] !== null);
        if (G.initiativeScore[0] !== null && G.initiativeScore[1] !== null
            &&  props.ctx.phase === PHASES.INITIATIVE) {
            setTimeout(() => {
                events.endPhase();
            }, 5000);
        }
    }, [G.initiativeScore, events]);

    const onDropHandler = (item, squareId) => {
        props.moves.drop({card: item.card, squareId: squareId, previousSquareId: item.previousSquareId});
    }

    const renderSquare = (i, squareId) => {
        
       return (
            <SquareDrop key={i} square={squareId} moveCard={(item) => onDropHandler(item, squareId)}>
                {
                    props.G.squares[squareId] ?
                    <div className={styles.Card} 
                    onMouseEnter={mouseEnterHandler.bind(this, props.G.squares[squareId])}
                    onMouseLeave={mouseLeaveHandler}>
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

    let screenPhase = '';

    console.log(props.G.decks);
    
    
    switch (props.ctx.phase) {
        case PHASES.DRAFT:
            screenPhase = (<Draft onClickHandler={selectedDeckHandler}></Draft>);
            break;
        case PHASES.INITIATIVE:
        case PHASES.DEPLOYMENT:

            let tbody = [];
            const spacePositions = [3, 7, 12, 16, 21, 25, 30, 34, 39, 43, 48, 52];
            let squareId = 0;
            
            for (let i = 1; i < 55; i++) {
                if (spacePositions.includes(i)) {
                    tbody.push(<div key={i} className="space"></div>);
                } else {

                    tbody.push(renderSquare(i, squareId));
                    squareId += 1;
                }
            }

            const cards = props.G.decks[props.playerID].cartes.map((card, index) => {
                return (
           
                        <div className={styles.Card}  key={index}
                            onMouseEnter={mouseEnterHandler.bind(this, card.carte)}
                            onMouseLeave={mouseLeaveHandler}
                    >
                        <CardInGame unit={card.carte}>
                        </CardInGame>
                    </div>
              
                    
                );
            });

            screenPhase = (
                <div>
                    {props.ctx.phase === PHASES.INITIATIVE ?
                        <IntiativeModal
                            player0={getPlayer0().name}
                            player1={getPlayer1().name}
                            score0={props.G.initiativeScore[0]}
                            score1={props.G.initiativeScore[1]}
                            onRollDiceHandler={onRollDice}
                            hasResult={initiativeFinished}
                        >
                        </IntiativeModal> : null}

                    <div>
                        <h2>{topPlayer().name}</h2>
                    </div>
                    <div className={styles.Cards}>
                        {cards}

                    </div>
                    <div className={styles.Board}>
                        {tbody}
                    </div>

                    <div>
                        <h2>{bottomPlayer().name}</h2>  
                    </div>

                    
                    <div className={styles.CardHover}>
                        { props.cardHover ?
                            <CardUnit unit={props.cardHover}>
                                </CardUnit>
                            : null
                        }
                        
                    </div>
                </div>);
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

const mapStateToProps = (state) => {
    return {
        cardHover: state.gameReducer.cardHover,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
      showCardHover: (card) => dispatch({ type: actionTypes.CARD_MOUSE_ENTER, card: card }),
      hideCardHover: () => dispatch({ type: actionTypes.CARD_MOUSE_LEAVE })
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(Board);