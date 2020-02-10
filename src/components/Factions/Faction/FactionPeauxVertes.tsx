import React, { FunctionComponent } from 'react';
import { config } from '../../../config';
import { IFaction } from '../../../models/IFaction';
import styles from './FactionPeauxVertes.module.css';


interface FactionPeauxVertesProps {
  faction: IFaction;
}

const FactionPeauxVertes: FunctionComponent<FactionPeauxVertesProps> = ({ faction }) => {

  const backgroundImage = config.directus + config.directus_files + faction.image.filename_disk;
  return (
    <div className={styles.Faction}>
      {faction ?
        <React.Fragment>
          <div className={styles.Main}>
            <div style={{ backgroundImage: `url(${backgroundImage})` }}
              className={styles.BgImage}
              title={faction.name} />
            <div className={styles.Description}>
              <h2 className={styles.Title}>{faction.name}</h2>
              <div className={styles.Lettrine}
                dangerouslySetInnerHTML={{ __html: faction.description }} />
            </div>

          </div>
        </React.Fragment> : null}
    </div>
  );
}


export default FactionPeauxVertes;