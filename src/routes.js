import axios from 'axios';
import graphhopper from './config/graphhopper.json';
import { required } from './helpers/parameters';
import directionsMapper from './helpers/directions_mapper';

export default (app) => {
  /**
   * @openapi
   * /route-gh:
   *   get:
   *     title: Cargobike routing
   *     description: Formatted in Graphhopper-routing format.
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
   *         description: 'Routing Result'
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/RouteResponse'
   */
  app.get('/route-gh', (req, res, next) => {
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
    axios.get(`${graphhopper.url}${graphhopper.route}?locale=de&point=${from.join(',')}&point=${to.join(',')}&details=road_class&details=max_speed&instructions=true&profile=cargobike`)
      .then((response) => {
        res.send(response.data)
      })
      .catch((error) => {
        error.status = 500;
        error.description = 'Network request failed!';
        next(error);
      })
  })

  /**
   * @openapi
   * /route-mb:
   *   get:
   *     title: Cargobike routing
   *     description: Formatted in Mapbox-navigation format.
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
   *       - in: path
   *         name: access_token
   *         schema:
   *           type: string
   *         required: true
   *         description: MapBox Access token
   * 
   *     responses:
   *       200:
   *         description: 'Routing Result'
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/MAPBOX_DIRECTION_RESPONSE'
   */
   app.get('/route-mb', (req, res, next) => {
    // Check Parameters
    let from;
    let to;
    let access_token;
    try {
      from = required(req, 'from', 'array', { minLength: 2, maxLength: 2 });
      to =  required(req, 'to', 'array', { minLength: 2, maxLength: 2 });
      access_token =  required(req, 'access_token', 'string');
    } catch (error) {
      error.status = 400;
      error.description = error.message;
      return next(error);
    }
    // Request route from graphhopper
    axios.get(`${graphhopper.url}${graphhopper.route}?locale=de&point=${from.join(',')}&point=${to.join(',')}&points_encoded=false&details=road_class&details=max_speed&instructions=true&&profile=cargobike`)
      .then((response) => {
        res.send(directionsMapper.getMapping(
          response.data,
          undefined,
          'de',
          access_token,
          'polyline6'
        ));
      })
      .catch((error) => {
        error.status = 500;
        error.description = 'Network request failed!';
        next(error);
      })
  })

  /**
   * @openapi
   * /routes:
   *   get:
   *     title: Bikerouting / Cargobike routing
   *     description: Formatted in Mapbox-navigation format.
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
   *       - in: path
   *         name: access_token
   *         schema:
   *           type: string
   *         required: true
   *         description: MapBox Access token
   * 
   *     responses:
   *       200:
   *         description: 'Routing Result'
   *         content:
   *           application/json
   */
   app.get('/route', (req, res, next) => {
    // Check Parameters
    let from;
    let to;
    let access_token;
    try {
      from = required(req, 'from', 'array', { minLength: 2, maxLength: 2 });
      to =  required(req, 'to', 'array', { minLength: 2, maxLength: 2 });
      access_token =  required(req, 'access_token', 'string');
    } catch (error) {
      error.status = 400;
      error.description = error.message;
      return next(error);
    }
    // Request route from graphhopper
    axios.get(`${graphhopper.url}${graphhopper.route}?locale=de&point=${from.join(',')}&point=${to.join(',')}&points_encoded=false&details=road_class&details=max_speed&instructions=true&profile=bike`)
      .then((response) => {
        const bikeRoute = directionsMapper.getMapping(
          response.data,
          undefined,
          'de',
          access_token,
          'polyline6'
        );
        axios.get(`${graphhopper.url}${graphhopper.route}?locale=de&point=${from.join(',')}&point=${to.join(',')}&points_encoded=false&details=road_class&details=max_speed&instructions=true&profile=cargobike`)
          .then((response) => {
            res.send({
              bike: bikeRoute,
              cargobike: directionsMapper.getMapping(
                response.data,
                undefined,
                'de',
                access_token,
                'polyline6'
              ),
            });
          })
          .catch((error) => {
            error.status = 500;
            error.description = 'Network request failed!';
            next(error);
          })
      })
      .catch((error) => {
        error.status = 500;
        error.description = 'Network request failed!';
        next(error);
      })
  })
}