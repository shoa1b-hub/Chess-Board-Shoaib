export const knightMovement = (
    prevRow,
    prevCol,
    row,
    col,
    piece,
    state,
    movePiece,
  ) => {
    const diffRow = Math.abs(row - prevRow);
    const diffCol = Math.abs(col - prevCol);
    let isValidMove = false;
  
    if ((diffRow === 2 && diffCol === 1) || (diffRow === 1 && diffCol === 2)) {
      const destinationPiece = state.board[row][col];
  
      if (!destinationPiece || destinationPiece !== piece) {
        isValidMove = true;
      }
    }
  
    if (isValidMove) {
      movePiece(prevRow, prevCol, row, col, piece, state);
    }
  };
  