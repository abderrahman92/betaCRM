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
exports.sof_adminhBoard = (req, res) => {
  res.status(200).send("sofitech admin Content :)");
};
exports.cem_adminhBoard = (req, res) => {
  res.status(200).send("cemeca admin  Content :)");
};
exports.sof_supBoard = (req, res) => {
  res.status(200).send("sofitech super admin  Content :)");
};
exports.cem_supBoard = (req, res) => {
  res.status(200).send("cemeca super admin  Content :)");
};
