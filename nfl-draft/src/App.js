import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Players from './components/Players.jsx';
import Teams from "./components/Teams.jsx";
import teamorder from './teamsorder.json';
import rankings from './bigboard.json';

class App extends Component {
  constructor(props) {
    super(props);
    const teams = teamorder.map(({ team, pickNum }) => {
      return { pick: { team, pickNum, isSelected: false, isPicked: false, playerPicked: null }, key: pickNum };
    });

    let teamToPlayer = []
    teams.forEach(({ pick }) => {
      teamToPlayer[pick.pickNum - 1] = null;
    });

    const players = rankings.map(({ rank, name, position, school }) => {
      return { player: { rank, name, position, school, isSelected: false, teamDraftedTo: null }, key: rank }
    });

    this.state = {
      playerSelected: null,
      pickSelected: null,
      teamToPlayer,
      teams,
      players
    }
  }

  playerWasSelected = (selectedPLayer) => {
    let { rank } = selectedPLayer
    let players = this.state.players;

    let newPlayerSelected = players[rank - 1]


    newPlayerSelected.player.isSelected = true;
    players[rank - 1] = newPlayerSelected;
    let ttp = this.state.teamToPlayer
    if (this.state.playerSelected) {
      let oldPlayerSelcted = players[this.state.playerSelected.key - 1].player
      oldPlayerSelcted.isSelected = false;
      players[this.state.playerSelected - 1] = oldPlayerSelcted;
    }


    if (this.state.pickSelected != null) {
      console.log('both a player and pick are selected')

      let pickSelectedNum = this.state.pickSelected.key

      ttp[pickSelectedNum - 1] = rank
      /*---------unselect pick and players------------------- */

      newPlayerSelected.player.isSelected = false;
      players[rank - 1] = newPlayerSelected;

      let pickNum = pickSelectedNum
      let teams = this.state.teams;
      let team = teams[pickNum - 1]
      team.pick.isPicked = false;
      teams[pickNum - 1] = team;

      this.setState({ teamsToPlayer: ttp, players, teams, playerSelected: null, pickSelected: null })
    }

    else {
      this.setState({ playerSelected: newPlayerSelected })
    }

  }

  pickWasSelected = (selectedPick) => {

    let ttp = this.state.teamToPlayer

    let { pickNum } = selectedPick
    let teams = this.state.teams;



    let team = teams[pickNum - 1]
    team.pick.isPicked = true;
    teams[pickNum - 1] = team;
    if (this.state.pickSelected != null) {

      let oldTeam = teams[this.state.pickSelected.pick.pickNum - 1]
      oldTeam.pick.isPicked = false;
      teams[this.state.pickSelected.pickNum - 1] = oldTeam
    }
    /* -------------------------------------------- */
    // This is for handling when both a player and a pick are selected


    let players = this.state.players;
    if (this.state.playerSelected) {
      console.log('both a player and pick are selected')
      team.pick.playerPicked = this.state.playerSelected.player;
      teams[pickNum - 1] = team;





      //teamToPlayer Stuff

      let playerSelectedRank = this.state.playerSelected.key
      if (ttp.includes(playerSelectedRank)) {
        let ind = ttp.indexOf(playerSelectedRank)
        ttp[ind] = null
      }
      ttp[selectedPick.pickNum - 1] = this.state.playerSelected.player.rank

      let playerSelected = players[playerSelectedRank - 1]

      playerSelected.player.isPicked = false;
      playerSelected.player.isSelected = false;
      players[playerSelectedRank - 1] = playerSelected


      team.pick.isPicked = false;
      teams[pickNum - 1] = team;

      this.setState({ teamsToPlayer: ttp, players, teams, playerSelected: null, pickSelected: null })

    }

    else {
      this.setState({ pickSelected: team })
    }


  }


  exportToText = () => {
    let ttp = this.state.teamsToPlayer
    let teams = this.state.teams
    let players = this.state.players
    
  }

  render() {

    return (
      <div>
        < Header />
        <button onClick={this.exportToText}>Export to Text!</button>
        <br />
        <div className="container">
          <div className="row">
            < Teams
              pickWasSelected={this.pickWasSelected}
              teams={this.state.teams}
              players={this.state.players}
              teamsToPlayer={this.state.teamToPlayer} />
            < br />
            < Players
              playerWasSelected={this.playerWasSelected}
              players={this.state.players}
              teams={this.state.teams}
              teamsToPlayer={this.state.teamToPlayer} />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
