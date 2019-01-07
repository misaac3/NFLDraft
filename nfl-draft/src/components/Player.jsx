import React, { Component } from 'react'

class Player extends Component {
  render() {
    return (
      <div>
      {this.props.name} 
      {this.props.school} 
      {this.props.position} 
      {this.props.rank} 
      </div>
    )
  }
}

export default Player
