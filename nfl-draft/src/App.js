import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.jsx';
// import Player from './components/Player.jsx';
import Players from './components/Players.jsx';

// import data from './cbigboard.json';



class App extends Component {
  render() {
    
    // console.log(data)
    return (
      <div>
        < Header /> 
        
        < Players />
      </div>
    );
  }
}

export default App;
