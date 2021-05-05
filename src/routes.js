import { optional, paramTypes, required } from './helpers/parameters';
import directionsMapper from './helpers/directions_mapper';
import { requestCargobikeRoute, requestBikeRoute } from './api/graphhopper';
import nodemailer from 'nodemailer'
import smtpConfig from './config/smtp.json'

export default (app) => {
  /**
   * @openapi
   * /routes:
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
   app.get('/route', (req, res, next) => {
    // PARAMETERS
    let from, to, access_token, format;
    try {
      from = required(req.query, 'from', paramTypes.Array, { minLength: 2, maxLength: 2 });
      to =  required(req.query, 'to', paramTypes.Array, { minLength: 2, maxLength: 2 });
      access_token =  required(req.query, 'access_token', paramTypes.String);
      format = optional(req.query, 'format', paramTypes.Enum, 'graphhopper', {options: [
        'mapbox',
        'graphhopper',
      ]});
    } catch (error) {
      error.status = 400;
      error.description = error.message;
      return next(error);
    }

    // EXECUTION
    Promise.all([
      requestCargobikeRoute(from, to, next),
      requestBikeRoute(from, to, next),
    ]).then(([bikeRoute, cargobikeRoute]) => {
      try {
        let bikeRouteFormatted = bikeRoute;
        let cargobikeRouteFormatted = cargobikeRoute;
  
        if (format === 'mapbox') {
          bikeRouteFormatted = directionsMapper.getMapping(
            bikeRoute,
            undefined,
            'de',
            access_token,
            'polyline6'
          );
          cargobikeRouteFormatted = directionsMapper.getMapping(
            cargobikeRoute,
            undefined,
            'de',
            access_token,
            'polyline6'
          );
        }
       
        res.send({
          bike: bikeRouteFormatted,
          cargobike: cargobikeRouteFormatted,
        });
      } catch (error) {
        error.status = 500;
        error.description = 'Internal Server Error (Route Formatting failed)!';
        next(error);
      }
    })
  })

  // Leaving out documentation for this endpoint as it should be not directly used by any customer.
  app.post('/mail', (req, res, next) => {
    const requestData = req.body
    let requestMessage, requestType, requestEmail;
    try {
      requestMessage = required(requestData, 'message', paramTypes.String);
      requestType = required(requestData, 'type', paramTypes.String);
      requestEmail = optional(requestData, 'email', paramTypes.String, '');
    } catch (error) {
      error.status = 400;
      error.description = error.message;
      return next(error);
    }
    const mailTransporter = nodemailer.createTransport({
      host: smtpConfig.smtpUrl,
      port: smtpConfig.smtpPort,
      secure: false,
      auth: {
        user: smtpConfig.email,
        pass: smtpConfig.password,
      },
    });

    mailTransporter.sendMail({
      from: '"Cargorocket - Hermes API" <' + smtpConfig.email  + '>',
      to: '"Cargorocket" <' + smtpConfig.targetEmail  + '>',
      subject: `[${requestType}] Neues Update`,
      html: `<p>${requestMessage}</p>`,
    });
    res.send('success');
  })
}