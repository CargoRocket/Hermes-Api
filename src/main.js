import express from 'express';
import swaggerConfig from './config/swagger.json';
import cors from 'cors';
import routes from './routes';
import swaggerJsondoc from 'swagger-jsdoc';
import redoc from 'redoc-express';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import apiKeys from './config/keys.json';

// Express config
const app = express();
const port = 3232;
app.use(cors('*'));

// Setup metrics data db
const adapter = new FileSync('./data/db.json')
const db = low(adapter)
db.defaults({}).write()

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
    return res.status('403').send({
      'status': 403,
      'message': 'Please provide a valid API key',
    });
  }
  next();
});

// Endpoints
routes(app);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status).send(err);
})

// Start Server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
