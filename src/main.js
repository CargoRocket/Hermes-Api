import express from 'express';
import swaggerConfig from './config/swagger.json';
import cors from 'cors';
import routes from './routes';
import swaggerJsondoc from 'swagger-jsdoc';
import redoc from 'redoc-express';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

// Express config
const app = express();
const port = 3000;
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
app.use((req, res, next) => {
  // Todo check and log req.query.access_token
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
