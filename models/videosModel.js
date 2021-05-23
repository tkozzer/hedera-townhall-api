const db = require("../th_data/db");
const { extractParams } = require("../utils/utils");
const {
  getRelevantChapters,
  getRelevantSubtitles,
  getRelevantChapsAndSubs,
} = require("../utils/model_utils");
const querystring = require("querystring");

/* 
  The is a routing function that will resolve a promise. It will either return all of the given
  type (chapters, subtitles, all) or provide relevant information based on the query
*/
function findAll(obj) {
  return new Promise((resolve, reject) => {
    if (obj.type === "videos") {
      resolve(db.entries);
    } else if (obj.type === "chapters") {
      resolve(findAllChapters(obj.request));
    } else if (obj.type === "subtitles") {
      resolve(findAllSubtitles(obj.request));
    } else if (obj.type === "all") {
      resolve(findAllChaptersAndSubtitles(obj.request));
    } else {
      resolve({
        error: "cannot find",
      });
    }
  });
}

/*
  The next series of functions will retrieve information based on the type (chapters, subtitles, all)
  and the query if one is present
*/

function findAllChapters(req) {
  let paramObject = querystring.parse(extractParams(req));
  let keys = Object.keys(paramObject);

  // Get all chapters from the db.entries. Will filter our subtitles under chapters if 'show_subtitles' is true
  let all_chapters = new Array();
  for (let entry of db.entries) {
    if (
      (keys.includes("show-subs") && paramObject["show-subs"] === "true") ||
      (keys.includes("search-subs") && paramObject["search-subs"] === "true")
    ) {
      all_chapters.push({
        id: entry.id,
        title: entry.title,
        upload_date: entry.upload_date,
        chapters: entry.chapters,
      });
    } else {
      let chapters_arr = new Array();
      for (chapter of entry.chapters) {
        chapters_arr.push({
          title: chapter.title,
          end_time: chapter.end_time,
          start_time: chapter.start_time,
        });
      }
      all_chapters.push({
        id: entry.id,
        title: entry.title,
        upload_date: entry.upload_date,
        chapters: chapters_arr,
      });
    }
  }
  // This will see if their is a relevant query for the data and return any if it exists.
  if (keys.includes("query") && paramObject["query"].length > 0) {
    let relevant_chapters = new Array();
    for (let entry of all_chapters) {
      var answer = getRelevantChapters(entry, paramObject);
      if (answer.chapters.length !== 0) {
        relevant_chapters.push(answer);
      }
    }
    if (relevant_chapters.length === 0) {
      return {
        query: paramObject.query,
        type: "chapters",
        message: "No match found in all chapters",
      };
    } else {
      return relevant_chapters;
    }
  } else {
    return all_chapters;
  }
}

function findAllSubtitles(req) {
  let all_subtitles = new Array();
  for (let entry of db.entries) {
    all_subtitles.push({
      id: entry.id,
      title: entry.title,
      upload_date: entry.upload_date,
      subtitles: entry.subtitles,
    });
  }

  let paramObject = querystring.parse(extractParams(req));
  let keys = Object.keys(paramObject);

  if (keys.includes("query")) {
    let relevant_subtitles = new Array();
    for (let entry of db.entries) {
      var answer = getRelevantSubtitles(entry, paramObject);
      if (answer.subtitles.length !== 0) {
        relevant_subtitles.push({
          id: entry.id,
          title: entry.title,
          upload_date: entry.upload_date,
          subtitles: answer.subtitles,
        });
      }
    }
    if (relevant_subtitles.length !== 0) {
      return relevant_subtitles;
    } else {
      return {
        query: paramObject.query,
        type: "subtitles",
        message: "No match found in all chapters and subtitles",
      };
    }
  } else {
    return all_subtitles;
  }
}

// Changed so retrieval is only one object per entry(video)
function findAllChaptersAndSubtitles(req) {
  let paramObject = querystring.parse(extractParams(req));
  let keys = Object.keys(paramObject);

  let all = new Array();
  for (let entry of db.entries) {
    if (
      (keys.includes("show-subs") && paramObject["show-subs"] === "true") ||
      (keys.includes("search-subs") && paramObject["search-subs"] === "true")
    ) {
      all.push({
        id: entry.id,
        title: entry.title,
        upload_date: entry.upload_date,
        chapters: entry.chapters,
        subtitles: entry.subtitles,
      });
    } else {
      let chapters_arr = new Array();
      for (chapter of entry.chapters) {
        chapters_arr.push({
          title: chapter.title,
          end_time: chapter.end_time,
          start_time: chapter.start_time,
        });
      }
      all.push({
        id: entry.id,
        title: entry.title,
        upload_date: entry.upload_date,
        chapters: chapters_arr,
        subtitles: entry.subtitles,
      });
    }
  }

  if (keys.includes("query")) {
    let relevant_chaps_subs = new Array();
    for (let entry of all) {
      var answer = getRelevantChapsAndSubs(entry, paramObject);
      if (answer.chapters.length !== 0 || answer.subtitles.length !== 0) {
        relevant_chaps_subs.push({
          id: entry.id,
          title: entry.title,
          upload_date: entry.upload_date,
          chapters: answer.chapters,
          subtitles: answer.subtitles,
        });
      }
    }
    if (relevant_chaps_subs.length !== 0) {
      return relevant_chaps_subs;
    } else {
      return {
        query: paramObject.query,
        type: "all",
        message: "No match found in all chapters and subtitles",
      };
    }
  } else {
    return all;
  }
}

module.exports = {
  findAll,
  findAllChapters,
  findAllSubtitles,
  findAllChaptersAndSubtitles,
};
