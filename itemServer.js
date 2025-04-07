const http = require("http");
const {
  getAllItems,
  getSingleItem,
  addItem,
  updateItem,
  deleteItem,
} = require("./itemServerHelper");

const hostname = "localhost";
const port = 8008;

const requestHandler = (request, response) => {
  response.setHeader("Content-Type", "application/json");

  if (request.url === "/items" && request.method === "GET") {
    getAllItems(request, response);
  } else if (request.url.match(/\/items\/\d+/) && request.method === "GET") {
    getSingleItem(request, response);
  } else if (request.url === "/items" && request.method === "POST") {
    addItem(request, response);
  } else if (request.url.match(/\/items\/\d+/) && request.method === "PUT") {
    updateItem(request, response);
  } else if (request.url.match(/\/items\/\d+/) && request.method === "DELETE") {
    deleteItem(request, response);
  } else {
    response.writeHead(404);
    response.end(
      JSON.stringify({
        message: "Method Not Supported",
      })
    );
  }
};

const server = http.createServer(requestHandler);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
