import express, { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import gameEventRoutes from './router/gameEvent';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Parse URL-encoded bodies (HTML forms)
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/game-events', gameEventRoutes);

// Health check
app.get('/', (_req, res) => {
    res.json({ message: 'API is running 🚀' });
});


export default app;
