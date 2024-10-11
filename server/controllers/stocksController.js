const db = require("../models");

module.exports = {
  findByName: function (req, res) {
    console.log("Request params:", req.params);
    db.Stocks.find({ ticker: req.params.ticker })
      .then((dbModel) => {
        console.log("DB Model:", dbModel);
        res.json(dbModel);
      })
      .catch((err) => {
        console.error("Database Error:", err);
        res.status(422).json(err);
      });
  },
};
