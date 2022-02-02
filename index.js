// creates an express application
const express = require("express");

// for API request
const request = require("request-promise");

const app = express();

// uppercase because it's constant
const PORT = process.env.PORT || 5000;

const generateScraperUrl = (apiKey) =>
  `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

// Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Amazon Scraper API.");
});

// GET Product Details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/dp/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// GET Product Reviews
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/product-reviews/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// GET Product Offers
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// GET Search Results
app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query;

  try {
    const response = await request(
      `${generateScraperUrl(
        api_key
      )}&url=https://www.amazon.com/s?k=/${searchQuery}`
    );
    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

// Listen for connections.
// A node http.Server is returned, with this application (which is a Function) as its callback. If you wish to create both an HTTP and HTTPS server you may do so with the "http" and "https" modules as shown here:
// var http = require('http') , https = require('https') , express = require('express') , app = express();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
