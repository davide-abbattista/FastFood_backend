const express = require('express'),
    mongoose = require('mongoose'),
    router = require('./routes/index'),
    dotenv = require('dotenv'),
    cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(router);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Successful connection to database");
        app.listen(process.env.PORT || 3000, () => console.log("Backend server is running"));
    });