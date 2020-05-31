import React from "react";

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

export default class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)}/>;
    }

    render() {
        let counter = 0;
        let board = [];

        let row = [];
        for (let i=0; i <= 6; i++) {
            row.push(this.renderSquare(counter));
            counter++;
        }
        board.push(<div className="board-row">{row}</div>)

        return board;
    }
}