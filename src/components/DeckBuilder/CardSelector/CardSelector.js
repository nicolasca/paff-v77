import React from 'react';
import styles from './CardSelector.module.css';
import { ReactComponent as PlusSign } from './../../../assets/plus.svg';
import { ReactComponent as MinusSign } from './../../../assets/minus.svg';
import { connect } from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';


function CardSelector(props) {

  return (
    <div className={styles.CardSelector}>
      <PlusSign onClick={() => props.addCard(props.name)} />
      <span>{props.count}</span>
      <MinusSign onClick={() => props.removeCard(props.name)} />
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (name) => dispatch({ type: actionTypes.ADD_CARD, id: name }),
    removeCard: (name) => dispatch({ type: actionTypes.REMOVE_CARD, id: name }),
  }
}

export default connect(null, mapDispatchToProps)(CardSelector);