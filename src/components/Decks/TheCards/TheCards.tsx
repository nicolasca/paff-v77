import React, { FunctionComponent, useEffect, useState } from "react";
import { IEntity } from "../../../models/IEntity";
import { CardService } from "../../../services/Card.service";
import { EntityService } from "../../../services/Entity.service";
import CardList from "../DeckItem/CardList/CardList";
import styles from "./TheCards.module.scss";
import { ICard } from "../../../models/ICard";

interface TheCardsProps {}

const TheCards: FunctionComponent<TheCardsProps> = (props) => {
  const [cards, setCards] = useState<ICard[]>([]);
  const [entities, setEntities] = useState<IEntity[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<IEntity>(null!);
  const [entitiesOptions, setEntitiesOptions] = useState([]);

  async function setData() {
    const entities = await EntityService.getEntities();
    setEntities(entities.data);
    setSelectedEntity(entities.data[0]);
    // Entities
    const entityOptions = entities.data.map((entity: IEntity) => {
      return (
        <option key={entity.shortname} value={entity.shortname}>
          {entity.name}
        </option>
      );
    });
    setEntitiesOptions(entityOptions);

    const cards = await CardService.getCards(entities.data[0].shortname);
    setCards(cards.data);
  }

  useEffect(() => {
    setData();
  }, []);

  useEffect(() => {
    if (selectedEntity) {
      CardService.getCards(selectedEntity.shortname).then((response) => {
        setCards(response.data);
      });
    }
  }, [selectedEntity]);

  const changeEntityHandler = (event: any) => {
    const entity: IEntity = entities.find(
      (entity) => entity.shortname === event.target.value
    )!;
    setCards([]);
    setSelectedEntity(entity);
  };

  return (
    <div className={styles.TheCards}>
      {entities && entities.length > 1 ? (
        <div className="control">
          <div className="select">
            <select onChange={changeEntityHandler} id="TheSelect">
              {entitiesOptions}
            </select>
          </div>
        </div>
      ) : null}

      <div>
        {cards && cards.length > 1 ? (
          <CardList cards={cards} entity={selectedEntity}></CardList>
        ) : null}
      </div>
    </div>
  );
};

export default TheCards;
