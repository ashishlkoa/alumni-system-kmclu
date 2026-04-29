const mongoose = require('mongoose'); 

 

const connectDB = async () => { 

  try { 

    const conn = await mongoose.connect(process.env.MONGO_URI); 

    // Yahan backtick (`) use karna hai 

    console.log(`MongoDB Connected: ${conn.connection.host}`); 

  } catch (error) { 

    // Yahan bhi backtick (`) use karna hai 

    console.error(`Error: ${error.message}`); 

    process.exit(1); 

  } 

}; 

 

module.exports = connectDB; 