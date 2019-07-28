import React, { Component } from 'react';
import DeckItem from './../DeckItem/DeckItem';
import DeckSummary from './../DeckBuilder/DeckSummary/DeckSummary';
import styles from './DeckList.module.scss';
import axios from 'axios';
import * as actionTypes from '../../../store/actions/actionTypes';
import { config } from '../../../config';
import { connect } from 'react-redux';
import DeckBuilder from '../DeckBuilder/DeckBuilder';

class DeckList extends Component {

    state = {
        deckList: [],
        deckListOptions: [],
        deckSelected: null,
        deckSelectedId: "",
        newDeck: false,
    }

    componentDidMount() {
        var headers = {
            'Authorization': 'Bearer ' + this.props.token,
        }
        axios.get(config.host + ':3008/decks', { headers }).then((response) => {
            if (response.data && response.data.length > 0) {
                const options = this.getSelectOptions(response.data);

                this.setState({
                    ...this.state,
                    deckListOptions: options,
                    deckList: response.data,
                    deckSelected: response.data[0],
                    deckSelectedId: response.data[0]._id,
                });

                this.populateCardToDisplay();
            } else {
                this.setState({
                    ...this.state,
                    newDeck: true,
                })
            }


        })
            .catch(error => {
                console.log(error);
            })
    }

    getSelectOptions = (decks) => {
        return decks.map((deck) => {
            return (
                <option key={deck._id} value={deck._id}>{deck.nom}</option>
            )
        });
    }

    populateCardToDisplay = () => {
        const cards = {};
        this.state.deckSelected.cartes.forEach((card) => {
            // Faire une copie de l'ordre
            cards[card.carte.nom] = card.carte;
        });
        this.props.setInitCards(cards);
    }

    deleteDeck = () => {
        var headers = {
            'Authorization': 'Bearer ' + this.props.token,
        };
        axios.delete(config.host + ":3008/decks/" + this.state.deckSelected._id, { headers: headers })
            .then((response) => {
                const newDeckList = this.state.deckList.filter((deck) => deck._id !== this.state.deckSelected._id);

                this.setState({
                    ...this.state,
                    deckList: newDeckList,
                    deckSelected: newDeckList.length > 0 ? newDeckList[0] : null,
                    deckSelectedId: newDeckList.length > 0 ? newDeckList[0]._id : "",
                    deckListOptions: this.getSelectOptions(newDeckList),
                },
                    this.populateCardToDisplay);

            })
            .catch((error) => {
                console.log(error);
            });
    }

    changeDeck = (event) => {
        const selectedDeck = this.state.deckList.find((deck) => deck._id === event.target.value);
        this.setState({
            ...this.state,
            deckSelected: selectedDeck,
            deckSelectedId: event.target.value,
        },
            this.populateCardToDisplay,
        );
    }

    addNewDeck = () => {
        this.setState({
            ...this.state,
            newDeck: true,
        })
    }


    render() {
        let display;

        if (!this.state.newDeck) {
            display = <div className={styles.DeckList + " container"}>
                <div className={styles.Wrapper}>
                    {this.state.deckListOptions ?
                        <div>
                            <label className="label">Tes decks</label>
                            <div className="control" >
                                <div className="select">
                                    <select onChange={this.changeDeck}
                                        value={this.state.deckSelectedId}
                                        id="TheSelect">
                                        {this.state.deckListOptions}
                                    </select>
                                </div>
                            </div>
                            <button className="button" onClick={this.deleteDeck}>Supprimer</button>
                            <button className="button" onClick={this.addNewDeck}>Ajouter</button>
                        </div> : null}

                    <div>
                        {this.props.cardsToDisplay ?
                            <DeckItem cardsToDisplay={this.props.cardsToDisplay}></DeckItem>
                            : null}
                    </div>
                </div>
                {this.props.cardsToDisplay ?

                    <div className={styles.DeckSummary}>
                        <DeckSummary cards={this.props.cardsToDisplay}>
                        </DeckSummary>
                    </div> : null}
            </div >
        } else {
            display = <DeckBuilder></DeckBuilder>
        }

        return (
            display
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
