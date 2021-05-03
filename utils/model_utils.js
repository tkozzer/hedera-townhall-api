// Helper Methods
const utils = require("./utils")

function getEntry(db, year, month, paramObject) {
  for (var entry of db.entries) {
    if (
      year === entry.upload_date.slice(0, 4) &&
      month === entry.upload_date.slice(4, 6)
    ) {
      const clone = JSON.parse(JSON.stringify(entry));
      if (paramObject["show-subs"] !== "true") {
        var chapters = new Array();
        for (let chapter of clone.chapters) {
          chapters.push({
            title: chapter.title,
            start_time: chapter.start_time,
            end_time: chapter.end_time,
          });
        }
        clone.chapters = chapters;
        return clone;
      } else {
        return clone;
      }
    }
  }
  return null;
}

function getRelevantChapters(entry, paramObject) {
  var chapters = new Array();
  var query_words = paramObject.query.toLowerCase().split(" ");
  // var query_words = utils.getQueryTokens(paramObject.query);
  for (let question of entry.chapters) {
    var questions = question.title.toLowerCase().split(/[\s\,\?\(\)]/);
    for (let word of query_words) {
      if (questions.includes(word)) {
        if (!chapters.includes(question)) {
          chapters.push(question);
        }
      }
      if (
        Object.keys(question).includes("text") &&
        paramObject["search-subs"] === "true"
      ) {
        var subtitles = question.text.toLowerCase().split(/[\s\,\?\(\)]/);
        if (subtitles.includes(word)) {
          if (!chapters.includes(question)) {
            chapters.push(question);
          }
        }
      }
    }
  }
  return {
    id: entry.id,
    upload_date: entry.upload_date,
    chapters: chapters,
  };
}

function getRelevantSubtitles(entry, paramObject) {
  var subtitles = new Array();
  var query_words = paramObject.query.toLowerCase().split(" ");
  for (let text of entry.subtitles) {
    var texts = text.text.toLowerCase().split(/[\s\,\?\(\)]/);
    for (let word of query_words) {
      if (texts.includes(word)) {
        if (!subtitles.includes(text)) {
          subtitles.push(text);
        }
      }
    }
  }
  return {
    subtitles: subtitles,
  };
}

function getRelevantChapsAndSubs(entry, paramObject) {
  var chapters = getRelevantChapters(entry, paramObject);
  var subtitles = getRelevantSubtitles(entry, paramObject);

  return {
    chapters: chapters.chapters,
    subtitles: subtitles.subtitles,
  };
}

module.exports = {
  getEntry,
  getRelevantChapters,
  getRelevantSubtitles,
  getRelevantChapsAndSubs,
};
