function extractParams(req) {
  return req.url.split(/[#?]/)[1];
}

function extractType(req) {
  return req.url.split(/[\/\?]/).filter((i) => i)[2];
}

function getQueryTokens(query) {
  if(query[0] === "\"" && query[query.length - 1] === "\"") {
    var query_arr = query.replace(/"/g, "").toLowerCase().split(/ +/g)
    var query_token = ""
    for(var word of query_arr){
      query_token = `${query_token} ${word}` 
    }
    console.log(query_token);
    return query_token.trim()
  } else {
    console.log(query.toLowerCase().split(" "));
    return query.toLowerCase().split(" ");
  }
}

module.exports = {
  extractParams,
  extractType,
  getQueryTokens
};
