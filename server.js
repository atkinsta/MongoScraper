const express = require("express");
const app = express();
const PORT = 4040;

// Setting up Pug
app.set("views", "./views");
app.set("view engine", "pug");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
require("./routes/backendroutes")(app);
require("./routes/htmlroutes")(app);

app.listen(PORT, () => {
    console.log("Listening on port");
});

