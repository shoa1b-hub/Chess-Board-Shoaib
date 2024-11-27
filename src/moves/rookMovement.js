export const rookMovement = (
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
      (prevRow != row && prevCol === col)
    ) {
  if (prevRow === row) {
        const startCol = Math.min(prevCol, col) + 1;
        const endCol = Math.max(prevCol, col);
        let hasObstacle = false;
  
        for (let i = startCol; i < endCol; i += 1) {
          if (state.board[row][i] != "") {
            hasObstacle = true;
            break;
          }
        }
  
        if (!hasObstacle) {
          isValidMove = true;
        }
      } else {
        const startRow = Math.min(prevRow, row) + 1;
        const endRow = Math.max(prevRow, row);
        let hasObstacle = false;
  
        for (let i = startRow; i < endRow; i += 1) {
          if (state.board[i][col] != "") {
            hasObstacle = true;
            break;
          }
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
  