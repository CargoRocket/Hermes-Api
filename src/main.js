import express from 'express';
import path from 'path';
import swaggerConfig from './config/swagger.json';
import cors from 'cors';
import general from './routes/general';
import v1 from './routes/v1';
import swaggerJsondoc from 'swagger-jsdoc';
import redoc from 'redoc-express';
import apiKeys from './config/keys.json';
import { writeAccess, writeError } from './logging';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

// Express config
const app = express();
const port = 3232;
app.use(cors('*'));
app.use(express.json());

// Setup DB
const adapter = new FileSync(path.resolve('./data/db.json'))
const db = low(adapter)
db.defaults({finishedRoutes: []}).write()

// Setup Swagger
const specs = swaggerJsondoc(swaggerConfig);
app.get('/docs/swagger.json', (req, res) => {
  res.send(specs);
});
app.get(
  "/docs",
  redoc({
    title: 'CargoRocket API Docs',
    specUrl: '/docs/swagger.json',
  })
);

// API key middleware
const keys = Object.keys(apiKeys);
app.use((req, res, next) => {
  if (!req.query['key'] || !keys.includes(req.query['key'])) {
    writeError('unauthorized', 401, req.url, 'Please provide a valid API key');
    return res.status('401').send({
      'status': 401,
      'message': 'Please provide a valid API key',
    });
  }
  req.user = apiKeys[req.query['key']];
  writeAccess(req.user, req.url);
  next();
});

// Endpoints
general(app);
v1(app, db);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  writeError(req.user, err.status, req.url, err.message);
  res.status(err.status).send(err);
});

// Start Server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
