import React from "react";
import Board from "./board.js";

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            runeBoard: this.getStartingLineup(),
            emptySocket: 3,
            statusMessage: "Fang an...",
        };
    }

    getStartingLineup() {
        let runeBoard = Array(7).fill(null);
        let i;
        for ( i = 0; i <= 2; i++ ) {
            runeBoard[i] = "X";
        }
        for ( i = 4; i <= 6; i++ ) {
            runeBoard[i] = "Y";
        }
        return runeBoard;
    }

    restartGame() {
        this.setState( {
            runeBoard: this.getStartingLineup(),
            emptySocket: 3,
        });
    }

    // Click on Rune at Position i
    handleClick(i) {

        let statusMessage = "";
        let updatedBoard = this.state.runeBoard.slice();
        let emptySocket = this.state.emptySocket;

        if ( this.isSolved(this.state.runeBoard) ) {
            return;
        }

        // Click on empty Socket
        if ( i == this.state.emptySocket) {
            statusMessage = "Ich habe dich für klüger gehalten..."
        }

        if (this.moveIsValid( updatedBoard, i, emptySocket)) {
            // Change Runes
            statusMessage = "Nicht so blöd wie du aussiehst...";
            updatedBoard[emptySocket] = updatedBoard[i];
            updatedBoard[i] = null;
            emptySocket = i;
        } else {
            // Reset Board
            updatedBoard = this.getStartingLineup();
            emptySocket = 3;
            statusMessage = "Du wirst hier nie wieder rauskommen!"
        }


        this.setState({
                runeBoard: updatedBoard,
                emptySocket: emptySocket,
                statusMessage: statusMessage,
            }
        )
    }

    moveIsValid(board, selectedRunePosition, emptySocketPosition) {
        let isValid = true;
        const runeContent = board[selectedRunePosition];

        if (runeContent == "X") {
            if ( selectedRunePosition > emptySocketPosition ) isValid = false;
        }
        else if ( runeContent == "Y") {
            if ( selectedRunePosition < emptySocketPosition ) isValid = false;
        }

        if ( ( Math.abs(selectedRunePosition - emptySocketPosition) > 2 ) ) isValid = false;

        return isValid;
    }

    isStucked() {
        let i;
        let isStucked = true;
        const runeBoard = this.state.runeBoard;
        const emptySocket = this.state.emptySocket;

        for (i = 0; i < runeBoard.length; i++) {
            if (this.moveIsValid(runeBoard, i, emptySocket) && ( runeBoard[i] != null )) {
                isStucked = false;
                break
            }
        }

        return isStucked;
    }

    isSolved() {
        const runeBoard = this.state.runeBoard;
        let isSolved = true;
        let i;

        if ( runeBoard[3] != null ) {
            return  false;
        }

        for ( i = 0; i <= 2; i++ ) {
            if ( runeBoard[i]  == "X" ) {
                return false;
            }
        }

        for ( i = 4; i <= 6; i++ ) {
            if ( runeBoard[i]  == "Y" ) {
                return false;
            }
        }

        return isSolved;
    }

    render() {
        let statusMessage = this.state.statusMessage;
        if ( this.isSolved( this.state.runeBoard ) ) {
            statusMessage = "Wie kann das sein?!"
        }
        else if ( this.isStucked() ) {
            statusMessage = "Versuchs doch noch einmal, Sterblicher"
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={this.state.runeBoard}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{statusMessage}</div>
                </div>
            </div>
        );
    }
}