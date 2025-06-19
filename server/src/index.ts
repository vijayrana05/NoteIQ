import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import notesRoutes from './routes/notesRoutes';
import uploadRoutes from './routes/uploadRoutes';
import searchRoutes from './routes/searchRoutes';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/authRoutes', authRoutes);
app.use('/api/notesRoutes', notesRoutes);
app.use('/api/uploadRoutes',uploadRoutes )
app.use('/api/searchRoutes',searchRoutes )


// Connect to DB and start server
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
});
