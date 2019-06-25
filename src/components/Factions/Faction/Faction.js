import React, { Component } from 'react';
import axios from 'axios';
import styles from './Faction.module.css';

class Faction extends Component {

    state = {
        faction: null,
        style: {
        }
    };



    componentDidMount() {
        console.log(this.props);
        if (this.props.match.params.slug) {
            axios.get('http://localhost:3008/factions/' + this.props.match.params.slug).then((response) => {

                this.setState({
                    faction: response.data,
                    style: {
                        height: '50vh',
                        backgroundSize: '100%',
                        backgroundPosition: 'top',
                        backgroundImage: 'url("../../../assets/factions/' + response.data.image + '")',
                    }
                });
            });
        }
    }

    render() {
        return (
            <div>
                {this.state.faction ?
                    <div>
                        <div style={this.state.style}
                            alt={this.state.faction.nom} />
                        <h3>{this.state.faction.nom}</h3>
                        <p>{this.state.faction.description} </p>
                    </div> : null}
            </div>
        );
    }

}

export default Faction;