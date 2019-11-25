import React from 'react';

function ReserveButton(props) {


  return (
    <div onClick={props.onClickReserve}>
      <button className="button is-paff">Réserve</button>
    </div>
  );
}

export default ReserveButton;