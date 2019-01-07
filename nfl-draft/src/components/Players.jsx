import React, { Component } from 'react'
import Player from './Player';
import data from './bigboard.json';


export class Players extends Component {
    render() {
        console.log(data)
        return (
            <div className="col-6">
                <ul className="list-group">
                    {data.map(({name, position, school, rank}) => <Player name={name} position={position} school={school} rank={rank} key={rank} />)}
                </ul>
            </div>
        )
    }
}

export default Players
