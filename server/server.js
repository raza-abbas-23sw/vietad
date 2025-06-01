// server.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (body parser, etc.)
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // allow frontend origin
  credentials: true, 
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/users', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));