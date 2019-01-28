import React, { Component } from 'react'
import Player from './Player';


export class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: this.props.players,
            playerWasSelected: this.props.playerWasSelected,
            teams: this.props.teams,
            teamsToPlayer: this.props.teamsToPlayer
        };
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ players: nextProps.players, teamsToPlayer: nextProps.teamsToPlayer });
    }

    render() {
        return (
            <div className="col-6 list-group">
                <div>
                    {this.state.players.map((p) =>
                        < Player
                            playerWasSelected={this.state.playerWasSelected}
                            player={p.player}
                            teamDraftedTo={
                                this.state.teams[
                                this.state.teamsToPlayer.indexOf(p.key)]
                            }
                            key={p.rank}
                            active="active"
                        />)}

                </div>
            </div>
        )
    }
}

export default Players
