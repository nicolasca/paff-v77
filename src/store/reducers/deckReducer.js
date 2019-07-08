import * as actionTypes from '../actions/actionTypes';
import { config } from '../../config';


const initialState = {
    cardsToDisplay: {},
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.INIT_CARD_DISPLAY:

            return {
                ...state,
                cardsToDisplay: { ...action.cards },
            }
        case actionTypes.ADD_CARD:

            // Copy the state object
            const cardsToDisplayChanged = { ...state.cardsToDisplay };
            let card = cardsToDisplayChanged[action.id];

            // Vérifier si le nombre est limité
            if ((card.limite && card.count === card.limite) ||
                card.count === config.typeCard[card.type].limite) {
                return state;
            }

            card.count += 1;

            return {
                ...state,
                cardsToDisplay: cardsToDisplayChanged,
            }

        case actionTypes.REMOVE_CARD:
            // Copy the state object
            const cardToDisplayRemove = { ...state.cardsToDisplay };
            if (cardToDisplayRemove[action.id].count === 0)
                return state;

            cardToDisplayRemove[action.id].count -= 1;
            return {
                ...state,
                cardsToDisplay: cardToDisplayRemove,
            }
        case actionTypes.RESET_COUNT:
            const cardToDisplayReset = { ...state.cardsToDisplay };
            Object.keys(cardToDisplayReset).forEach((key, index) => {
                cardToDisplayReset[key].count = 0;
            });
            return {
                ...state,
                cardsToDisplay: cardToDisplayReset,
            }
        default:
            return state;
    }
}

export default reducer;