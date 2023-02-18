console.clear();

import stockfish from './stockfish/stockfish';
import backend from './backend/backend'
import { t_chess_update_data } from "./types/t_chess_update_data";



function chess_data_to_fen(game: t_chess_update_data): string {
  const board: string[][] = [];
  const { pieces, isWhite } = game;

  // Initialize the board with empty spaces
  for (let i = 0; i < 8; i++) {
    board[i] = Array(8).fill("");
  }


  
  for (let i = 0; i < pieces.length; i++) {
    const file = Number.parseInt(pieces[i].rawLocation[0]) - 1;
    const rank = 8 - Number.parseInt(pieces[i].rawLocation[1]);
    if(pieces[i].name.toUpperCase() == pieces[i].name)
      pieces[i].name = pieces[i].name.toLowerCase();
    else 
      pieces[i].name = pieces[i].name.toUpperCase();
    board[rank][file] = pieces[i].name[0];
  }






  // Convert the board to a FEN string
  let fen = "";
  for (let i = 0; i < 8; i++) {
    if (i !== 0) fen += "/";
    let emptySquares = 0;
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece === "") {
        emptySquares++;
      } else {
        if (emptySquares !== 0) {
          fen += emptySquares;
          emptySquares = 0;
        }
        fen += piece;
      }
    }
    if (emptySquares !== 0) {
      fen += emptySquares;
    }
  }

  fen += ` ${isWhite ? "w" : "b"} - - 0 1`;

  return fen;
}



stockfish.init();
backend.init();

backend.set_cb(((data: t_chess_update_data) => {
  stockfish.set_fen(chess_data_to_fen(data));
  stockfish.move("3000");
}));

