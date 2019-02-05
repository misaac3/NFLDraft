import React, { Component } from 'react'
import Player from './Player';
import PositionButton from './PositionButton'
// import ListGroup from "../../node_modules/react-bootstrap/lib/ListGroup"


export class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: this.props.players,
            playerWasSelected: this.props.playerWasSelected,
            teams: this.props.teams,
            teamsToPlayer: this.props.teamsToPlayer,
            positionFilter: Array.from(new Set(this.props.players.map(p => p.player.position))),
            uniquePositions: Array.from(new Set(this.props.players.map(p => p.player.position))).sort(),
            hideDrafted: true

        };
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ players: nextProps.players, teamsToPlayer: nextProps.teamsToPlayer });
    }

    filterPositionOnClick = (pos, e) => {
        let pf = this.state.positionFilter

        // console.log('index of edge: ', pf.indexOf('Edge'))
        if (pf.includes(pos)) {
            pf = pf.filter(p => p !== pos)
        }
        else {
            pf.push(pos)
        }
        this.setState({ positionFilter: pf })
    }

    getPlayersArray = () => {
        let { positionFilter } = this.state

        let playersArray = this.state.players.filter(
            player => {
                return positionFilter.includes(player.player.position)
            }
        )

        return playersArray;
    }

    render() {
        let { uniquePositions } = this.state
        let playersArray = this.getPlayersArray();

        return (
            <div className="col-6"  >
                {/* <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary ">Show Drafted Players</button>
                    <button type="button" className="btn btn-danger">Hide Drafted Players</button>
                </div> */}


                <div className="btn-group" data-toggle='buttons' onClick={() => { this.setState({ hideDrafted: !this.state.hideDrafted }) }}>
                    <label className={"btn " + (this.state.hideDrafted ? 'btn-secondary' : 'btn-success')}>
                        {this.state.hideDrafted ? 'Check to show drafted players' : 'Check to hide drafted players'}
                    </label>
                </div>
                <div className='row'>
                    <button className='btn btn-info float-left' onClick={() => this.setState({ positionFilter: this.state.uniquePositions })}>Show All Positions</button>
                    <button className='btn btn-info float-right' onClick={() => this.setState({ positionFilter: [] })}>Hide All Positions</button>
                </div>
                <br /><br />
                <div className="row">
                    {uniquePositions.map(pos =>

                        <PositionButton
                            filterPosition={this.filterPositionOnClick}
                            pos={pos}
                            show={this.state.positionFilter.includes(pos)}
                            key={pos}
                        />

                    )}
                </div>
                <div
                    className="list-group"
                >
                    <br />
                    <div>
                        {playersArray.filter((p) => {
                            if (this.state.hideDrafted) {
                                return !this.state.teamsToPlayer.includes(p.key)
                            }
                            else {
                                return true
                            }
                        })
                            .map((p) =>
                                < Player
                                    playerWasSelected={this.state.playerWasSelected}
                                    player={p.player}
                                    teamDraftedTo={
                                        this.state.teams[
                                        this.state.teamsToPlayer.indexOf(p.key)]
                                    }
                                    key={p.player.rank}
                                    isPicked={(this.state.teamsToPlayer.includes(p.key))}
                                    active="active"
                                />
                            )}

                    </div>
                </div>
            </div>
        )
    }
}

export default Players
