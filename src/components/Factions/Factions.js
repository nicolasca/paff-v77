import React, { Component } from 'react';
import axios from 'axios';
import styles from './Factions.module.css';


class Factions extends Component {

    state = {
        factions: [],
    }

    componentDidMount() {
        axios.get('http://localhost:3008/factions').then((response) => {
            const factionsLoaded = response.data.map((faction) => {

                return (
                    <div className={styles.FactionItem} key={faction._id}>
                        <img className={styles.Logo}
                            src={process.env.PUBLIC_URL + 'assets/factions/logo-' + faction.image}
                            alt={faction.nom + ' image'} />
                        <h3>{faction.nom}</h3>
                    </div>
                );
            });

            this.setState({ factions: factionsLoaded });
        });


    }

    render() {
        return (
            <div className={styles.FactionList}>
                {this.state.factions}
            </div>
        );
    }
}

export default Factions;