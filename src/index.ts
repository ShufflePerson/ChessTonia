import stockfish from './stockfish/stockfish';
import backend from './backend/backend'
import { t_chess_update_data } from "./types/t_chess_update_data";
import { chess_data_to_fen } from './chess_data_to_fen';



stockfish.init();
backend.init();

backend.set_cb(((data: t_chess_update_data) => {
  stockfish.set_fen(chess_data_to_fen(data));
  stockfish.move("3000");
}));

