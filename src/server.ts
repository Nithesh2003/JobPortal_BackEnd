import express from 'express';
import dotenv from 'dotenv';

// Step 1: Load .env variables
dotenv.config();

// Step 2: Import the DB connection (this will auto-run and test DB connection)
import './config/db';

const app = express();

// Step 3: Middleware to parse JSON (for POST/PUT requests)
app.use(express.json());

// Step 4: Example route to confirm backend is working
app.get('/', (req, res) => {
  res.send('✅ Job Portal Backend Server is Running & DB Connected!');
});

// Step 5: Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});


  

