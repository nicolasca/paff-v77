import React from 'react';

function Faction(props) {


    return (
        <div key={props.faction._id}>
            <img className={styles.Logo}
                src={process.env.PUBLIC_URL + 'assets/factions/logo-' + props.faction.image}
                alt="{props.faction.nom}" />
            <h3>{props.faction.nom}</h3>
            <p>{props.faction.description} </p>
        </div>
    )
}

export default Faction;