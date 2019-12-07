import axios from 'axios';
import React, { Component } from 'react';
import { config } from '../../../config';
import styles from './FactionGaeli.module.css';

class FactionGaeli extends Component {

  state = {
    faction: null,
  };

  componentDidMount() {

    axios.get(config.host + ':3008/factions/gaeli').then((response) => {

      this.setState({
        faction: response.data,
      });
    });

  }

  render() {
    return (
      <div>
        {this.state.faction ?
          <div>
            <div className={styles.BgImage}
              alt={this.state.faction.nom} />
            <div className={styles.Description}>
              <h2 className={styles.Title}>{this.state.faction.nom}</h2>
              <div className={styles.Lettrine}
                dangerouslySetInnerHTML={{ __html: this.state.faction.description }} />
            </div>

          </div> : null}
      </div>
    );
  }
}


export default FactionGaeli;