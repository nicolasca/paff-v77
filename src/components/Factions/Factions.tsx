import axios from "axios";
import React, { FunctionComponent } from "react";
import { config } from "../../config";
import { IFaction } from "../../models/IFaction";
import FactionGaeli from "./Faction/FactionGaeli";
import FactionLiches from "./Faction/FactionLiches";
import FactionPeauxVertes from "./Faction/FactionPeauxVertes";
import FactionSephosi from "./Faction/FactionSephosi";
import styles from "./Factions.module.scss";

const Factions: FunctionComponent = () => {
  const [factions, setFactions] = React.useState<IFaction | null>(null);

  React.useEffect(() => {
    axios.get(config.host + ":3008/factions").then(response => {
      setFactions(
        response.data.map((faction: IFaction) => {
          let factionComponent = null;

          if (faction.slug === "peaux-vertes") {
            factionComponent = (
              <FactionPeauxVertes
                key="PV"
                faction={faction}
              ></FactionPeauxVertes>
            );
          }
          if (faction.slug === "gaeli") {
            factionComponent = (
              <FactionGaeli key="gaeli" faction={faction}></FactionGaeli>
            );
          }
          if (faction.slug === "sephosi") {
            factionComponent = (
              <FactionSephosi key="sephosi" faction={faction}></FactionSephosi>
            );
          }
          if (faction.slug === "liches") {
            factionComponent = (
              <FactionLiches key="liches" faction={faction}></FactionLiches>
            );
          }

          return factionComponent;
        })
      );
    });
  }, []);

  return <div className={styles.Faction}>{factions}</div>;
};

export default Factions;
