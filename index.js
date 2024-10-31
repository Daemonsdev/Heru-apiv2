const express = require("express");
const path = require("path");
const log = require("./includes/log");
const config = require("./config.json");

global.config = config;
global.api = new Map();
const router = require("./includes/router");
const app = express();

app.use(express.json());

app.use(router);

// Serve config name and photo for use in the frontend
app.get("/config-name", (req, res) => {
  res.json({ 
    name: global.config.name,
    photo: global.config.photo
  });
});

// Endpoint to serve the API list
app.get("/api-list", (req, res) => {
  const apiList = Array.from(global.api.values()).map(api => api.config);
  res.json(apiList);
});

// Serve the index documentation page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "includes/web/index.html"));
});

// Serve the docs.html documentation page
app.get("/docs", (req, res) => {
  res.sendFile(path.join(__dirname, "includes/web/docs.html"));
});

// Serve the 404 page for unknown routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "includes/web/404.html"));
});

const PORT = process.env.PORT || global.config.port || 25694;

app.listen(PORT, () => {
  log.main(`Server is running on port ${PORT}`);
});
