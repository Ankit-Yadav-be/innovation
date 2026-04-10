import express from 'express';
import postRoutes from './routes/post/index.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());

// error handling middleware
app.use(errorMiddleware);

// routes
app.use('/api/posts', postRoutes);

export default app;