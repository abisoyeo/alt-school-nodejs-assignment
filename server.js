const http = require("http");
const fs = require("fs");
const path = require("path");
const routes = require("./invetory-api/routes/routes");

const hostname = "localhost";
const port = process.env.PORT || 8000;

const requestHandler = (request, response) => {
  if (request.url.startsWith("/api")) {
    // Handle API routes
    routes(request, response);
  } else {
    // Handle static HTML files
    handleStaticFiles(request, response);
  }
};

const handleStaticFiles = (request, response) => {
  const indexFilePath = path.join(
    __dirname,
    "html-server",
    "static",
    "index.html"
  );
  const errorFilePath = path.join(
    __dirname,
    "html-server",
    "static",
    "error.html"
  );

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

const server = http.createServer(requestHandler);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
  console.log(`API routes available at http://${hostname}:${port}/api/*`);
  console.log(`Static files available at http://${hostname}:${port}/`);
});
