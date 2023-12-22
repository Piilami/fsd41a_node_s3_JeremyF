import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { join } from "node:path";
import cors from "cors";
import router from "./routes/router.js";

dotenv.config();

const app = express();

const mongURL = process.env.DB_URL;
mongoose
  .connect(mongURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à la base de donnée réussie!"))
  .catch((err) => console.log("Connexion à la base de donnée échouée" + err));

app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_URL,

    credentials: true,
  })
);

app.use(router);

app.listen(process.env.API_PORT, () => {
  console.log("server is up");
});
