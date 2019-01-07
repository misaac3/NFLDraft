import React, { Component } from 'react'

class Player extends Component {
  render() {
    return (
      <li className="list-group-item">
      <h4>{this.props.rank}.) {this.props.name}</h4> {this.props.school}, {this.props.position}
      </li>
    )
  }
}

export default Player
