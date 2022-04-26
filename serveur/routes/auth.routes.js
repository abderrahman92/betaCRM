const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const test = require("../controllers/societe.controllers");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );
  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/historique", controller.historique_auth);
  app.get("/api/find", test.findAll);
  
};
