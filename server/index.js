const express = require("express");
require("dotenv").config();

const app = express();

//const medicines = require("./routes/medicineRoutes");

//app.use("/api/medicines", medicines);

app.use((req, res, next) => {
  res.status(404).send("<h1>Page not found on the server</h1>");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
