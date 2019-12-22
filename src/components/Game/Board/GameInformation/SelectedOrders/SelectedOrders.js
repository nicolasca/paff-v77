import React from 'react';
import styles from './SelectedOrders.module.scss';


function SelectedOrders({ selectedOrdersProgs, events }) {

  function chooseOrders() {
    events.endPhase();
  }

  const ordersPlayer0 = selectedOrdersProgs[0].map((orderProg, index) => {
    return (
      <div key={'player0_order_' + index}>
        <span>{index}. {orderProg.order.nom} - {orderProg.axe} </span>
      </div>
    )
  });
  const ordersPlayer1 = selectedOrdersProgs[1].map((orderProg, index) => {
    return (
      <div key={'player1_order_' + index}>
        <span>{index}. {orderProg.order.nom} - {orderProg.axe} </span>
      </div>
    )
  });

  return (
    <div className={styles.SelectedOrders}>
      {ordersPlayer0}
      {ordersPlayer1}
      <button className="button" onClick={chooseOrders}>
        Choisir les ordres</button>
    </div>
  );

}

export default SelectedOrders;