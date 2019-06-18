import React from 'react';
import styles from './CardSelector.module.css';
import { ReactComponent as PlusSign } from './../../../assets/plus.svg';
import { ReactComponent as MinusSign } from './../../../assets/minus.svg';


function CardSelector(props) {

  return (
    <div className={styles.CardSelector}>
      <PlusSign onClick={props.clickedPlus}/>
      <span>{props.count ? props.count : 0 }</span>
     <MinusSign  onClick={props.clickedMinus}/>
      
    </div>
  );
}

export default CardSelector;