const express = require("express");
const next = require("next");

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json();
const cookieParser = require('cookie-parser')
app
  .prepare()
  .then(() => {
    const server = express();
    server.use(jsonParser);
    server.use(cookieParser());
    server.use("/api", require("./routes/index.js"));

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });