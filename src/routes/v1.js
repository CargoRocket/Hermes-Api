import { optional, paramTypes, required } from '../helpers/parameters';
import directionsMapper from '../helpers/directions_mapper';
import {requestInfo, requestRoute} from '../api/graphhopper';

export default (app, db) => {
  /**
   * @openapi
   * /v1/route:
   *   get:
   *     title: Single profile route request
   *     description: Single profile route request
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
   *       - in: path
   *         name: format
   *         schema:
   *           type: string
   *         required: false
   *         description: Response format. Possible options (graphhopper / mapbox)
   *       - in: path
   *         name: profile
   *         schema:
   *           type: string
   *         required: false
   *         description: Routing profile used
   *       - in: path
   *         name: lang
   *         schema:
   *           type: string
   *         required: false
   *         description: Setting the routing language.
   *       - in: path
   *         name: bicycle_width
   *         schema:
   *           type: float
   *         required: false
   *         description: Defining the width of the bike for more accurate routing.
   *       - in: path
   *         name: bicycle_length
   *         schema:
   *           type: float
   *         required: false
   *         description: Defining the length of the bike for more accurate routing.
   *       - in: path
   *         name: request_type
   *         schema:
   *           type: string
   *         required: false
   *         description: More specific information about the cause of the request i.e. routing, rerouting, analysis
   * 
   *     responses:
   *       200:
   *         description: 'Routing Result'
   *         content:
   *           application/json?format="graphhopper":
   *             schema:
   *               $ref: '#/components/schemas/RouteResponse'
   *           application/json?format="mapbox":
   *             schema:
   *               $ref: '#/components/schemas/MAPBOX_DIRECTION_RESPONSE'
   */
   app.get('/v1/route', (req, res, next) => {
    // PARAMETERS
    let from, to, access_token, format, lang, profile, bicycle_width, bicycle_length, request_type;
    try {
      from = required(req.query, 'from', paramTypes.Array, { minLength: 2, maxLength: 2 });
      to =  required(req.query, 'to', paramTypes.Array, { minLength: 2, maxLength: 2 });
      access_token =  required(req.query, 'access_token', paramTypes.String);
      format = optional(req.query, 'format', paramTypes.Enum, 'graphhopper', {options: [
        'mapbox',
        'graphhopper',
      ]});
      profile = optional(req.query, 'profile', paramTypes.String, 'cargobike');
      lang = optional(req.query, 'lang', paramTypes.String, 'en');
      bicycle_width = optional(req.query, 'bicycle_width', paramTypes.Float, null);
      bicycle_length = optional(req.query, 'bicycle_length', paramTypes.Float, null);
      request_type = optional(req.query, 'request_type', paramTypes.String, null);
    } catch (error) {
      error.status = 400;
      error.description = error.message;
      return next(error);
    }

    requestRoute(from, to, profile, lang).then((route) => {
      try {
        let routeFormatted = route.data;
        if (format === 'mapbox') {
          routeFormatted = directionsMapper.getMapping(
            route.data,
            undefined,
            lang,
            access_token,
            'polyline6'
          );
        }
        res.send(routeFormatted);
      } catch (error) {
        error.status = 500;
        error.description = 'Internal Server Error (Route Formatting failed)!';
        next(error);
      }
    }).catch((error) => {
      error.status = 500;
      error.description = 'Network request failed! (Graphhopper Error)';
      next(error);
    })
  });

  /**
   * @openapi
   * /v1/routes:
   *   get:
   *     title: All profiles route request 
   *     description: All profiles route request 
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
   *       - in: path
   *         name: format
   *         schema:
   *           type: string
   *         required: false
   *         description: Response format. Possible options (graphhopper / mapbox)
   *       - in: path
   *         name: lang
   *         schema:
   *           type: string
   *         required: false
   *         description: Setting the routing language.
   *       - in: path
   *         name: bicycle_width
   *         schema:
   *           type: float
   *         required: false
   *         description: Defining the width of the bike for more accurate routing.
   *       - in: path
   *         name: bicycle_length
   *         schema:
   *           type: float
   *         required: false
   *         description: Defining the length of the bike for more accurate routing.
   *       - in: path
   *         name: request_type
   *         schema:
   *           type: string
   *         required: false
   *         description: More specific information about the cause of the request i.e. routing, rerouting, analysis
   * 
   *     responses:
   *       200:
   *         description: 'Routing Result'
   *         content:
   *           application/json?format="graphhopper":
   *             schema:
   *               $ref: '#/components/schemas/RouteResponse'
   *           application/json?format="mapbox":
   *             schema:
   *               $ref: '#/components/schemas/MAPBOX_DIRECTION_RESPONSE'
   */
  app.get('/v1/routes', (req, res, next) => {
    // PARAMETERS
    let from, to, access_token, format, lang, bicycle_width, bicycle_length, request_type;
    try {
      from = required(req.query, 'from', paramTypes.Array, { minLength: 2, maxLength: 2 });
      to =  required(req.query, 'to', paramTypes.Array, { minLength: 2, maxLength: 2 });
      access_token =  required(req.query, 'access_token', paramTypes.String);
      format = optional(req.query, 'format', paramTypes.Enum, 'graphhopper', {options: [
        'mapbox',
        'graphhopper',
      ]});
      lang = optional(req.query, 'lang', paramTypes.String, 'en');
      bicycle_width = optional(req.query, 'bicycle_width', paramTypes.Float, null);
      bicycle_length = optional(req.query, 'bicycle_length', paramTypes.Float, null);
      request_type = optional(req.query, 'request_type', paramTypes.String, null);
    } catch (error) {
      error.status = 400;
      error.description = error.message;
      return next(error);
    }

    requestInfo().then((info) => {
      const profiles = [];
      const routeRequests = info.data.profiles.map((profile) => {
        profiles.push(profile);
        return requestRoute(from, to, profile.name, lang, bicycle_width, bicycle_length);
      });

        Promise.all(routeRequests).then((routes) => {
        try {
          const routesFormatted = routes.map((route, index) => {
            let routeFormatted = route.data;
            if (format === 'mapbox') {
              routeFormatted = directionsMapper.getMapping(
                route.data,
                undefined,
                lang,
                access_token,
                'polyline6'
              );
            }
            return {...routeFormatted, profile: profiles[index]};
          })
          res.send(routesFormatted);
        } catch (error) {
          error.status = 500;
          error.description = 'Internal Server Error (Formatting Routes failed)!';
          next(error);
        }
        }).catch((error) => {
        error.status = 500;
        error.description = 'Network request failed! (Graphhopper Error)';
        next(error);
      })
    }).catch((error) => {
      error.status = 500;
      error.description = 'Network request failed! (Graphhopper Error)';
      next(error);
    })
  });

  /**
   * @openapi
   * /v1/info:
   *   get:
   *     title: Info
   *     description: Graphhopper Info
   *     responses:
   *       200:
   *         description: 'Routing Info'
   */
  app.get('/v1/info', (req, res, next) => {
    requestInfo().then((info) => {
      res.send(info.data);
    }).catch((error) => {
      error.status = 500;
      error.description = 'Network request failed! (Graphhopper Error)';
      next(error);
    })
  });


  /**
   * @openapi
   * /v1/finish:
   *   get:
   *     title: Endpoint for logging routing data
   *     description: Saves routing information to simple json db.
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
   *         name: time
   *         schema:
   *           type: integer
   *         required: true
   *         description: MapBox Access token
   *       - in: path
   *         name: format
   *         schema:
   *           type: string
   *         required: false
   *         description: Response format. Possible options (graphhopper / mapbox)
   */
   app.get('/v1/finish', (req, res, next) => {
    let from, to, time, reroutings;
    try {
      from = required(req.query, 'from', paramTypes.Array, { minLength: 2, maxLength: 2 });
      to = required(req.query, 'to', paramTypes.Array, { minLength: 2, maxLength: 2 });
      time = required(req.query, 'time', paramTypes.Integer);
      reroutings = optional(req.query, 'reroutings', paramTypes.Array, []);
    } catch (error) {
      error.status = 400;
      error.description = error.message;
      return next(error);
    }

    db.get('finishedRoutes')
      .push({
        from,
        to,
        time,
        reroutings,
      })
      .write()
    res.send('success');
  });
}