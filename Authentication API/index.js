import express from "express";
// ECMA-6 module syntax
// axios npm module for generating serverside api request
import axios from "axios";
const app = express();
const port = 3000;
// Data Related api
const API_URL = "https://secrets-api.appbrewery.com";
const yourUsername = "";
const yourPassword = "";
const yourAPIKey = "";
const yourBearerToken = "";
app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});
app.get("/noAuth", async (req, res) => {
  try {
    // here we are assining random routes.
    // the result will be the javascript object.
    const result = await axios.get(API_URL + "/random");
    // it will convert corresponding javascript object into the JSON object
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});
app.get("/basicAuth", async (req, res) => {
  try {
    // syntax will be like url  config
    const result = await axios.get(
      API_URL + "/all?page=2",
      {},
      {
        auth: {
          username: yourUsername,
          password: yourPassword,
        },
      }
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});
app.get("/apiKey", async (req, res) => {
  try {
    // syntax will be like url config
    const result = await axios.get(API_URL + "/filter",{
      params: {
        score: 5,
        apiKey: yourAPIKey,
      },
    });
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};
app.get("/bearerToken", async (req, res) => {
  try {
    // syntax will be like url config
    const result = await axios.get(API_URL + "/secrets/2", config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.status(404).send(error.message);
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
