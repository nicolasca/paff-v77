import axios from 'axios';
import React, { FunctionComponent } from 'react';
import { config } from '../../../config';
import { IFaction } from '../../../models/IFaction';
import styles from './FactionGaeli.module.css';

const FactionGaeli: FunctionComponent = () => {

  const [faction, setFaction] = React.useState<IFaction>(null!);

  React.useEffect(() => {
    axios.get(config.host + ':3008/factions/gaeli').then((response) => {
      setFaction(response.data);
    });
  })

  return (
    <div>
      {faction ?
        <div>
          <div className={styles.BgImage}
            title={faction.nom} />
          <div className={styles.Description}>
            <h2 className={styles.Title}>{faction.nom}</h2>
            <div className={styles.Lettrine}
              dangerouslySetInnerHTML={{ __html: faction.description }} />
          </div>

        </div> : null}
    </div>
  );

};


export default FactionGaeli;