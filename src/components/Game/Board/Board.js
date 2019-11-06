import React, { useState, useEffect } from 'react';
import Draft from '../Draft/Draft';
import CardInGame from '../CardInGame/CardInGame';
import CardUnit from './../../Decks/DeckItem/CardUnit/CardUnit';
import styles from './Board.module.css';
import { PHASES } from './../../../game/PAFF';
import * as actionTypes from '../../../store/actions/actionTypes';
import IntiativeModal from './InitiativeModal/InitiativeModal';
import { connect } from 'react-redux';

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
        console.log(card);
        
        props.showCardHover(card);
    }

    const mouseLeaveHandler = () => {
        console.log('mouse leave');
        
        props.hideCardHover();
    }

    const clickHandler = () => {
        console.log('click');
        
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

    const cellStyle = {
        border: '1px solid #555',
        width: '100px',
        height: '150px',
        textAlign: 'center',
    };



    let screenPhase = '';
    
    switch (props.ctx.phase) {
        case PHASES.DRAFT:
            screenPhase = (<Draft onClickHandler={selectedDeckHandler}></Draft>);
            break;
        case PHASES.INITIATIVE:
        case PHASES.DEPLOYMENT:

            let tbody = [];

            const spacePositions = [3, 7, 12, 16, 21, 25, 30, 34, 39, 43, 48, 52];

            for (let i = 1; i < 55; i++) {
                if (spacePositions.includes(i)) {
                    tbody.push(<div key={i} className="space"></div>);
                } else {
                    tbody.push(<div style={cellStyle} key={i}>
                        {props.G.cells[i]}
                    </div>);
                }
            }

            const cards = props.G.decks[props.playerID].cartes.map((card, index) => {
                return (
                    <div className={styles.Card} key={index}
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
        <div>
            {screenPhase}
        </div>
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