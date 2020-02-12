import React, { FunctionComponent } from "react";
import { config } from "../../config";
import { IFaction } from "../../models/IFaction";
import { FactionService } from "../../services/Faction.service";
import styles from "./Factions.module.scss";

const Factions: FunctionComponent = () => {
  const [factions, setFactions] = React.useState<IFaction | null>(null);

  React.useEffect(() => {
    FactionService.getFactions()
      .then((factions) => {
        console.log(factions);
        setFactions(
          factions.data.map((faction: IFaction) => {
            let factionComponent = null;
            const backgroundImage = config.directus + config.directus_files + faction.image.filename_disk;

            factionComponent = (
              <div className={styles.Faction + ' ' + styles[faction.slug]}>
                {faction ?
                  <React.Fragment>
                    <div style={{ backgroundImage: `url(${backgroundImage})` }}
                      className={styles.BgImage}
                      title={faction.name} />
                    <div className={styles.Description}>
                      <h2 className={styles.Title}>{faction.name}</h2>
                      <div className={styles.Lettrine + ' edito'}>
                        <p dangerouslySetInnerHTML={{ __html: faction.description }}></p>
                      </div>
                    </div>

                  </React.Fragment> : null}
              </div>
            )

            // if (faction.slug === "peaux-vertes") {
            //   factionComponent = (
            //     <FactionPeauxVertes
            //       key="PV"
            //       faction={faction}
            //     ></FactionPeauxVertes>
            //   );
            // }
            // if (faction.slug === "gaeli") {
            //   factionComponent = (
            //     <FactionGaeli key="gaeli" faction={faction}></FactionGaeli>
            //   );
            // }
            // if (faction.slug === "sephosi") {
            //   factionComponent = (
            //     <FactionSephosi key="sephosi" faction={faction}></FactionSephosi>
            //   );
            // }
            // if (faction.slug === "liches") {
            //   factionComponent = (
            //     <FactionLiches key="liches" faction={faction}></FactionLiches>
            //   );
            // }

            return factionComponent;
          })
        );
      });
  }, []);



  return (
    <div className={styles.Faction}>{factions}</div>
  );
};

export default Factions;
