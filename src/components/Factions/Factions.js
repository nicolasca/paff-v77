import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { config } from '../../config';
import styles from './Factions.module.scss';

class Factions extends Component {

  state = {
    factions: [],
  }

  componentDidMount() {
    axios.get(config.host + ':3008/factions').then((response) => {
      const factionsLoaded = response.data.map((faction) => {

        return (

          <div className={styles.FactionItem} key={faction._id}>
            < Link to={
              '/factions/' + faction.slug
            } >
              <img className={styles.Logo}
                src={process.env.PUBLIC_URL + 'assets/factions/logo-' + faction.image}
                alt={faction.nom + ' image'} />
              <h2>{faction.nom}</h2></Link>

          </div>
        );
      });

      this.setState({ factions: factionsLoaded });
    });


  }

  render() {
    return (
      <div className={styles.Faction}>
        {this.state.factions}
      </div>
    );
  }
}

export default Factions;