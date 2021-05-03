const express = require("express");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 8080;

const server = express();


var env = process.argv[2]
if (env === "dev") {
  // Is for development purposes
  const connectLivereload = require("connect-livereload");
  const livereload = require("livereload");

  // Hot reloading for development
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, "public"));

  //Middleware
  server.use(connectLivereload());

  liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
  });
}

// Middleware
server.use(cors());

// Basic Frontend capabilities for informational use of API
server.use(express.static("public"));

server.get("/api/", (req, res) => {
  res.redirect("/");
});

//Routes
let singleVideo = require("./routes/single_video");
let allVideos = require("./routes/all_videos");
let info = require("./routes/info");
server.use("/api/videos", singleVideo);
server.use("/api/", allVideos);
server.use("/", info);

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
