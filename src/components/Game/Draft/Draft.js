import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { config } from '../../../config';


function Draft(props) {


  const [options, setOptions] = useState([]);
  const [decks, setDecks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);

  useEffect(() => {
    const headers = {
      'Authorization': 'Bearer ' + props.token,
    }

    axios.all([
      axios.get(config.host + ":3008/decks", { headers: headers }),
      axios.get(config.host + ":3008/ordres")])
      .then(axios.spread((decksHttp, ordresHttp) => {

        // Set decks
        setDecks(decksHttp.data);
        setSelectedDeck(decksHttp.data[0]);
        setOptions(getSelectOptions(decksHttp.data));

        setOrders(ordresHttp.data);
      }));

  }, [setOptions, setDecks, setSelectedDeck, props.token]);

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

  const validateDeckHandler = () => {

    const availableOrders = []
    const faction = selectedDeck.cartes[0].carte.faction;

    orders.forEach((order) => {
      if (order.faction.slug === faction.slug || order.faction === 'commun') {
        // Faire une copie de l'ordre
        availableOrders.push(order);
      }
    });

    props.onClickHandler(selectedDeck, availableOrders);
  }


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
          <button className="button" onClick={validateDeckHandler}>Choisir</button>
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