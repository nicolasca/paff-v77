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
	} else if (props.unit.type === config.typeCard.unique.label) {
		type = 'Un';
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

	const imageUrl = require(`../../../assets/logo.jpg`);

	return (
		<div className={[styles.CardUnit, styles.container, styles[props.unit.factionSlug]].join(' ')}>
			<div className={styles.deploy}>
				{props.unit.deploy}
			</div>
			<div className={styles.faction}>
				<span>{props.unit.faction.nom}</span>
			</div>
			<div className={styles.name}>
				<span>{props.unit.nom}</span>
			</div>
			<div className={styles.type}>
				{type}
			</div>
			<div className={styles.Image} style={{ backgroundImage: `url(${imageUrl})` }} >
				{/* <img src={require(`../../../assets/logo.jpg`)} alt="boss orc" /> */}
			</div>
			<div className={styles.Regiment}>
				{props.unit.regiment}
			</div>
			<div className={styles.Capacites}>
				{capacites}
			</div>
			<div className={styles.DetailCarac}>
				<div className={styles.Grey}></div>
				<div className={styles.Att}>Att</div>
				<div className={styles.Def}>Def</div>
				<div className={styles.Cac}>Cac</div>
				<div className={styles.AttCac}> {props.unit.attCac} </div>
				<div className={styles.DefCac}>{props.unit.defCac}</div>
				<div className={styles.Tir}>Tir</div>
				<div className={styles.AttTir}>{props.unit.attTir}</div>
				<div className={styles.DefTir}>{props.unit.defTir}</div>
			</div>
		</div >
	);
}

export default CardUnit;

CardUnit.propTypes = {
	card: PropTypes.object,
} 