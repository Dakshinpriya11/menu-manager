import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

/* ✅ CORS MUST COME FIRST */
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);


app.use(express.json());

/* ✅ API routes */
app.use('/api', routes);

/* ✅ Error middleware LAST */
app.use(errorMiddleware);

export default app;
