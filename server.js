const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

//app
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());

// connect app to database
mongoose
.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) // Adding new mongo url parser
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));


const ticketRoutes = require('./routes/ticket');
app.use('/api/tickets', ticketRoutes);


//port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});