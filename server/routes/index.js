const express = require("express");
const router = express.Router();
const { soapAuth } = require('@config/soap-http');

function routes(app) {
  
  router.get("/login", async (req, res) => {
    const header = { Username: '000028', Password: 'thanung' };
    const response = await soapAuth('Login', header);
    res.send(response[0].LoginResult);
  });

  // router.get("/movies/:id", (req, res) => {
  //   return app.render(req, res, "/movies", { id: req.params.id });
  // });

  return router;
};

module.exports = routes;