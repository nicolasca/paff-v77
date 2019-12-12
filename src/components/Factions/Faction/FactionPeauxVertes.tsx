import React, { FunctionComponent } from 'react';
import { IFaction } from '../../../models/IFaction';
import styles from './FactionPeauxVertes.module.css';


interface FactionPeauxVertesProps {
  faction: IFaction;
}

const FactionPeauxVertes: FunctionComponent<FactionPeauxVertesProps> = ({ faction }) => {

  return (
    <div className={styles.Faction}>
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
          {/* <div className={styles.SecondPart}>
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
          </div> */}
        </React.Fragment> : null}
    </div>
  );
}


export default FactionPeauxVertes;