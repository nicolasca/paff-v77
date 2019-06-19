import React from 'react';
import styles from './CardOrder.module.css';

function CardOrder(props) {

    return (
        <div className={styles.container}>
            <div className={styles.recuperable}>
                R {props.order.recuperable ? 'Oui' : 'Non'}
            </div>
            <div className={[styles.name, styles[props.order.faction]].join(' ')}>
                {props.order.name}
            </div>
        </div>
    );
}

export default CardOrder;