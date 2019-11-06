import React from 'react';
import styles from './CardInGame.module.scss';

function CardInGame(props) {

  const imageUrl = !props.unit.image ? require(`../../../assets/logo.jpg`) :
  require(`../../../assets/cartes/${props.unit.faction.slug}/${props.unit.image}`);

  return (
		<div className={[styles.CardUnit, styles.container, styles[props.unit.faction.slug]].join(' ')}>
			<div className={styles.name}>
				<span>{props.unit.nom}</span>
			</div>
			<div className={styles.Image} style={{ backgroundImage: `url(${imageUrl})` }} >
				<img src={imageUrl} alt="boss orc" />
			</div>
			<div className={styles.Regiment}>
				{props.unit.regiment}
			</div>
			<div className={styles.DetailCarac}>
				<div className={styles.AttCac}>
					{props.unit.attCac}
					{props.unit.isAttCacMagique ? '(m)' : ''}
				</div>
				<div className={styles.DefCac}>{props.unit.defCac}</div>
				<div className={styles.AttTir}>
					{props.unit.attTir}
					{props.unit.isAttTirMagique ? '(m)' : ''}
				</div>
				<div className={styles.DefTir}>{props.unit.defTir}</div>
			</div>
		</div >
	);
}

export default CardInGame;