require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const routes = require('./routes/appart');

const app = express();
const port = parseInt(process.env.PORT, 10) || 3000;
const mongooseOptions = {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  keepAlive: 300000,
  connectTimeoutMS: 30000
};


mongoose.connect(
  process.env.MONGODB_URI,
  mongooseOptions,
  (err) => {
    if (err) return console.log("Error: ", err);
    console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
  }
);


/* MIDDLEWARE */
app.use(helmet());
app.use(compression());
app.use(express.static("public"));
app.use(express.json());
app.use('/uploads', express.static('./uploads'));
/* END MIDDLEWARE */

app.use('/', routes);

app.route('/').get((req, res) => {
  res.sendFile(process.cwd() + '/index.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
