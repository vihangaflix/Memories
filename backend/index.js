import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors"
import UserRoute from "./routes/user.js"
import postDetailsRoute from "./routes/postDetails.js"
import dotenv from 'dotenv'
dotenv.config()

mongoose.set('strictQuery', false);

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", UserRoute);
app.use("/posts", postDetailsRoute);



const CONNECTION_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 5000;

const server = mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log("Server listening on port: " + PORT))
  )
  .catch((err) => console.log(err));

export default server;