import React, { FunctionComponent } from 'react';
import { IFaction } from '../../../models/IFaction';
import styles from './FactionLiches.module.css';


interface FactionLichesProps {
  faction: IFaction;
}

const FactionLiches: FunctionComponent<FactionLichesProps> = ({ faction }) => {

  return (
    <div className={styles.Faction}>
      {faction ?
        <React.Fragment>
          <div className={styles.BgImage}
            title={faction.nom} />
          <div className={styles.Description}>
            <h2 className={styles.Title}>{faction.nom}</h2>
            <div className={styles.Lettrine}
              dangerouslySetInnerHTML={{ __html: faction.description }} />
          </div>

        </React.Fragment> : null}
    </div>
  );
}

export default FactionLiches;