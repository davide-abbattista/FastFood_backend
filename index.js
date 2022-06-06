const express = require('express'),
    mongoose = require('mongoose'),
    router = require('./routes/index');

mongoose.connect('mongodb+srv://davideabbattista:fondamentiweb@fondamentiweb.fpx2v.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true});
const db = mongoose.connection;
db.once("open", () => console.log("Connessione al database riuscita"));

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(router);

app.listen(3000, () => console.log("Applicazione in ascolto"));