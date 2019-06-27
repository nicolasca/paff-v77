import React from 'react';
import styles from './CardOrder.module.css';

function CardOrder(props) {

    return (
        <div className={[styles.container, styles[props.order.factionSlug]].join(' ')}>
            <div className={styles.recuperable}>
                {props.order.recuperable ? 'R' : ' '}
            </div>
            <div className={styles.name}>
                <span className={styles.Tooltip}
                    data-tooltip={props.order.description}>
                    {props.order.nom}
                </span>
            </div>
        </div>
    );
}


export default CardOrder;