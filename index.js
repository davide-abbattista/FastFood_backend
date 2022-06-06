const express = require('express'),
    mongoose = require('mongoose'),
    router = require('./routes/index'),
    dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.once("open", () => console.log("Successful connection to database"));

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(router);

app.listen(process.env.PORT, () => console.log("Backend server is running"));