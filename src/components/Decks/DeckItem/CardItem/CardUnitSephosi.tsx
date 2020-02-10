import React, { FunctionComponent } from "react";
import Card from "../../../../assets/carte-sepho.png";
import AttCac from "../../../../assets/icons/att-cac.png";
import AttTir from "../../../../assets/icons/att-tir.png";
import { ReactComponent as Bow } from "../../../../assets/icons/bow.svg";
import { ReactComponent as Catapult } from "../../../../assets/icons/catapult.svg";
import DefCac from "../../../../assets/icons/def-cac.png";
import DefTir from "../../../../assets/icons/def-tir.png";
import { ReactComponent as Elite } from "../../../../assets/icons/elite.svg";
import { ReactComponent as Horse } from "../../../../assets/icons/horse.svg";
import { ReactComponent as Sword } from "../../../../assets/icons/sword.svg";
import { ReactComponent as Unique } from "../../../../assets/icons/unique.svg";
import { config } from "../../../../config";
import { IUnit } from "../../../../models/ICard";
import styles from "./CardUnitSephosi.module.scss";

interface CardUnitProps {
  unit: IUnit;
}
const CardUnit: FunctionComponent<CardUnitProps> = props => {
  let type;

  if (props.unit.type === config.typeCard.troupe.label) {
    type = <Sword></Sword>;
  } else if (props.unit.type === config.typeCard.tir.label) {
    type = <Bow></Bow>;
  } else if (props.unit.type === config.typeCard.cavalerie.label) {
    type = <Horse></Horse>;
  } else if (props.unit.type === config.typeCard.artillerie.label) {
    type = <Catapult></Catapult>;
  } else if (props.unit.type === config.typeCard.elite.label) {
    type = <Elite></Elite>;
  } else if (props.unit.type === config.typeCard.unique.label) {
    type = <Unique></Unique>;
  }

  let capacites = null;
  if (props.unit.capacites) {
    capacites = props.unit.capacites.map(capacite => {
      return (
        <span
          className={styles.Tooltip}
          key={capacite.slug}
          data-tooltip={capacite.description}
        >
          {capacite.nom}
        </span>
      );
    });
  }

  const imageUrl = !props.unit.image
    ? require(`../../../../assets/logo.jpg`)
    : require(`../../../../assets/cartes/${props.unit.faction.slug}/${props.unit.image}`);

  return (
    <div className={[styles.Card, styles[props.unit.faction.slug]].join(" ")}>
      <div className={styles.deploy}>{props.unit.deploy}</div>
      <div className={styles.name}>
        <span>{props.unit.nom}</span>
      </div>
      <div
        className={styles.Image}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className={styles.Capacites}>{capacites}</div>
      <div className={styles.Regiment}>{props.unit.regiment}</div>
      <div className={styles.type}>{type}</div>

      <div className={styles.DetailCarac}>
        {props.unit.attCac !== 0 ? (
          <div className={styles.ItemCarac}>
            <img src={AttCac} alt="" />
            <div>
              {props.unit.attCac}
              {props.unit.isAttCacMagique ? "*" : ""}
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {props.unit.defCac !== 0 ? (
          <div className={styles.ItemCarac}>
            <img src={DefCac} alt="" />
            <div>{props.unit.defCac}</div>
          </div>
        ) : (
          <div></div>
        )}

        {props.unit.attTir !== 0 ? (
          <div className={styles.ItemCarac}>
            <img src={AttTir} alt="" />
            <div>
              {props.unit.attTir}
              {props.unit.isAttTirMagique ? "*" : ""}
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {props.unit.defTir !== 0 ? (
          <div className={styles.ItemCarac}>
            <img src={DefTir} alt="" />
            <div>{props.unit.defTir}</div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <img className={styles.CardImage} src={Card} alt="" />
    </div>
  );
};

export default CardUnit;
