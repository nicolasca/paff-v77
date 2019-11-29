import React, { FunctionComponent } from 'react';
import { IOrder } from '../../../../models/ICard';
import styles from './CardOrder.module.scss';

interface CardOrderProps {
  order: IOrder;
}

const CardOrder: FunctionComponent<CardOrderProps> = (props) => {

  const slug = typeof props.order.faction === 'object' ? props.order.faction.slug : props.order.faction;
    return (
      <div className={[styles.container, styles[slug]].join(' ')}>
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