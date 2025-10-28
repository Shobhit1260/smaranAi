const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const dotenv=require('dotenv');
dotenv.config()
const { supabase, supabaseAdmin } = require('./src/config/supabase');
const authRoutes = require('./src/routes/authRoutes');
const profileRoutes = require('./src/routes/profileRoutes');

const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin']
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});