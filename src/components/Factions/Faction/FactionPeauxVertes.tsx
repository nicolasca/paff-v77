import axios from 'axios';
import React, { FunctionComponent } from 'react';
import bossOrc from '../../../assets/factions/boss-orc.jpg';
import shamanOrc from '../../../assets/factions/shaman-orc.jpg';
import { config } from '../../../config';
import { IFaction } from '../../../models/IFaction';
import styles from './FactionPeauxVertes.module.css';

const FactionPeauxVertes: FunctionComponent = () => {

  const [faction, setFaction] = React.useState<IFaction>(null!);

  React.useEffect(() => {
    axios.get(config.host + ':3008/factions/peaux-vertes').then((response) => {
      setFaction(response.data);
    });
  })


  return (
    <div>
      {faction ?
        <React.Fragment>
          <div className={styles.Main}>
            <div className={styles.BgImage}
              title={faction.nom} />
            <div className={styles.Description}>
              <h2 className={styles.Title}>{faction.nom}</h2>
              <div className={styles.Lettrine}
                dangerouslySetInnerHTML={{ __html: faction.description }} />
            </div>

          </div>
          <div className={styles.SecondPart}>
            <div className={styles.BossOrcImg}>
              <img src={bossOrc} alt="" />
            </div>
            <div className={styles.BossOrcDesc}>
              <h3 className="title is-2"> Boss Orc</h3>
            </div>

            <div className={styles.ShamanOrcImg}>
              <img src={shamanOrc} alt="" />
            </div>
            <div className={styles.ShamanOrcDesc}>
              <h3 className="title is-2"> Shaman Orc</h3>
            </div>
          </div>
        </React.Fragment> : null}
    </div>
  );
}


export default FactionPeauxVertes;