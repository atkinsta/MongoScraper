const express = require("express");
const app = express();
const PORT = 4040;

// setting up Pug
app.set("views", "./views");
app.set("view engine", "pug");

require("./routes/backendroutes")(app);
require("./routes/htmlroutes")(app);

app.listen(PORT, () => {
    console.log("Listening on port");
});

