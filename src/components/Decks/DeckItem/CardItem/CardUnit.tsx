import React, { FunctionComponent } from "react";
import { config } from "../../../../config";
import { ICard } from "../../../../models/ICard";
import styles from "./CardUnit.module.scss";

interface CardUnitProps {
  card: ICard;
}
const CardUnit: FunctionComponent<CardUnitProps> = (props) => {
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
      <div className={styles.Entity}>{props.card.entity.shortname}</div>
      <div className={styles.Faction}>
        <span>{props.card.faction.name}</span>
      </div>
      <div className={styles.name}>
        <span>{props.card.name}</span>
      </div>
      <div className={styles.Cost}>{props.card.cost}</div>
      <div
        className={styles.Image}
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      {props.card.is_unit ? (
        <>
          <div className={styles.DetailCarac}>
            <div className={styles.Life}>{props.card.life}</div>
            <div className={styles.Attack}>{props.card.attack}</div>
            <div className={styles.Type}>
              {props.card.type_unit ? props.card.type_unit : ""}
            </div>
          </div>
          <div className={styles.Capacities + " " + styles.CapacitiesSmall}>
            {props.card.capacity}
          </div>
        </>
      ) : (
        <div className={styles.Capacities + " " + styles.CapacitiesLarge}>
          {props.card.capacity}
        </div>
      )}
    </div>
  );
};

export default CardUnit;
