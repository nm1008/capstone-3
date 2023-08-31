const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


//port
const port = process.env.PORT || 8000;
const app = express();
require('dotenv').config();

// database connection
mongoose.connect(process.env.DB, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

// check connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Connected to database`);
});

const corsOptions = {
	origin: 'https://capstone-3-client-mallari.vercel.app',
	optionsSuccessStatus: 200
}


app.use(cors(corsOptions));
app.options('*', cors())


// middlewares
app.use(express.json());

// routes
const recordRoutes = require('./routes/record');
app.use('/api/record', recordRoutes)
const categoryRoutes = require('./routes/category');
app.use('/api/category', categoryRoutes)
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes)

//port listening
app.listen(port , () => {
	console.log(`App is listening on port ${port}`);
});