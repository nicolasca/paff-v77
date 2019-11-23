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

    const selectedDeckHandler = (deck, orders) => {
        props.moves.setDeck(deck, props.playerID, orders);
    }

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

    const onRollDiceHandler = () => {
        props.moves.rollDice(props.playerID);
    }

    useEffect(() => {
        setInitiativeFinished(G.initiativeScore[0] !== null && G.initiativeScore[1] !== null);
        if (G.initiativeScore[0] !== null && G.initiativeScore[1] !== null
            && props.ctx.phase === PHASES.INITIATIVE) {
            console.log('initiative finished');

            setTimeout(() => {
                console.log('end phase');

                events.setPhase(PHASES.DEPLOYMENT);
            }, 5000);
        }
    }, [G.initiativeScore, props.ctx.phase, events]);

    const onDropHandler = (item, squareId) => {
        console.log('on drop');

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
                <Area
                    G={G}
                    ctx={props.ctx}
                    moves={props.moves}
                    events={events}
                    onDrop={(item, squareId) => onDropHandler(item, squareId)}
                    onRollDice={onRollDiceHandler}
                    player0={getPlayer0()}
                    player1={getPlayer1()}
                    topPlayer={topPlayer()}
                    bottomPlayer={bottomPlayer()}
                    initiativeFinished={initiativeFinished}
                    playerID={props.playerID}
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