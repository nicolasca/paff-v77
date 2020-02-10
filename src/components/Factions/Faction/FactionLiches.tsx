import React, { FunctionComponent } from 'react';
import { config } from '../../../config';
import { IFaction } from '../../../models/IFaction';
import styles from './FactionLiches.module.css';


interface FactionLichesProps {
  faction: IFaction;
}

const FactionLiches: FunctionComponent<FactionLichesProps> = ({ faction }) => {

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

        </React.Fragment> : null}
    </div>
  );
}

export default FactionLiches;