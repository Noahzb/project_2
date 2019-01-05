var db = require("../models");
var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated")

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render(path.join(__dirname, "../views/signup.handlebars"));
  });



  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    } else {

      res.render(path.join(__dirname, "../views/login.handlebars"));
    }
  });

  app.get("/signup", function (req, res) {
    res.render(path.join(__dirname, "../views/signup.handlebars"));
  });

  app.get("/members", isAuthenticated, function (req, res) {
    res.render(path.join(__dirname, "../views/members.handlebars"));
  });

  app.get("/discover", function (req, res, err) {

    if (req.user) {
      res.redirect("/members")
    } else {
      res.render(path.join(__dirname, "../views/login.handlebars"))
    }

  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};