import React, { FunctionComponent, useEffect, useState } from "react";
import { IUnit } from "../../../models/ICard";
import { IFaction } from "../../../models/IFaction";
import { FactionService } from "../../../services/Faction.service";
import { UnitsService } from "../../../services/Units.service";
import CardList from "../DeckItem/CardList/CardList";
import styles from "./TheCards.module.scss";

interface TheCardsProps {}

const TheCards: FunctionComponent<TheCardsProps> = props => {
  const [units, setUnits] = useState<IUnit[]>([]);
  const [factions, setFactions] = useState<IFaction[]>([]);
  const [selectedFaction, setSelectedFaction] = useState<IFaction>(null!);
  const [factionsOptions, setFactionsOptions] = useState([]);

  async function setData() {
    const factions = await FactionService.getFactions();
    setFactions(factions.data);
    setSelectedFaction(factions.data[0]);
    // Factions
    const factionOptions = factions.data.map((faction: IFaction) => {
      return (
        <option key={faction.slug} value={faction.slug}>
          {faction.name}
        </option>
      );
    });
    setFactionsOptions(factionOptions);

    const units = await UnitsService.getUnits(factions.data[0].slug);
    setUnits(units.data);
  }

  useEffect(() => {
    setData();
  }, []);

  useEffect(() => {
    if (selectedFaction) {
      UnitsService.getUnits(selectedFaction.slug).then(response => {
        setUnits(response.data);
      });
    }
  }, [selectedFaction]);

  const changeFactionHandler = (event: any) => {
    const faction: IFaction = factions.find(
      faction => faction.slug === event.target.value
    )!;
    setUnits([]);
    setSelectedFaction(faction);
  };

  return (
    <div className={styles.TheCards}>
      {factions && factions.length > 1 ? (
        <div className="control">
          <div className="select">
            <select onChange={changeFactionHandler} id="TheSelect">
              {factionsOptions}
            </select>
          </div>
        </div>
      ) : null}

      <div>
        {selectedFaction && selectedFaction.order ? (
          <>
            <h3>Ordre spécial</h3>
            <div>
              <h4>{selectedFaction.order.name}</h4>
              <p>{selectedFaction.order.description}</p>
            </div>
          </>
        ) : null}

        {units && units.length > 1 ? (
          <CardList units={units} faction={selectedFaction}></CardList>
        ) : null}
      </div>
    </div>
  );
};

export default TheCards;
