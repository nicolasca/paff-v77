import React from 'react';
import styles from './Input.module.css';


const input = (props) => {
  let inputElement = null;
  let validationError = null;
  const inputClasses = [styles.InputElement];

  if (props.invalid && props.touched) {
    inputClasses.push(styles.Error);
    validationError = props.validationError;
  }

  switch(props.elementtype) {
    case ('input'):
      inputElement = <input className={inputClasses.join(' ')}
        {...props.elementconfig}
        value={props.value} onChange={props.change}/>;
      break;
    case ('textarea'):
      inputElement = <textarea className={inputClasses.join(' ')}
      {...props.elementconfig}
      value={props.value} onChange={props.change}/>;
      break;
    default:
      inputElement = <input className={inputClasses.join(' ')}
      {...props.elementconfig}
      value={props.value} onChange={props.change}/>;
      break;
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  )
};

export default input