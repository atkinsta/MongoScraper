import express from "express";
import bodyParser from "body-parser";
import htmlRoutes from "./routes/htmlroutes.js"
import backendRoutes from "./routes/backendroutes.js"
import mongoose from "mongoose";

const app = express();
const PORT = 4040;

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraperDb";
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
mongoose.connection.on("error", err => {
    console.log(`Mongoose connection err:\n${err}`);
});

// Setting up Pug
app.set("views", "./views");
app.set("view engine", "pug");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.use(htmlRoutes);
app.use(backendRoutes);


app.listen(PORT, () => {
    console.log("Listening on port");
});

