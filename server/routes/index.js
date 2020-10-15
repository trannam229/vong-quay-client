const express = require("express");
const router = express.Router();
const { soapAuth } = require('../soap-http');

function routes(app) {
    router.get("/login", async (req, res) => {
        const response = await soapAuth();
        res.send(response[0].LoginResult);
    });

    router.get("/movies/:id", (req, res) => {
        return app.render(req, res, "/movies", { id: req.params.id });
    });

    return router;
};

module.exports = routes;