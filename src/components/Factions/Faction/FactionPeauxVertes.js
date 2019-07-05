import React, { Component } from 'react';
import axios from 'axios';
import { config } from '../../../config';
import bossOrc from '../../../assets/factions/boss-orc.jpg'
import shamanOrc from '../../../assets/factions/shaman-orc.jpg'
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
                    <React.Fragment>
                    <div className={styles.Main}>
                        <div className={styles.BgImage}
                            alt={this.state.faction.nom} />
                        <div className={styles.Description}>
                            <h2 className={styles.Title}>{this.state.faction.nom}</h2>
                            <div className={styles.Lettrine}
                                dangerouslySetInnerHTML={{ __html: this.state.faction.description }} />
                        </div>

                    </div> 
                    <div className={styles.SecondPart}>
                        <div className={styles.BossOrcImg}>
                        <img src={bossOrc} alt=""/>
                        </div>
                        <div className={styles.BossOrcDesc}>
                        <h3 class="title is-2"> Boss Orc</h3>
                        </div>

                        <div className={styles.ShamanOrcImg}>
                        <img src={shamanOrc} alt=""/>
                        </div>
                        <div className={styles.ShamanOrcDesc}>
                        <h3 class="title is-2"> Shaman Orc</h3>
                        </div>
                    </div>
                    </React.Fragment>: null}
            </div>
        );
    }
}


export default FactionPeauxVertes;