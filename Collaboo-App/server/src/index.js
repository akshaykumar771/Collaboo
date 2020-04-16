const express = require("express");
require("./db/mongoose");
require("./models/customer");
const bodyParser = require("body-parser")
const customerRouter = require("./routes/customer");
const craftsmenRouter = require("./routes/craftsmen");


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(customerRouter);
app.use(craftsmenRouter);


app.listen(port, () => {
  console.log("Server is up and running on port " + port);
});
