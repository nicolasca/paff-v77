import React, { FunctionComponent } from 'react';
import { config } from '../../../config';
import { IFaction } from '../../../models/IFaction';
import styles from './FactionGaeli.module.css';

interface FactionGaeliProps {
  faction: IFaction;
}

const FactionGaeli: FunctionComponent<FactionGaeliProps> = ({ faction }) => {

  const backgroundImage = config.directus + config.directus_files + faction.image.filename_disk;
  return (
    <div className={styles.Faction}>
      {faction ?
        <React.Fragment>
          <div style={{ backgroundImage: `url(${backgroundImage})` }}
            className={styles.BgImage}
            title={faction.name} />
          <div className={styles.Description}>
            <h2 className={styles.Title}>{faction.name}</h2>
            <div className={styles.Lettrine}
              dangerouslySetInnerHTML={{ __html: faction.description }} />
          </div>
        </React.Fragment>
        : null}
    </div>
  );

};


export default FactionGaeli;