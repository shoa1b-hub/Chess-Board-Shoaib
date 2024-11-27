export const kingMovement = (
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
      Math.abs(prevRow - row) <= 1 && 
      Math.abs(prevCol - col) <= 1 
    ) {
      isValidMove = true;
    }
  
    if (isValidMove) {
      movePiece(prevRow, prevCol, row, col, piece);
    }
  };
  