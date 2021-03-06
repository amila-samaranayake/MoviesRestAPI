import { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import { MONGO_URL } from "./constants/moviesRestApi.constants";
import { MovieRoutes } from "./routes/movie.routes";
import { MovieController } from "./movie.controller";
import { MovieService} from "./services/movie.service";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.setConfig();
    this.setMongoConfig();
    this.setControllers();
  }

  private setConfig() {
    this.app.use(bodyParser.json({ limit: "1mb" }));
    this.app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));
    this.app.use(cors());
  }

  private setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
    });
  }

  private setControllers() {
    const movieRoutes = new MovieRoutes(new MovieController( new MovieService()));
    this.app.use("/api/v1/movie", movieRoutes.router);
  }
}

export default new App().app;