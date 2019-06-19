import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardSelector.module.css';
import { ReactComponent as PlusSign } from './../../../assets/plus.svg';
import { ReactComponent as MinusSign } from './../../../assets/minus.svg';


function CardSelector(props) {

  return (
    <div className={styles.CardSelector}>
      <PlusSign onClick={props.clickedPlus}/>
      <span>{props.count}</span>
     <MinusSign  onClick={props.clickedMinus}/>
      
    </div>
  );
}

export default CardSelector;

CardSelector.propTypes = {
  clickedPlus: PropTypes.func,
  clickedMinus: PropTypes.func,
  count: PropTypes.number,
}