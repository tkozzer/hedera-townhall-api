const DB = require("../models/singleVideoModel");

const content_type = "application/json";

// @desc    Gets Single Video
// @route   GET /api/videos/:year/:month
async function getVideo(req, res) {
  try {
    const video = await DB.findByDate(req);
    if (!video) {
      return {
        "content-type": content_type,
        status: 404,
        data: {
          message: "route not found",
          error_location: "singleVideoController",
        },
      };
    } else {
      return {
        "content-type": content_type,
        status: 200,
        data: video,
      };
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets Single Video Chapters
// @route   GET /api/videos/:year/:month/chapters
async function getVideoChapters(req, res) {
  try {
    const video = await DB.findByDate(req);
    if (!video) {
      return {
        "content-type": content_type,
        status: 404,
        data: {
          message: "Route Not Found",
          error_location: "singleVideoController",
        },
      };
    } else {
      return {
        "content-type": content_type,
        status: 200,
        data: video,
      };
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets Single Video Subtitles
// @route   GET /api/videos/:year/:month/subtitles
async function getVideoSubtitles(req, res) {
  try {
    const video = await DB.findByDate(req);
    if (!video) {
      return {
        "content-type": content_type,
        status: 404,
        data: {
          message: "Route Not Found",
          error_location: "singleVideoController",
        },
      };
    } else {
      return {
        "content-type": content_type,
        status: 200,
        data: video,
      };
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Gets Single Video Chapters and Subtitles
// @route   GET /api/videos/:year/:month/all
async function getVideoChaptersAndSubtitles(req, res) {
  try {
    const video = await DB.findByDate(req);
    if (!video) {
      return {
        "content-type": content_type,
        status: 404,
        data: {
          message: "Route Not Found",
          error_location: "singleVideoController",
        },
      };
    } else {
      return {
        "content-type": content_type,
        status: 200,
        data: video,
      };
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getVideo,
  getVideoChapters,
  getVideoSubtitles,
  getVideoChaptersAndSubtitles,
};
