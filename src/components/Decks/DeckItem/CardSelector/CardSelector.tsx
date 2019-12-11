import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../../../store/actions/actionTypes';
import { ReactComponent as MinusSign } from './../../../../assets/minus.svg';
import { ReactComponent as PlusSign } from './../../../../assets/plus.svg';
import styles from './CardSelector.module.css';

interface CardSelectorProps {
  count: number;
  name: string;
  addCard: any;
  removeCard: any;
  children: any; // no idea why need this
}

const CardSelector: FunctionComponent<CardSelectorProps> = (props) => {

  return (
    <div className={styles.CardSelector}>
      <PlusSign onClick={() => props.addCard(props.name)} />
      <span>{props.count}</span>
      <MinusSign onClick={() => props.removeCard(props.name)} />
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    addCard: (name: string) => dispatch({ type: actionTypes.ADD_CARD, id: name }),
    removeCard: (name: string) => dispatch({ type: actionTypes.REMOVE_CARD, id: name }),
  }
}

export default connect(null, mapDispatchToProps)(CardSelector);