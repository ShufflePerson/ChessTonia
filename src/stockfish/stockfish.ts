import child_process from "child_process";
import get_config from "../utils/get_config";

namespace stockfish {
  let stock_process: child_process.ChildProcess;

  function get_best_move(data: string): string {
    data = data.toString();
    let data_lines = data.split("\n");
    let result = "";

    data_lines.forEach((line: string) => {
      if(line.includes("bestmove")) {
        result = line.split(" ")[1];
      }
    })

    return result;
  }

  export function init() {
    stock_process = child_process.spawn(get_config().STOCKFISH_BINARY);
    if(stock_process == null) return;

    send_data("uci");
    send_data("ucinewgame");

    //@ts-ignore
    stock_process.stdout.on('data', (data: string) => {
      let best_move = get_best_move(data);
      if(best_move) {
        console.log("  : " + best_move)
      }
    });

  }


  function send_data(data: string) {
    //@ts-ignore
    stock_process.stdin.write(data + "\n");
  }

  export function set_fen(fen: string) {
    send_data(`position fen ${fen}`);
  }

  export function move(move_time: string = "1000") {
    send_data(`go movetime ${move_time}`);
  }

};


export default stockfish;
