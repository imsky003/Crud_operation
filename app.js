const connectToMongo = require("./config/db");
const express = require("express");
var cors = require("cors");
connectToMongo();
var indexRouter = require('./routes/index');
const app = express();
const port = 10000;
const order = require("./routes/users");
app.use(cors());
app.use(express.json());

app.use('/', indexRouter);
// app.use('/api/products', require('./routes/users'))
app.use("/api/products", order);
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});

module.exports = app;
