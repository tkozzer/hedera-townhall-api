/* The first function is to check the local storage. The local storage will allow the user to have a stored state
as they use the basic UI interface */
function checkLocalStorage() {
    var local_video = localStorage.getItem("video-api");
    var show_subtitles_video = localStorage.getItem("show-subtitles-video");
    if (local_video !== undefined) {
      document.getElementById("video-api").href = local_video;
      document.getElementById("video-api").textContent = local_video;
      document.getElementById(
        "show-subtitles-video"
      ).checked = show_subtitles_video;
    }
  
    var local_chapters = localStorage.getItem("chapters-api");
    var show_subtitles_chapters = localStorage.getItem("show-subtitles-chapters");
    if (local_chapters !== undefined) {
      document.getElementById("chapters-api").href = local_chapters;
      document.getElementById("chapters-api").textContent = local_chapters;
      document.getElementById(
        "show-subtitles-chapters"
      ).checked = show_subtitles_chapters;
    }
  
    var local_subtitles = localStorage.getItem("subtitles-api");
    if (local_subtitles !== undefined) {
      document.getElementById("subtitles-api").href = local_subtitles;
      document.getElementById("subtitles-api").textContent = local_subtitles;
    }
  
    var query_api = localStorage.getItem("query-api");
    var query = localStorage.getItem("query");
    var type = localStorage.getItem("type");
    var is_show_subtitles_checked = localStorage.getItem("show-subtitles");
    var is_search_subtitles_checked = localStorage.getItem("search-subtitles");

    if(query === ""){
      document.getElementById("search-subtitles").disabled = false;
    }
    if (type === null) {
      type = "Choose...";
    }
    if (query !== undefined) {
      document.getElementById(
        "show-subtitles"
      ).checked = is_show_subtitles_checked;
      document.getElementById(
        "search-subtitles"
      ).checked = is_search_subtitles_checked;
      document.getElementById("query").value = query;
      document.getElementById("type").value = type;
      document.getElementById("query-api").href = query_api;
      document.getElementById("query-api").textContent = query_api;
    }
  }
  
  // Allows user to clear their local storage
  function clearStorage() {
    localStorage.clear();
    window.location.reload();
  }
  
  var show_subs_video = false;
  var show_subs_chapters = false;
  
  function video() {
    show_subs_video = document.getElementById("show-subtitles-video").checked;
    var x = document.getElementById("video").value;
    var year = x.slice(0, 4);
    var month = x.slice(5, 7);
    var link = `/api/videos/${year}/${month}`;
    if (year !== "") {
      link = show_subs_video ? link + `?show-subs=${show_subs_video}` : link;
      document.getElementById("video-api").href = link;
      document.getElementById("video-api").textContent = link;
      localStorage.setItem("video-api", link);
      localStorage.setItem("show-subtitles-video", show_subs_video);
    }
  }
  
  function chapters() {
    show_subs_chapters = document.getElementById("show-subtitles-chapters")
      .checked;
    var x = document.getElementById("chapters").value;
    var year = x.slice(0, 4);
    var month = x.slice(5, 7);
    var link = `/api/videos/${year}/${month}/chapters`;
    if (year !== "") {
      link = show_subs_chapters
        ? link + `?show-subs=${show_subs_chapters}`
        : link;
      document.getElementById("chapters-api").href = link;
      document.getElementById("chapters-api").textContent = link;
      localStorage.setItem("chapters-api", link);
    }
  }
  
  function subtitles() {
    var x = document.getElementById("subtitles").value;
    var year = x.slice(0, 4);
    var month = x.slice(5, 7);
    var link = `/api/videos/${year}/${month}/subtitles`;
    document.getElementById("subtitles-api").href = link;
    document.getElementById("subtitles-api").textContent = link;
    localStorage.setItem("subtitles-api", link);
  }
  
  // helper function: used to disable the check boxes so the user doesn't use them when searching subtitles
  function disableCheckboxes(type) {
    if (type === "subtitles") {
      document.getElementById("show-subtitles").disabled = true;
      show_subs = document.getElementById("show-subtitles").checked = false;
      document.getElementById("search-subtitles").disabled = true;
      search_subs = document.getElementById("search-subtitles").checked = false;
      document.getElementById("no-subtitles").disabled = true;
      no_subs = document.getElementById("no-subtitles").checked = false;
    } else {
      document.getElementById("show-subtitles").disabled = false;
      document.getElementById("search-subtitles").disabled = false;
      document.getElementById("no-subtitles").disabled = false;

    }
  }
  
  function addType() {
    var type = document.getElementById("type").value;
    if (type === "Choose...") {
      console.log("choice error");
    } else {
      if (document.getElementById("error").innerHTML.length > 0) {
        document.getElementById("error").innerHTML = "";
      }
  
      disableCheckboxes(type);
      addQuery();
    }
  }
  
  function addQuery() {
    show_subs = document.getElementById("show-subtitles").checked;
    search_subs = document.getElementById("search-subtitles").checked;
    var type = document.getElementById("type").value;
    if (type === "Choose...") {
      var p_tag = `<p style="color: red;">Please select one of the options in the drop down.</p>`;
      document.getElementById("error").innerHTML = p_tag;
    } else {
      if (document.getElementById("error").innerHTML.length > 0) {
        document.getElementById("error").innerHTML = "";
      }
      disableCheckboxes(type);
      var link = `/api/videos/${type}?`;
      var query = document.getElementById("query").value;
      if (query === "") {
        document.getElementById("search-subtitles").disabled = true;
        document.getElementById("search-subtitles").checked = false;
        
      }
      if (query.length !== 0) {
        link = link + `query=${query}`;
      }
      if (show_subs) {
        if (link[link.length - 1] === "?") {
          link = link + `show-subs=${show_subs}`;
        } else {
          link = link + `&show-subs=${show_subs}`;
        }
      }
      if (search_subs) {
        if (link[link.length - 1] === "?") {
          link = link + `search-subs=${search_subs}`;
        } else {
          link = link + `&search-subs=${search_subs}`;
        }
      }
  
      document.getElementById("query-api").href = link;
      document.getElementById("query-api").textContent = link;
      localStorage.setItem("query-api", link);
      localStorage.setItem("query", query);
      localStorage.setItem("type", type);
    }
  }
  
  function addQuery_Enter(ele) {
    if (window.event.key === "Enter") {
      window.location.href = `${
        document.getElementById("query-api").textContent
      }`;
    }
  }
  
  var show_subs = false;
  var search_subs = false;
  
  function getTodaysDate() {
    var today = new Date();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
  
    if (mm < 10) {
      mm = "0" + mm;
    }
  
    today = `${yyyy}-${mm}`;
    document.getElementById("video").setAttribute("max", today);
    document.getElementById("chapters").setAttribute("max", today);
    document.getElementById("subtitles").setAttribute("max", today);
  }
  
  function getInfo() {
    url = window.location.href;
    const Url = `${url}info`;
  
    fetch(Url)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        document.getElementById("version").textContent = `Version ${res.version}`;
        document.getElementById("description").textContent = res.description;
      });
  }
  
  function getCopyrightYear() {
    var today = new Date();
    var yyyy = today.getFullYear();
  
    var answer = `Copyright ©${yyyy}`;
    document.getElementById("copyright").textContent = answer;
  }
  
  function tooltipTitle() {
    var labels = document.getElementsByTagName("label");
    for (label of labels) {
      label.setAttribute(
        "title",
        "When checked it will create a key called 'text' which will display all the subtitles for each chapter."
      );
    }
    document.getElementById(`no-label`).setAttribute("title", "No subtitles will appear inside the 'chapters' object" )
    document.getElementById(`show-label`).setAttribute("title", "Subtitles will appear inside the 'chapters' object" )
    document.getElementById(`search-label`).setAttribute("title", "Subtitles will appear inside the 'chapters' object and will be used to search with the given query." )
  }
  
  tooltipTitle();
  getCopyrightYear();
  getInfo();
  getTodaysDate();
  checkLocalStorage();
  