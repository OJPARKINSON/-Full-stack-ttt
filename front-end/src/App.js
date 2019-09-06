import React from 'react';
import axios from 'axios';
import './App.css';
import Board from './components/board'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputName1: "", inputName2: "", player1: [], player2: []};
  }

  componentDidMount() {
    var name1 = prompt("What is player 1's name?");
    this.setState({inputName1: name1.toLowerCase})
    var name2 = prompt("What is player 2's name?");
    this.setState({inputName2: name2.toLowerCase})
    this.getPlayer(name1, 1);
    this.getPlayer(name2, 2);
  }
  
  getPlayer(name, player) {
    if (player === 1) {
      axios.get(`http://127.0.0.1:9393/userStats?name=${name}&type=old`)
      .then(res => {
        var result = res.data
        console.log(result)
        this.setState({player1: result})
      })
      .catch(function (error) {
        axios.get(`http://127.0.0.1:9393/userStats?name=${name}&type=new`)
        .then(
          this.getPlayer(name, 1)
        )
      })
    }
    if (player === 2) {
      axios.get(`http://127.0.0.1:9393/userStats?name=${name}&type=old`)
      .then(res => {
        var result = res.data
        console.log(result)
        this.setState({player2: result})
      })
      .catch(function (error) {
        axios.get(`http://127.0.0.1:9393/userStats?name=${name}&type=new`)
        .then(
          this.getPlayer(name, 2)
        )
      })
    }
  } 

  render() {
    return (
      <div>
        <Board player1={this.state.player1[1]} player2={this.state.player2[1]}/>
        <div className="players">
          <div className="player1">
            <h2>Player 1</h2>
            <p>Name: {this.state.player1[1]}</p>
            <p>Wins: {this.state.player1[2]}</p>
            <p>Loses: {this.state.player1[3]}</p>
            <p>Games Played: {this.state.player1[4]}</p>
          </div>
          <div className="player2">
            <h2>Player 2</h2>
            <p>Name: {this.state.player2[1]}</p>
            <p>Wins: {this.state.player2[2]}</p>
            <p>Loses: {this.state.player2[3]}</p>
            <p>Games Played: {this.state.player2[4]}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
