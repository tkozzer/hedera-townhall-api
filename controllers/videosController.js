const DB = require("../models/videosModel");

const content_type = "application/json";

// @desc    Gets All Videos
// @route   GET /api/videos
async function getVideos(req, res) {
  try {
    const videos = await DB.findAll({
      type: "videos",
      request: req,
    });
    return {
      "content-type": "application/json",
      status: 200,
      data: videos,
    };
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets All Videos Chapters
// @route   GET /api/videos/chapters
async function getAllChapters(req, res) {
  try {
    const chapters = await DB.findAll({
      type: "chapters",
      request: req,
    });

    if (!chapters) {
      return {
        "content-type": content_type,
        status: 404,
        data: {
          message: "route cannot be found",
          error_location: "videosController",
        },
      };
    } else {
      return {
        "content-type": content_type,
        status: 200,
        data: chapters,
      };
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets All Videos Subtitles
// @route   GET /api/videos/subtitles
async function getAllSubtitles(req, res) {
  try {
    const subtitles = await DB.findAll({
      type: "subtitles",
      request: req,
    });

    if (!subtitles) {
      return {
        "content-type": content_type,
        status: 404,
        data: {
          message: "route cannot be found",
          error_location: "videosController",
        },
      };
    } else {
      return {
        "content-type": content_type,
        status: 200,
        data: subtitles,
      };
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets All Videos Chapters & Subtitles
// @route   GET /api/videos/all
async function getAllChaptersAndSubtitles(req, res) {
  try {
    const chaptersAndSubtitles = await DB.findAll({
      type: "all",
      request: req,
    });

    if (!chaptersAndSubtitles) {
      return {
        "content-type": content_type,
        status: 404,
        data: {
          message: "route cannot be found",
          error_location: "videosController",
        },
      };
    } else {
      return {
        "content-type": content_type,
        status: 200,
        data: chaptersAndSubtitles,
      };
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getVideos,
  getAllChapters,
  getAllSubtitles,
  getAllChaptersAndSubtitles,
};
