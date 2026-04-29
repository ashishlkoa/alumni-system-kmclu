const express = require('express'); 

const dotenv = require('dotenv'); 

const cors = require('cors'); 

const connectDB = require('./config/db'); 

 

// Load env variables 

dotenv.config(); 

 

// Connect to Database 

connectDB(); 

 

const app = express(); 

 

// Middleware 

app.use(cors()); 

app.use(express.json()); 

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/alumni', require('./routes/alumniRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Basic Test Route (Pehle se likha hoga)
app.get('/', (req, res) => {
  res.send('Alumni API is running...');
});


 

// Basic Test Route 

app.get('/', (req, res) => { 

  res.send('Alumni API is running...'); 

}); 

 

const PORT = process.env.PORT || 5000; 

 

app.listen(PORT, () => { 

  // Yahan backtick (`) use karna hai 

  console.log(`Server running on port ${PORT}`); 

});