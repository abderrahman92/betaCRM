const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const user = require("../controllers/liste_user.controllers");
module.exports = function(app) {
  // Retrieve all TutorialsÒ
  app.get("/api/test/liste_user", user.findAll);

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/test/all", controller.allAccess);
  //cemeca user
  app.get(
    "/api/test/cemeca",
    [authJwt.verifyToken],
    controller.cemecaBoard
  );
  //sofitech user
  app.get(
    "/api/test/sofitech",
    [authJwt.verifyToken, authJwt.isSofitech],
    controller.sofitechBoard
  );
  //super user
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
