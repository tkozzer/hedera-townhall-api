const express = require("express");
const router = express.Router();
const {
  getVideos,
  getAllChapters,
  getAllSubtitles,
  getAllChaptersAndSubtitles,
} = require("../controllers/videosController");

// Get all Videos
router.get("/videos", async (req, res) => {
  let answer = await getVideos(req, res);
  res.type(answer["content-type"]);
  res.status(answer.status).send(JSON.stringify(answer.data, null, 2));
});

// Get all Chapters
router.get("/videos/chapters", async (req, res) => {
  let answer = await getAllChapters(req, res);
  res.type(answer["content-type"]);
  res.status(answer.status).send(JSON.stringify(answer.data, null, 2));
});

router.get("/videos/subtitles", async (req, res) => {
  let answer = await getAllSubtitles(req, res);
  res.type(answer["content-type"]);
  res.status(answer.status).send(JSON.stringify(answer.data, null, 2));
});

router.get("/videos/all", async (req, res) => {
  let answer = await getAllChaptersAndSubtitles(req, res);
  res.type(answer["content-type"]);
  res.status(answer.status).send(JSON.stringify(answer.data, null, 2));
});

module.exports = router;
