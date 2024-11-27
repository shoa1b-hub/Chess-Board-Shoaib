export const pawnMovement = (
    prevRow,
    prevCol,
    row,
    col,
    piece,
    state,
    movePiece,
  ) => {
    let isValidMove = false;
    if (
      piece === "♙" &&
      prevRow === 6 &&
      row === 4 &&
      col === prevCol &&
      state.board[5][col] === "" &&
      state.board[4][col] === ""
    ) {
      isValidMove = true;
    } else if (
      piece === "♟" &&
      prevRow === 1 &&
      row === 3 &&
      col === prevCol &&
      state.board[2][col] === "" &&
      state.board[3][col] === ""
    ) {
      isValidMove = true;
    }
  
    if (isValidMove) {
      movePiece(prevRow, prevCol, row, col, piece);
      console.log("j'avance");
    } else {
      let nextRow;
      if (piece === "♙") {
        nextRow = prevRow - 1;
      } else if (piece === "♟") {
        nextRow = prevRow + 1;
      }
      if (state.board[nextRow][col] === "") {
        const newBoard = state.board.map((row) => [...row]);
        newBoard[nextRow][col] = "";
        movePiece(prevRow, prevCol, nextRow, col, piece);
      }
    }
  };
  