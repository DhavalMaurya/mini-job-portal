const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jobsRouter = require('./routes/Jobs'); 
require('dotenv').config(); 

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 


const mongoURI = process.env.MONGO_URI ;
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/jobs', jobsRouter); 

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Job Board API' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});