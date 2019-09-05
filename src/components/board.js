import React from 'react';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {squares: Array(9).fill(null)};
    }

    renderSquare(i) {
        return <button onClick={() => this.handleClick(i)}>{this.state.squares[i]}</button>
    }

    handleClick(i) {
        const squares = this.state.squares.slice();
		if (this.winner(squares) || squares[i]) {
			return;
		}

		if(this.full(squares) === true) {
			return;
		}
		
		squares[i] = this.state.isNext ? 'X' : 'O';
		this.setState({
			squares: squares,
			isNext: !this.state.isNext
		});
    }

    winner(squares) {
        const win_combination = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
      
        for (let i = 0; i < win_combination.length; i++) {
            const [a, b, c] = win_combination[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
      
        return null;
    }

    full(squares) {
        let count = 0;
        squares.forEach(function (item) {
            if (item !== null) {
                count++;
            }
        }); 
        if(count === 9) {
            return true;
        } else {
            return false;
        }
    }


  render() {
    const winner = this.winner(this.state.squares);
    const isFilled = this.full(this.state.squares);
    let status;
    if (winner) {
        status = 'The winner is: ' + winner;
    } else if(!winner && isFilled) {
        status = 'Game drawn';
    } else {
        status = 'Now ' + (this.state.isNext ? 'X' : 'O') + '\'s turn';
    }

    return (
    <div className="container">
        <h1 className="status">{status}</h1>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
    </div>
    )
  }
}

export default Board;
