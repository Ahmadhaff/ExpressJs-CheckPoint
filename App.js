const express = require("express");
const moment = require("moment");

const app = express();
// This Middleware  checks if the service is available during working hours .
const workingHoursMiddleware = (req, res, next) => {
  const now = moment();
  const dayOfWeek = now.day();
  const hour = now.hour();
  //console.log(`Current day: ${dayOfWeek}, hour: ${hour}`);
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour <= 23) {
    next();
  } else {
    res
      .status(503)
      .send(
        "Le service est disponible uniquement pendant les heures de travail (du lundi au vendredi, de 9h00 à 17h00)"
      );
  }
};

app.use(workingHoursMiddleware); // Use the workingHoursMiddleware for all routes

app.set("view engine", "ejs"); // Set the view engine to EJS

// Define route for the Home page
app.get("/", function (req, res) {
  res.render("home", { pageTitle: "Home", currentPage: "home" }); // Render the home page and pass in the page title and current page (same for all pages)
});

// Define route for the services page
app.get("/services", function (req, res) {
  res.render("services", {
    pageTitle: "Our Services",
    currentPage: "services",
  });
});

// Define route for the contact page
app.get("/contact", function (req, res) {
  res.render("contact", { pageTitle: "Contact Us", currentPage: "contact" });
});

// Start the server and listen on port 3000
app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
