import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';


/*
  This reducer is used for the game state.
  boardgame.io provides already a game state, but most of the code is executed on client
  AND server side. 
  Sometimes we need to manage the state only for display purpose (such as show card on hover)
*/

const initialState = {
  cardHover: null,
};

const cardMouseEnter = (state, action) => {
  return updateObject(state, { cardHover: action.card});
}

const cardMouseLeave = (state, action) => {
  return updateObject(state, { cardHover: null});
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.CARD_MOUSE_ENTER:
      return cardMouseEnter(state, action);
    case actionTypes.CARD_MOUSE_LEAVE:
      return cardMouseLeave(state, action);
    default:
      return state;
  }
}

export default reducer;