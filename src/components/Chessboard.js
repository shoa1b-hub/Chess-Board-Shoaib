import { useState } from "react";
import clsx from "clsx";
import { rookMovement } from "../moves/rookMovement";
import { pawnMovement } from "../moves/pawnMovement";
import { knightMovement } from "../moves/knightMovement";
import { bishopMovement } from "../moves/bishopMovement";
import { queenMovement } from "../moves/queenMovement";
import { kingMovement } from "../moves/kingMovement";

const PLAYER_1_VALUE = "White";
const PLAYER_2_VALUE = "Black";
const PIECES = {
  [PLAYER_1_VALUE]: ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖", "♙"],
  [PLAYER_2_VALUE]: ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜", "♟"],
};

const initializeState = () => ({
  board: [
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
  ],
  currentPlayer: PLAYER_1_VALUE,
  selectedPiece: null,
  winner: null,
});

function TurnIndicator({ currentPlayer, winner }) {
  if (winner) {
    return (
      <div className="mb-4 text-xl font-semibold text-green-600">
        {winner} wins!
      </div>
    );
  }
  return (
    <div className="mb-4 text-xl font-semibold text-gray-800">
      {currentPlayer === PLAYER_1_VALUE ? "White's Turn" : "Black's Turn"}
    </div>
  );
}

function Chessboard() {
  const [state, setState] = useState(initializeState);
  const [gameStarted, setGameStarted] = useState(false);

  const start = () => {
    setGameStarted(true);
    setState((prevState) => ({ ...prevState, winner: null }));
  };

  const restart = () => {
    setState(initializeState());
    setGameStarted(false);
  };

  const checkWinner = (newBoard) => {
    const isWhiteKingPresent = newBoard.some((row) => row.includes("♔"));
    const isBlackKingPresent = newBoard.some((row) => row.includes("♚"));

    if (!isWhiteKingPresent) return PLAYER_2_VALUE; // Black wins
    if (!isBlackKingPresent) return PLAYER_1_VALUE; // White wins
    return null; // No winner yet
  };

  const movePiece = (prevRow, prevCol, row, col, piece) => {
    const newBoard = [...state.board];
    newBoard[prevRow][prevCol] = "";
    newBoard[row][col] = piece;

    const winner = checkWinner(newBoard);

    setState({
      ...state,
      board: newBoard,
      selectedPiece: null,
      currentPlayer:
        state.currentPlayer === PLAYER_1_VALUE
          ? PLAYER_2_VALUE
          : PLAYER_1_VALUE,
      winner,
    });
  };

  const pieceClick = (row, col) => {
    if (!gameStarted) {
      alert("Please press the Start button to begin the game.");
      return;
    }
    if (state.winner) {
      alert("Game Over! Please restart to play again.");
      return;
    }
    if (!state.selectedPiece) {
      setState({
        ...state,
        selectedPiece: { piece: state.board[row][col], row, col },
      });
    } else {
      const { piece, row: prevRow, col: prevCol } = state.selectedPiece;

      if (piece === "♙" || piece === "♟") {
        pawnMovement(prevRow, prevCol, row, col, piece, state, movePiece);
      }
      if (piece === "♘" || piece === "♞") {
        knightMovement(prevRow, prevCol, row, col, piece, state, movePiece);
      }
      if (piece === "♖" || piece === "♜") {
        rookMovement(prevRow, prevCol, row, col, piece, state, movePiece);
      }
      if (piece === "♗" || piece === "♝") {
        bishopMovement(prevRow, prevCol, row, col, piece, state, movePiece);
      }
      if (piece === "♕" || piece === "♛") {
        queenMovement(prevRow, prevCol, row, col, piece, state, movePiece);
      }
      if (piece === "♔" || piece === "♚") {
        kingMovement(prevRow, prevCol, row, col, piece, state, movePiece);
      }
    }
  };

  const displayBoard = () => {
    return state.board.map((row, rowIndex) => (
      <div className="flex" key={rowIndex}>
        {row.map((piece, colIndex) => {
          const isPlayerPiece =
            (state.currentPlayer === PLAYER_1_VALUE &&
              PIECES[PLAYER_1_VALUE].includes(piece)) ||
            (state.currentPlayer === PLAYER_2_VALUE &&
              PIECES[PLAYER_2_VALUE].includes(piece));

          return (
            <div
              key={colIndex}
              className={`w-12 h-12 flex justify-center items-center border border-gray-700 ${
                (rowIndex + colIndex) % 2 === 0 ? "bg-gray-300" : "bg-gray-500"
              } ${isPlayerPiece ? "ring-2 ring-blue-500" : ""}`}
              onClick={() => pieceClick(rowIndex, colIndex)}
            >
              {piece}
            </div>
          );
        })}
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 style={{color: "black",fontSize:"40px"}}>Welcome to the Chess Game created by Shoaib</h1>
      <TurnIndicator
        currentPlayer={state.currentPlayer}
        winner={state.winner}
      />
      <div className="mb-4">{displayBoard()}</div>
      <div className="mb-2">
        <button
          className={clsx(
            "bg-green-600 active:bg-green-700 text-white font-semibold text-2xl px-4 py-3 mr-2"
          )}
          onClick={start}
        >
          START
        </button>
        <button
          className={clsx(
            "bg-blue-600 active:bg-blue-700 text-white font-semibold text-2xl px-4 py-3"
          )}
          onClick={restart}
        >
          RESTART
        </button>
      </div>
    </div>
  );
}

export default Chessboard;