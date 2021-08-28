const mongoose = require("mongoose");
const url =
  "mongodb+srv://<username>:<password>@cluster0.65rqh.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const database = mongoose.connection;
database.on("error", (error) => console.error(error));
database.once("open", () => console.log("Connected Database"));
