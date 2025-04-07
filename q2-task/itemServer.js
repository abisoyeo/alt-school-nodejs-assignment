const http = require("http");
const routes = require("./routes/routes");

const hostname = "localhost";
const port = 8008;

const requestHandler = (request, response) => {
  routes(request, response);
};

const server = http.createServer(requestHandler);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
