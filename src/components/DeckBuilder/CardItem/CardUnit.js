import React from 'react';
import styles from './CardUnit.module.css';
import { config } from '../../../config';
import PropTypes from 'prop-types';

function CardUnit(props) {

    let type = '';

    if (props.unit.type === config.typeCard.troupe.label) {
        type = 'Tr';
    } else if (props.unit.type === config.typeCard.tir.label) {
        type = 'Tir';
    } else if (props.unit.type === config.typeCard.cavalerie.label) {
        type = 'Cav';
    } else if (props.unit.type === config.typeCard.artillerie.label) {
        type = 'Ar';
    } else if (props.unit.type === config.typeCard.elite.label) {
        type = 'El';
    }

    let capacites = null;
    if (props.unit.capacites) {
        capacites = props.unit.capacites.map((capacite) => {
            return (
                <p className={styles.Tooltip} key={capacite.slug}
                    data-tooltip={capacite.description}>
                    {capacite.nom}
                </p>
            )
        });
    }

    return (
        <div className={[styles.CardUnit, styles.container, styles[props.unit.factionSlug]].join(' ')}>
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
            <div className={styles.Capa}>
                {capacites}
            </div>
            <div className={styles.detailCarac}>
                <div className={styles.Transparent}></div>
                <div className={styles.Att}>Att</div>
                <div className={styles.Def}>Def</div>
                <div className={styles.Cac}>Cac</div>
                <div className={styles.AttCac}> { props.unit.attCac } </div>
                <div className={styles.DefCac}>{ props.unit.defCac }</div>
                <div className={styles.Tir}>Tir</div>
                <div className={styles.AttTir}>{ props.unit.attTir }</div>
                <div className={styles.DefTir}>{props.unit.defTir}</div>
            </div>
        </div>
    );
}

export default CardUnit;

CardUnit.propTypes = {
    card: PropTypes.object,
} 