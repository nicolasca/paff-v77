import React, { Component } from 'react';
import axios from 'axios';
import { config } from '../../../config';
import styles from './FactionPeauxVertes.module.css';

class FactionPeauxVertes extends Component {

    state = {
        faction: null,
    };

    componentDidMount() {

        axios.get(config.host + ':3008/factions/peaux-vertes').then((response) => {

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


export default FactionPeauxVertes;