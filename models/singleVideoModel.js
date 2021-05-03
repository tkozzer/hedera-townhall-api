const db = require("../th_data/db");
const { extractParams, extractType } = require("../utils/utils");
const {
  getEntry,
  getRelevantChapters,
  getRelevantSubtitles,
  getRelevantChapsAndSubs,
} = require("../utils/model_utils");
const querystring = require("querystring");

// This function is used by the singleVideoController to provide all the information of a given video
// TODO add query based look ups for single videos
function findByDate(req) {
  const year = req.params.year;
  const month = req.params.month;

  const type = extractType(req);
  const paramObj = querystring.parse(extractParams(req));
  return new Promise((resolve, reject) => {
    let entry = getEntry(db, year, month, paramObj);
    if (entry !== null) {
      if (type !== undefined) {
        query_exists = paramObj.query !== undefined;
        switch (type) {
          case "chapters":
            entry = query_exists
              ? getRelevantChapters(entry, paramObj)
              : {
                  id: entry.id,
                  upload_date: entry.upload_date,
                  chapters: entry.chapters,
                };
            break;
          case "subtitles":
            entry = query_exists
              ? getRelevantSubtitles(entry, paramObj)
              : {
                  id: entry.id,
                  upload_date: entry.upload_date,
                  subtitles: entry.subtitles,
                };
            break;
          case "all":
            entry = query_exists
              ? getRelevantChapsAndSubs(entry, paramObj)
              : {
                  id: entry.id,
                  upload_date: entry.upload_date,
                  chapters: entry.chapters,
                  subtitles: entry.subtitles,
                };
            break;
          default:
            console.log("This option doesn't exist");
        }
      }
    }
    resolve(entry);
  });
}

module.exports = {
  findByDate,
};
