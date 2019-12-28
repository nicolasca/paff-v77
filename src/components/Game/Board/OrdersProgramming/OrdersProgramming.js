import React, { useEffect, useState } from 'react';
import styles from './OrdersProgramming.module.scss';

function OrdersProgramming({ orders, moves }) {

  const [ordersOptions, setOrdersOptions] = useState([]);
  const [ordersSelected, setOrdersSelected] = useState([]);
  const [axesSelected, setAxesSelected] = useState([]);
  const [areOrdersProgValidated, setAreOrdersProgValidated] = useState(false)

  const handleSelectOrderChange = (i, event) => {
    const value = event.target.value;

    setOrdersSelected((ordersCurrent) => ([
      ...ordersCurrent.slice(0, i),
      value,
      ...ordersCurrent.slice(i + 1)
    ]
    ));
  };

  const handleSelectAxeChange = (i, event) => {
    const value = event.target.value;
    setAxesSelected((axesCurrent) => ([
      ...axesCurrent.slice(0, i),
      value,
      ...axesCurrent.slice(i + 1)
    ]));
  };

  const handleValidateOrders = () => {

    moves.validateOrdersProgs([
      {
        order: orders.find((order) => order._id === ordersSelected[0]),
        axe: axesSelected[0],
      },
      {
        order: orders.find((order) => order._id === ordersSelected[1]),
        axe: axesSelected[1],
      },
      {
        order: orders.find((order) => order._id === ordersSelected[2]),
        axe: axesSelected[2],
      },
      {
        order: orders.find((order) => order._id === ordersSelected[3]),
        axe: axesSelected[3],
      },
    ]);
    setAreOrdersProgValidated(true);
  };

  useEffect(() => {


    /* Construct the selects for orders and axes */
    const options = orders.map((order) => {
      return order.limite !== 0 ? (
        <option value={order._id} key={order._id}>
          {order.nom} x{order.limite}
        </option>
      ) : null;
    });

    const axes = (
      <>
        <option value="coco" key="coco">Flan coco</option>
        <option value="centre" key="centre">Centre</option>
        <option value="pommes" key="pommes">Flan pomme</option>
      </>
    );

    const ordersOptions = [];
    for (let i = 0; i < 4; i++) {
      const tempVariable = {};
      ordersOptions.push(
        <div key={'order_' + i} className={styles.Order}>
          <div>
            Ordre {i + 1}
          </div>

          <div className="select is-small">
            <select
              name='order'
              defaultValue={tempVariable['orderId' + i]}
              onChange={(event) => handleSelectOrderChange(i, event)}
              disabled={areOrdersProgValidated}
            >
              {options}
            </select>
          </div>

          <div className={styles.SelectSmall + " select is-small"}>
            <select
              name='axe'
              onChange={(event) => handleSelectAxeChange(i, event)}
              disabled={areOrdersProgValidated}
            >
              {axes}
            </select>

          </div>
        </div>
      );
    }

    // Init orders state
    setOrdersSelected([orders[0]._id, orders[0]._id, orders[0]._id, orders[0]._id]);
    setAxesSelected(['coco', 'coco', 'coco', 'coco']);
    setOrdersOptions(ordersOptions);
  }, [orders, areOrdersProgValidated])

  return (
    <div className={styles.OrdersProgramming}>
      <div>
        {ordersOptions}
      </div>
      {!areOrdersProgValidated ?
        <div>
          <button className="button" onClick={handleValidateOrders}>Valider</button>
        </div>
        : null}

    </div>
  );
}

export default OrdersProgramming;