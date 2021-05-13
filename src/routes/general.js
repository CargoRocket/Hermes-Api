import { optional, paramTypes, required } from '../helpers/parameters';
import nodemailer from 'nodemailer'
import smtpConfig from '../config/smtp.json'

export default (app) => {
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