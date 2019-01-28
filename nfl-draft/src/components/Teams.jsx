import React, { Component } from 'react'
import Team from './Team';


export class Teams extends Component {

  constructor(props) {
    super(props);

    this.state = {
      players: this.props.players,
      playerWasSelected: this.props.playerWasSelected,
      teams: this.props.teams,
      teamsToPlayer: this.props.teamsToPlayer
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ teams: nextProps.teams, teamsToPlayer: nextProps.teamsToPlayer });

  }


  render() {

    return (
      <div className="col-6 list-group" >
        <div className="list-group">
          {this.state.teams.map((p) =>
            < Team
              pick={p}
              playerPicked={
                this.state.players[this.state.teamsToPlayer[(p.key) - 1] - 1]
              }

              active="active"
              pickWasSelected={this.props.pickWasSelected}
            />)}
        </ div>

      </div >
    )
  }
}

export default Teams
