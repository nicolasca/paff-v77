import React, { Component } from 'react';
import axios from 'axios';
import { config } from '../../../config';

class Faction extends Component {

    state = {
        faction: null,
        style: {
        }
    };



    componentDidMount() {
        if (this.props.match.params.slug) {
            axios.get(config.host + ':3008/factions/' + this.props.match.params.slug).then((response) => {

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
                        <div className="container content">
                            <h2>{this.state.faction.nom}</h2>
                            <p>{this.state.faction.description} </p>
                        </div>

                    </div> : null}
            </div>
        );
    }

}

export default Faction;