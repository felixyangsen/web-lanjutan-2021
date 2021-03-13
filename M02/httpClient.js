var http = require('http')

var options = {
    hostname: "www.google.com",
    port:80,
    path: "/",
    method: "GET",
    headers: {
        "Context-type":"application/json",
    },
};

var req = http.request(options, function (response) {
    console.log(response.statusCode);
    console.log(response.statusMessage);
    console.log(response.headers);
});

req.on("error", function (e) {
    console.log("error: ", e.message);
});

req.end();

