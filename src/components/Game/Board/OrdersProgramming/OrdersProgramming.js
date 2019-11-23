import React from 'react';
import styles from './OrdersProgramming.module.scss';

function OrdersProgramming(props) {


    const options = props.orders.map((order) => {
        return (
            <option key={order._id}>{order.nom} x{order.limite}</option>
        )
    });

    const axes = (
        <React.Fragment>
            <option key="coco">Flan coco</option>
            <option key="centre">Centre</option>
            <option key="pomme">Flan pomme</option>
        </React.Fragment>
    );


    return (
        <div className={styles.OrdersProgramming}>
            <div>
                Ordre 1
            </div>
            <div className="field">
                <div className="control">
                    <div className={styles.SelectSmall + " select is-success is-small"}>
                        <select>
                            {options}
                        </select>
                    </div>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <div className={styles.SelectSmall + " select is-danger is-small"}>
                        <select>
                            {axes}
                        </select>
                    </div>
                </div>
            </div>

            <div>
                Ordre 2
            </div>
            <div className="field">
                <div className="control">
                    <div className={styles.SelectSmall + " select is-success is-small"}>
                        <select>
                            {options}
                        </select>
                    </div>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <div className={styles.SelectSmall + " select is-danger is-small"}>

                        <select>
                            {axes}
                        </select>
                    </div>
                </div>
            </div>

            <div>
                Ordre 3
            </div>
            <div className="field">
                <div className="control">
                    <div className={styles.SelectSmall + " select is-success is-small"}>

                        <select>
                            {options}
                        </select>
                    </div>
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <div className={styles.SelectSmall + " select is-danger is-small"}>

                        <select>
                            {axes}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrdersProgramming;