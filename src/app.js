import express from 'express';
import bodyParser from 'body-parser';
import env from 'dotenv';

import userRoute from './routes/user.route.js'

env.config();
const port = process.env.PORT || 3000;
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(bodyParser.json());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

// routes
app.use('/api/v1', userRoute)

app.get('/', (req, res) => {
  res.send('Welcome to Mock Premier League Built by Fego');
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'you have entered an incorrect route',
  });
});

app
  .listen(port, () =>
    console.log(`Welcome, listening on ${port}`)
  )
  .on('error', err => {
    if (err.syscall !== 'listen') {
      throw error;
    }
    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
    // handle specific listen errors with friendly messages

    switch (err.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

export default app;