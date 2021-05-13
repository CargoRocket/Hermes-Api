import { optional, paramTypes, required } from '../helpers/parameters';
import directionsMapper from '../helpers/directions_mapper';
import {requestInfo, requestRoute} from '../api/graphhopper';

export default (app) => {
  /**
   * @openapi
   * /v1/route:
   *   get:
   *     title: Bikerouting / Cargobike routing
   *     description: Bikerouting / Cargobike routing
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
    let from, to, access_token, format, lang, profile;
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
   *     title: Bikerouting / Cargobike routing
   *     description: Bikerouting / Cargobike routing
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
      let from, to, access_token, format, lang;
      try {
        from = required(req.query, 'from', paramTypes.Array, { minLength: 2, maxLength: 2 });
        to =  required(req.query, 'to', paramTypes.Array, { minLength: 2, maxLength: 2 });
        access_token =  required(req.query, 'access_token', paramTypes.String);
        format = optional(req.query, 'format', paramTypes.Enum, 'graphhopper', {options: [
          'mapbox',
          'graphhopper',
        ]});
        lang = optional(req.query, 'lang', paramTypes.String, 'en');
      } catch (error) {
        error.status = 400;
        error.description = error.message;
        return next(error);
      }

      requestInfo().then((info) => {
        const profiles = [];
        const routeRequests = info.data.profiles.map((profile) => {
          profiles.push(profile);
          return requestRoute(from, to, profile.name, lang);
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
   *     title: Bikerouting / Cargobike routing
   *     description: Bikerouting / Cargobike routing
   *     parameters:
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
}