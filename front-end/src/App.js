import React from 'react';
import axios from 'axios';
import './App.css';
import Board from './components/board'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputName: "", name: "", wins: null, loses: null};
  }

  componentDidMount() {
    var name = prompt("What is your name?");
    this.setState({inputName: name})
    this.getUser(name);
  }
  
  getUser(name) {
    axios.get(`http://127.0.0.1:9393/userStats?name=${name}`)
    .then(res => {
      var result = res.data
      console.log(result)
      this.setState({name: result[0], wins: result[1], loses: result[2]})
    })
  } 

  render() {
    return (
      <div>
        <Board name={this.state.inputName} />
        <p>{this.state.name}</p>
        <p>{this.state.wins}</p>
        <p>{this.state.loses}</p>
      </div>
    )
  }
}

export default App;
