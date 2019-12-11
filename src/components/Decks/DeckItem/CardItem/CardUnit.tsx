import React, { FunctionComponent } from 'react';
import { config } from '../../../../config';
import { IUnite } from '../../../../models/ICard';
import styles from './CardUnit.module.scss';

interface CardUnitProps {
  unit: IUnite;
}
const CardUnit: FunctionComponent<CardUnitProps> = (props) => {

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
				<span className={styles.Tooltip} key={capacite.slug}
					data-tooltip={capacite.description}>
					{capacite.nom}
				</span>
			)
		});
	}


	const imageUrl = !props.unit.image ? require(`../../../../assets/logo.jpg`) :
		require(`../../../../assets/cartes/${props.unit.faction.slug}/${props.unit.image}`);

	return (
		<div className={[styles.CardUnit, styles.container, styles[props.unit.faction.slug]].join(' ')}>
			<div className={styles.deploy}>
				{props.unit.deploy}
			</div>
			<div className={styles.Faction}>
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
				<div className={styles.AttCac}>
					{props.unit.attCac}
					{props.unit.isAttCacMagique ? '(m)' : ''}
				</div>
				<div className={styles.DefCac}>{props.unit.defCac}</div>
				<div className={styles.Tir}>Tir</div>
				<div className={styles.AttTir}>
					{props.unit.attTir}
					{props.unit.isAttTirMagique ? '(m)' : ''}
				</div>
				<div className={styles.DefTir}>{props.unit.defTir}</div>
			</div>
		</div >
	);
}

export default CardUnit;
