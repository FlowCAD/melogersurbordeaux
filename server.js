require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const cryptoJS = require("crypto-js");
const compression = require('compression');
const appartRoutes = require('./routes/appart');
const userRoutes = require('./routes/user');

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
app.use(helmet({contentSecurityPolicy: false}));
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

  res.header('Access-Control-Expose-Headers', 'x-access-token, x-refresh-token');

  next();
});
app.use(compression());
app.use(express.static("public"));
app.use(express.json());
app.use('/uploads', express.static('./uploads'));
app.get('/get-map-key', (req, res) => res.json(cryptoJS.AES.encrypt(process.env.MAP_API_KEY, process.env.SECRET_PASSWORD).toString()));
/* END MIDDLEWARE */

app.use('/', appartRoutes, userRoutes);

app.route('/').get((req, res) => res.sendFile(process.cwd() + '/index.html'));

// Fallback on staticServe on routing issue
const staticServe = express.static(`${ __dirname }/public`);
app.use("/", staticServe);
app.use("*", staticServe);

app.listen(port, () => console.log(`Server is running on port ${port}`));
