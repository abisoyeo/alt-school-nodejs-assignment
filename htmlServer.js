const http = require("http");
const fs = require("fs");
const path = require("path");

const hostname = "localhost";
const port = 8000;

const htmlFileHandler = function (request, response) {
  const indexFilePath = path.join(__dirname, "static", "index.html");
  const errorFilePath = path.join(__dirname, "static", "error.html");

  if (
    request.url === "/" ||
    request.url === "/index" ||
    request.url === "/index.html"
  ) {
    fs.readFile(indexFilePath, function (error, html) {
      if (error) {
        console.error(error);
        response.writeHead(500);
        response.end("Error loading HTML file");
      } else {
        response.setHeader("Content-Type", "text/html");
        response.writeHead(200);
        response.write(html);
        response.end();
      }
    });
  } else {
    fs.readFile(errorFilePath, function (error, html) {
      if (error) {
        console.error(error);
        response.writeHead(500);
        response.end("Error loading HTML file");
      } else {
        response.setHeader("Content-Type", "text/html");
        response.writeHead(404);
        response.write(html);
        response.end();
      }
    });
  }
};

// Create the server
const server = http.createServer(htmlFileHandler);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
