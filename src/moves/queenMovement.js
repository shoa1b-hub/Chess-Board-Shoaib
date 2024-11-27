export const queenMovement = (
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
      (prevRow === row && prevCol != col) ||
      (prevRow != row && prevCol === col) ||
      Math.abs(prevRow - row) === Math.abs(prevCol - col)
    ) {
      if (prevRow === row || prevCol === col) {
        let hasObstacle = false;
        if (prevRow === row) {
          const startCol = Math.min(prevCol, col) + 1;
          const endCol = Math.max(prevCol, col);
  
          for (let i = startCol; i < endCol; i += 1) {
            if (state.board[row][i] != "") {
              hasObstacle = true;
              break;
            }
          }
        } else {
          const startRow = Math.min(prevRow, row) + 1;
          const endRow = Math.max(prevRow, row);
  
          for (let i = startRow; i < endRow; i += 1) {
            if (state.board[i][col] !== "") {
              hasObstacle = true;
              break;
            }
          }
        }
        if (!hasObstacle) {
          isValidMove = true;
        }
      } else {
        const rowIncrement = prevRow < row ? 1 : -1;
        const colIncrement = prevCol < col ? 1 : -1;
        let hasObstacle = false;
        let currentRow = prevRow + rowIncrement;
        let currentCol = prevCol + colIncrement;
  
        while (currentRow !== row && currentCol !== col) {
          if (state.board[currentRow][currentCol] !== "") {
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
    }
    if (isValidMove) {
      movePiece(prevRow, prevCol, row, col, piece);
    }
  };
  