export const bishopMovement = (
    prevRow,
    prevCol,
    row,
    col,
    piece,
    state,
    movePiece,
  ) => {
    let isValidMove = false;
    if (Math.abs(prevRow - row) === Math.abs(prevCol - col)) {
      const rowIncrement = prevRow < row ? 1 : -1;
      const colIncrement = prevCol < col ? 1 : -1;
  
      let hasObstacle = false;
      let currentRow = prevRow + rowIncrement;
      let currentCol = prevCol + colIncrement;
  
      while (currentRow != row && currentCol != col) {
        if (state.board[currentRow][currentCol] != "") {
          hasObstacle = true;
          break;
        }
        currentRow += rowIncrement;
        currentCol += colIncrement;
      }
  
      if (!hasObstacle) {
        isValidMove = true;
      }
    }
  
    if (isValidMove) {
      movePiece(prevRow, prevCol, row, col, piece);
    }
  };
  