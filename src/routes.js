export default (app) => {
  /**
   * @openapi
   * /:
   *   get:
   *     title: Our first endpoint
   *     description: Welcome to swagger-jsdoc!
   *     responses:
   *       200:
   *         description: Returns a mysterious string.
   */
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
}