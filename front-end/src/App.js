import React from 'react';
import axios from 'axios';
import './App.css';
import Board from './components/board'

class App extends React.Component {

  componentDidMount() {
    axios.get(`http://localhost:9393/test`)
    .then(res => {
      console.log(res.data);
    })
  }

  render() {
    return (
      <div>
        <Board />
      </div>
    )
  }
}

export default App;
