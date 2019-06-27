import React from 'react';
import styles from './CardUnit.module.css';

function CardUnit(props) {

    let armor = '';
    if (props.unit.armor === 1) {
        armor = 'I';
    } else if (props.unit.armor === 2) {
        armor = 'II';
    } else {
        armor = 'III';
    }

    let type = '';

    if (props.unit.type === 'Troupe') {
        type = 'Tr';
    } else if (props.unit.type === 'Unité de tir') {
        type = 'Tir';
    } else if (props.unit.type === 'Cavalerie') {
        type = 'Cav';
    } else if (props.unit.type === 'Artillerie') {
        type = 'Ar';
    } else if (props.unit.type === 'Elite') {
        type = 'El';
    }

    return (
        <div className={[styles.container, styles[props.unit.factionSlug]].join(' ')}>
            <div className={styles.deploy}>
                {props.unit.deploy}
            </div>
            <div className={styles.name}>
                <span>{props.unit.nom}</span>
            </div>
            <div className={styles.specific}>
                {type}
            </div>
            <div className={styles.reg}>
                {props.unit.regiment} régiments
        </div>
            <div className={[styles.armor, styles['type' + armor]].join(' ')}>
                {armor}
            </div>
            <div className={styles.capa}>
                Capacités
        </div>
            <div className={styles.detailCarac1}>
                <div className={styles.dark}>D</div>
                <div className={styles.light}>{props.unit.mouv}</div>
                <div className={styles.dark}>M</div>
                <div className={styles.light}>{props.unit.moral}+</div>
            </div>
            <div className={styles.detailCarac2}>
                <div className={styles.dark}>T</div>
                <div className={styles.typeI}>{props.unit.t_I}</div>
                <div className={styles.typeII}>{props.unit.t_II}</div>
                <div className={styles.typeIII}>{props.unit.t_III}</div>
                <div className={styles.dark}>Cac</div>
                <div className={styles.typeI}>{props.unit.a_I}</div>
                <div className={styles.typeII}>{props.unit.a_II}</div>
                <div className={styles.typeIII}>{props.unit.a_III}</div>
            </div>

            <div className={styles.detailCarac3}>
                <div className={styles.dark}>P</div>
                <div className={styles.light}>{props.unit.range}</div>
                <div className={styles.dark}>C</div>
                <div className={styles.light}>{props.unit.charge}</div>
            </div>
        </div>
    );
}

export default CardUnit;