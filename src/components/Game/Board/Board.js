import React, { useState, useEffect } from 'react';
import Draft from '../Draft/Draft';
import { PHASES } from './../../../game/PAFF';
import * as actionTypes from '../../../store/actions/actionTypes';
import { connect } from 'react-redux';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Area from './Area/Area';

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

    const onRollDiceHandler = () => {
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
            && props.ctx.phase === PHASES.INITIATIVE) {
            setTimeout(() => {
                console.log(props.ctx.phase);

                events.endPhase();
            }, 5000);
        }
    }, [G.initiativeScore, events]);

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

            screenPhase = (
                <Area
                    onDrop={(item, squareId) => onDropHandler(item, squareId)}
                    mouseEnter={(card) => mouseEnterHandler(card)}
                    mouseLeave={mouseLeaveHandler}
                    onRollDice={onRollDiceHandler}
                    player0={getPlayer0()}
                    player1={getPlayer1()}
                    topPlayer={topPlayer()}
                    bottomPlayer={bottomPlayer()}
                    initiativeFinished={initiativeFinished}
                    squares={props.G.squares}
                    decks={props.G.decks}
                    hands={props.G.hands}
                    score0={props.G.initiativeScore[0]}
                    score1={props.G.initiativeScore[1]}
                    playerID={props.playerID}
                    ctx={props.ctx}
                    cardHover={props.cardHover}
                >
                </Area>)

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