import React, { Component } from 'react';
import axios from 'axios';
import { config } from './../../config';
import { connect } from 'react-redux';

class DeckList extends Component {

    componentDidMount() {
        var headers = {
            'Authorization': 'Bearer ' + this.props.token,
        }
        axios.get(config.host + ':3008/decks', { headers })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })

        /* < div className = "control" >
                <div className="select">
                    <select onChange={this.changeFactionHandler}
                        value={this.state.selectedFaction.slug}
                        id="TheSelect">
                        <option value="peaux-vertes">Peaux Vertes</option>
                        <option value="sephosi">Sephosi</option>
                        <option value="gaeli">Gaeli</option>
                        <option value="liches">Liches</option>
                    </select>
                </div>
                </div > */
    }

    render() {
        return (
            <div></div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.authReducer.token,
    }
}

export default connect(mapStateToProps)(DeckList);