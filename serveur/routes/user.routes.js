const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/test/all", controller.allAccess);
  //cemeca consultation
  app.get(
    "/api/test/cemeca",
    [authJwt.verifyToken],
    controller.cemecaBoard
  );
  //sofitech consultation
  app.get(
    "/api/test/sofitech",
    [authJwt.verifyToken, authJwt.isSofitech],
    controller.sofitechBoard
  );
  //super admin
  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};
