import React, { FunctionComponent } from "react";
import { config } from "../../../../config";
import { ICard } from "../../../../models/ICard";
import styles from "./CardUnit.module.scss";

interface CardUnitProps {
  card: ICard;
}
const CardUnit: FunctionComponent<CardUnitProps> = (props) => {
  let type;

  const imageUrl = !props.card.image
    ? require(`../../../../assets/logo.jpg`)
    : config.directus + config.directus_files + props.card.image.filename_disk;

  return (
    <div
      className={[
        styles.CardUnit,
        styles.container,
        styles[props.card.entity.shortname],
      ].join(" ")}
    >
      <div className={styles.deploy}>{props.card.cost}</div>
      <div className={styles.Faction}>
        <span>{props.card.entity.name}</span>
      </div>
      <div className={styles.name}>
        <span>{props.card.name}</span>
      </div>
      <div className={styles.type}>{type}</div>
      <div
        className={styles.Image}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {/* <img src={require(`../../../assets/logo.jpg`)} alt="boss orc" /> */}
      </div>
      <div className={styles.Regiment}>{props.card.life}</div>
      <div className={styles.Capacites}>{props.card.capacity}</div>
      <div className={styles.DetailCarac}>
        {props.card.attack !== 0 ? (
          <div className={styles.ItemCarac}>
            <div>{props.card.attack}</div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default CardUnit;
