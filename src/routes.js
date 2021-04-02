import axios from 'axios';
import graphhopper from './config/graphhopper.json';
import { required } from './helpers/parameters';

export default (app) => {
  /**
   * @openapi
   * /:
   *   get:
   *     title: Our first endpoint
   *     description: Welcome to swagger-jsdoc!
   *     parameters:
   *       - in: path
   *         name: from
   *         schema:
   *           type: array
   *           items:
   *             type: float
   *           minItems: 2
   *           maxItems: 2
   *         required: true
   *         description: Latitude and longitude of start location
   *       - in: path
   *         name: to
   *         schema:
   *           type: array
   *           items:
   *             type: float
   *           minItems: 2
   *           maxItems: 2
   *         required: true
   *         description: Latitude and longitude of destination location
   * 
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
  app.get('/route', (req, res, next) => {
    // Check Parameters
    let from;
    let to;
    try {
      from = required(req, 'from', 'array', { minLength: 2, maxLength: 2 });
      to =  required(req, 'to', 'array', { minLength: 2, maxLength: 2 });
    } catch (error) {
      error.status = 400;
      error.description = error.message;
      return next(error);
    }
    // Request route from graphhopper
    axios.get(`${graphhopper.url}${graphhopper.route}?locale=de&point=${from.join(',')}&point=${to.join(',')}&details=road_class&details=max_speed&instructions=true`)
      .then((response) => {
        res.send(response.data)
      })
      .catch((error) => {
        error.status = 500;
        error.description = 'Network request failed!';
        next(error);
      })
  })
}