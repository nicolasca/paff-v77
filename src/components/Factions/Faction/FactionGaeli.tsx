import React, { FunctionComponent } from 'react';
import { IFaction } from '../../../models/IFaction';
import styles from './FactionGaeli.module.css';

interface FactionGaeliProps {
  faction: IFaction;
}

const FactionGaeli: FunctionComponent<FactionGaeliProps> = ({ faction }) => {

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
        </React.Fragment>
        : null}
    </div>
  );

};


export default FactionGaeli;