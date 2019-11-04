import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from '../../../config';
import { connect } from 'react-redux';


function Draft(props) {


    const [options, setOptions] = useState([]);
    const [decks, setDecks] = useState([]);
    const [selectedDeck, setSelectedDeck] = useState(null);

    const getSelectOptions = (decks) => {
        return decks.map((deck) => {
            return (
                <option key={deck._id} value={deck._id}>{deck.nom}</option>
            )
        });
    };

    const changeDeckHandler = (event) => {
        const deck = decks.find((deck) => deck._id === event.target.value);
        setSelectedDeck(deck);
    }

    useEffect(() => {
        const headers = {
            'Authorization': 'Bearer ' + props.token,
        }

        axios.get(config.host + ':3008/decks', { headers }).then((response) => {
            setDecks(response.data);
            setSelectedDeck(response.data[0]);

            setOptions(getSelectOptions(response.data));
        })
    }, [setOptions, setDecks, setSelectedDeck])

    return (
        <div>
            {options ?
                <div>
                    <label className="label">Tes decks</label>
                    <div className="control" >
                        <div className="select">
                            <select
                                onChange={changeDeckHandler}
                                id="TheSelect">
                                {options}
                            </select>
                        </div>
                    </div>
                    <button className="button" onClick={() => props.onClickHandler(selectedDeck)}>Choisir</button>
                </div> : null}
        </div>
    );
}

const mapPropsToState = (state) => {
    return {
        token: state.authReducer.token,
    }
}

export default connect(mapPropsToState)(Draft);