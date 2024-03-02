import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
    try {
      const response = await axios.get("https://v2.jokeapi.dev/joke/Any");
      const result = response.data;
      res.render("index.ejs", { data: result });
      console.log(result);
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message,
      });
    }
  });
  app.post("/submit", async (req, res) => {
    try {
      
      const type = req.body.key;
      const response = await axios.get(
        `https://v2.jokeapi.dev/joke/Any?contains=${type}`
      );
      const result = response.data;
      console.log(result);
      res.render("index.ejs", {
        data: result
      });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("solution.ejs", {
        error: "No activities that match your criteria.",
      });
    }
  });
app.listen(3000,()=>{
    console.log("Server running on 3000..");
})