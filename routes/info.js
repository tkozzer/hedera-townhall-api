const express = require("express");
const router = express.Router();
const pjson = require("../package.json");

router.get("/info", async (req, res) => {
  res.status(200).send(
    JSON.stringify(
      {
        version: pjson.version,
        description: pjson.description,
      },
      null,
      2
    )
  );
});

module.exports = router;
