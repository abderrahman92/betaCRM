exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};
exports.cemecaBoard = (req, res) => {
  res.status(200).send(" cemeca Content :)");
};
exports.adminBoard = (req, res) => {
  res.status(200).send(" Admin Content :)");
};
exports.sofitechBoard = (req, res) => {
  res.status(200).send("sofitech  Content :)");
};
