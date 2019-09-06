import React from 'react';
import axios from 'axios';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {squares: Array(9).fill(null), fc: 0, isNext: "O"};
    }

    componentDidMount() {
        this.play()
    }

    play() {
        this.setState({squares: Array(9).fill(null)})
        this.emptyIndexies(this.state.squares);
    }

    renderSquare(i) {
        return <button onClick={() => this.handlePick(i)}>{this.state.squares[i]}</button>
    }

    handlePick(i) {
        const squares = this.state.squares;
		if (this.winner(squares)) {
            console.log("Won")
            return;
		}

		if(this.full(squares) === "X" || this.full(squares) === "O" ) {
            console.log("full")
			return;
        }
        var next = "";
        squares[i] = this.state.isNext;

        if (this.state.isNext === "O") {
            next = "X";
        } 
        if (this.state.isNext === "X") {
            next = "O";
        }
		this.setState({
			squares: squares,
			isNext: next
        });
        
    }

    // minimax(newBoard, player){
    //     if (this.winner(this.state.squares)) {
    //         return;
    //     } else if(!this.winner(this.state.squares) && this.isFilled) {
    //         return;
    //     }

    //     var updatedFC = this.state.fc + 1
    //     this.setState({fc: updatedFC});
    //     console.log(this.state.fc);
    //     var availSpots = this.emptyIndexies(newBoard);
    //     var huPlayer = "O";
    //     var aiPlayer = "X";
    //     if (this.winning(newBoard, huPlayer)){
    //         console.log("Huwinning")
    //        return {score:-10};
    //     }
    //     else if (this.winning(newBoard, aiPlayer)){
    //         console.log("Aiwinning")
    //       return {score:10};
    //       }
    //     else if (availSpots.length === 0){
    //         console.log("winning")
    //         return {score:0};
    //     }
    //     var moves = [];
    //     for (var i = 0; i < availSpots.length; i++){
    //         var move = {};
    //         var result = 0;
    //         newBoard[availSpots[i]] = player;
    //         if (player === aiPlayer){
    //             result = this.minimax(newBoard, huPlayer);
    //             move.score = result.score;
    //         }
    //         else{
    //         result = this.minimax(newBoard, aiPlayer);
    //         move.score = result.score;
    //         }
        
    //         newBoard[availSpots[i]] = move.index;
    //         moves.push(move);
    //     }
    //     var bestMove;
    //     if(player === aiPlayer){
    //       var bestScore = -10000;
    //       for(var i = 0; i < moves.length; i++){
    //         if(moves[i].score > bestScore){
    //           bestScore = moves[i].score;
    //           bestMove = i;
    //         }
    //       }
    //     }else{
    //       var bestScore = 10000;
    //       for(var i = 0; i < moves.length; i++){
    //         if(moves[i].score < bestScore){
    //           bestScore = moves[i].score;
    //           bestMove = i;
    //         }
    //       }
    //     }
    //     console.log(moves[bestMove])
    //     return moves[bestMove];
    // }

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

    // winning(board,player) {
    //     if (
    //         (board[0] === player && board[1] === player && board[2] === player) ||
    //         (board[3] === player && board[4] === player && board[5] === player) ||
    //         (board[6] === player && board[7] === player && board[8] === player) ||
    //         (board[0] === player && board[3] === player && board[6] === player) ||
    //         (board[1] === player && board[4] === player && board[7] === player) ||
    //         (board[2] === player && board[5] === player && board[8] === player) ||
    //         (board[0] === player && board[4] === player && board[8] === player) ||
    //         (board[2] === player && board[4] === player && board[6] === player)
    //         ) {
    //         console.log("this user is winning")
    //         return true;
    //     } else {
            
    //         return false;
    //     }
    // }

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

    emptyIndexies(board){
        return board.filter(s => s !== "O" && s !== "X")
    }

  render() {
    const winner = this.winner(this.state.squares);
    const isFilled = this.full(this.state.squares);
    let status;
    if (winner) {
        status = 'The winner is: ' + winner;
        if (winner === "O") {
            axios.get(`http://127.0.0.1:9393/gameEnded?winner=${this.props.player1}&loser=${this.props.player2}`);
        } else {
            axios.get(`http://127.0.0.1:9393/gameEnded?winner=${this.props.player2}&loser=${this.props.player1}`);
        }
    } else if(!this.winner(this.state.squares) && isFilled) {
        status = 'Game drawn';
        axios.get(`http://127.0.0.1:9393/draw?p1=${this.props.player2}&p2=${this.props.player1}`);
    } else {
        status = 'Now ' + this.state.isNext + '\'s turn';
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
        <form action={this.emptyIndexies(this.state.squares)}>
            <input type="submit" value="New game"/>
        </form>
    </div>
    )
  }
}

export default Board;
