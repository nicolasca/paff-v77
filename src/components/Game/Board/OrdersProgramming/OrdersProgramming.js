import React, { useEffect, useState } from 'react';
import styles from './OrdersProgramming.module.scss';

function OrdersProgramming(props) {

  const [ordersChoice, setOrdersChoice] = useState([]);
  const [orderId1, setOrderId1] = useState(null);
  const [orderId2, setOrderId2] = useState(null);
  const [orderId3, setOrderId3] = useState(null);

  const [axe1, setAxe1] = useState(null);
  const [axe2, setAxe2] = useState(null);
  const [axe3, setAxe3] = useState(null);


  const handleSelectOrderChange = (i, event) => {
    const value = event.target.value;

    if (i === 1) {
      setOrderId1(value);
    } else if (i === 2) {
      setOrderId2(value);
    } else if (i === 3) {
      setOrderId3(value);
    }
  };

  const handleSelectAxeChange = (i, event) => {
    const value = event.target.value;

    if (i === 1) {
      setAxe1(value);
    } else if (i === 2) {
      setAxe2(value);
    } else if (i === 3) {
      setAxe3(value);
    }
  };

  const handleValidateOrders = () => {
    props.moves.validateOrdersProgs([
      {
        order: props.orders.find((order) => order._id === orderId1),
        axe: axe1,
      },
      {
        order: props.orders.find((order) => order._id === orderId2),
        axe: axe2,
      },
      {
        order: props.orders.find((order) => order._id === orderId3),
        axe: axe3,
      }
    ]);
  };

  useEffect(() => {
    /* Construct the selects for orders and axes */
    const options = props.orders.map((order) => {
      return order.limite !== 0 ? (
        <option value={order._id} key={order._id}>
          {order.nom} x{order.limite}
        </option>
      ) : null;
    });

    const axes = (
      <React.Fragment>
        <option value="coco" key="coco">Flan coco</option>
        <option value="centre" key="centre">Centre</option>
        <option value="pommes" key="pommes">Flan pomme</option>
      </React.Fragment>
    );

    const ordersOptions = [];
    for (let i = 1; i < 4; i++) {
      ordersOptions.push(
        <div key={'order_' + i} className={styles.Order}>
          <div>
            Ordre {i}
          </div>

          <div className="select is-small">
            <select
              name='order'
              defaultValue={props.orders[0]._id}
              onChange={(event) => handleSelectOrderChange(i, event)}
            >
              {options}
            </select>
          </div>

          <div className={styles.SelectSmall + " select is-small"}>
            <select
              name='axe'
              onChange={(event) => handleSelectAxeChange(i, event)}
            >
              {axes}
            </select>

          </div>
        </div>
      );
    }

    setOrdersChoice(ordersOptions);

    // Init orders state
    setOrderId1(props.orders[0]._id);
    setAxe1('coco');
    setOrderId2(props.orders[1]._id);
    setAxe2('centre');
    setOrderId3(props.orders[2]._id);
    setAxe3('pommes');

  }, [props.orders])



  return (
    <div className={styles.OrdersProgramming}>
      <div>
        {ordersChoice}
      </div>
      <div>
        <button className="button" onClick={handleValidateOrders}>Valider</button>
      </div>
    </div>
  );
}

export default OrdersProgramming;