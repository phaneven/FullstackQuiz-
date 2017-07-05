var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var postData = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    request.setEncoding("utf8");

    request.addListener("data", function(temp) {
      postData += temp;
      console.log("Received data: " + postData);
    });
    
    request.addListener("end", function() {
      route(handle, pathname, response, postData);
    });
  }

  http.createServer(onRequest).listen(8000);
  console.log("running server");
}

exports.start = start;