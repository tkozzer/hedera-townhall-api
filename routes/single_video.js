const express = require("express");
const router = express.Router();
const {
  getVideo,
  getVideoChapters,
  getVideoSubtitles,
  getVideoChaptersAndSubtitles,
} = require("../controllers/singleVideoController");

// Get Single Video
router.get("/:year/:month", async (req, res) => {
  let answer = await getVideo(req, res);
  res.type(answer["content-type"]);
  res.status(answer.status).send(JSON.stringify(answer.data, null, 2));
});

// Get Single Video Chapters
router.get("/:year/:month/chapters", async (req, res) => {
  let answer = await getVideoChapters(req, res);
  res.type(answer["content-type"]);
  res.status(answer.status).send(JSON.stringify(answer.data, null, 2));
});

// Get Single Video Subtitles
router.get("/:year/:month/subtitles", async (req, res) => {
  let answer = await getVideoSubtitles(req, res);
  res.type(answer["content-type"]);
  res.status(answer.status).send(JSON.stringify(answer.data, null, 2));
});

// Get Single Video Chapters & Subtitles
router.get("/:year/:month/all", async (req, res) => {
  let answer = await getVideoChaptersAndSubtitles(req, res);
  res.type(answer["content-type"]);
  res.status(answer.status).send(JSON.stringify(answer.data, null, 2));
});

module.exports = router;
