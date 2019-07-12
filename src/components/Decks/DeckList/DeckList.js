import React, { Component } from 'react';
import DeckItem from './../DeckItem/DeckItem';
import axios from 'axios';
import * as actionTypes from '../../../store/actions/actionTypes';
import { config } from '../../../config';
import { connect } from 'react-redux';

class DeckList extends Component {

    state = {
        deckList: [],
        deckListOptions: [],
        deckSelected: null,
    }

    componentDidMount() {
        var headers = {
            'Authorization': 'Bearer ' + this.props.token,
        }
        axios.get(config.host + ':3008/decks', { headers }).then((response) => {
            const options = response.data.map((deck) => {
                return (
                    <option key={deck._id} value={deck._id}>{deck.nom}</option>
                )
            });

            this.setState({
                ...this.state,
                deckListOptions: options,
                deckList: response.data,
                deckSelected: response.data[0],
            });
            this.populateCardToDisplay();
        })
            .catch(error => {
                console.log(error);
            })


    }

    populateCardToDisplay = () => {

        const cards = {};
        this.state.deckSelected.cartes.forEach((card) => {
            // Faire une copie de l'ordre
            cards[card.carte.nom] = card.carte;
        });

        this.props.setInitCards(cards);
    }

    render() {
        return (
            <div>
                {this.state.deckListOptions ?
                    <div>

                        <label className="label">Tes decks</label>
                        <div className="control" >
                            <div className="select">
                                <select
                                    id="TheSelect">
                                    {this.state.deckListOptions}
                                </select>
                            </div>
                        </div >
                    </div> : null}

                <div>
                    {this.props.cardsToDisplay ?
                        <DeckItem cardsToDisplay={this.props.cardsToDisplay}></DeckItem>
                        : null}
                </div>
            </div >
        );
    }
}


const mapStateToProps = (state) => {
    return {
        token: state.authReducer.token,
        cardsToDisplay: state.deckReducer.cardsToDisplay,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setInitCards: (cards) => dispatch({ type: actionTypes.INIT_CARD_DISPLAY, cards: cards }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);
