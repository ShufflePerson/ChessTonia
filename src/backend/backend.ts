import express from 'express';
import cors from 'cors'
import { t_chess_update_data } from '../types/t_chess_update_data';
import get_config from '../utils/get_config';

namespace backend {
  const app = express();
  let on_update_cb: Function;

  export function init() {
    app.use(express.static("public"));
    app.use(express.json());
    app.use(cors({
      origin: "*"
    }));

    

    app.post("/chess/update", ((req, res) => {
      let data = req.body;
      on_data_update(data);
      res.send("OK");
    }))

    app.listen(get_config().SERVER_PORT, () => {
      console.debug("Backend is up and running");
    })
  }

  export function set_cb(func: Function) {
    on_update_cb = func;
  }

  function on_data_update(data: t_chess_update_data) {
    on_update_cb(data);
  }


}

export default backend;
