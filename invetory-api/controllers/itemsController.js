const fs = require("fs");
const path = require("path");
const { readFile, writeFile } = require("../utils/fileUtils");

const itemsDbPath = path.join(__dirname, "..", "db", "items.json");

const getAllItems = (request, response) => {
  readFile(itemsDbPath, (err, items) => {
    if (err) {
      response.writeHead(400);
      response.end("An error occurred");
      return;
    }
    response.end(items);
  });
};

const getSingleItem = (request, response) => {
  const itemId = request.url.split("/").pop();

  readFile(itemsDbPath, (err, data) => {
    if (err) {
      response.writeHead(400);
      response.end("An error occurred while reading the data.");
      return;
    }

    let itemsDB;
    try {
      itemsDB = JSON.parse(data);
    } catch (parseError) {
      response.writeHead(400);
      response.end("An error occurred while parsing the JSON.");
      return;
    }

    const item = itemsDB.find((item) => item.id === parseInt(itemId));

    if (item) {
      response.writeHead(200);
      response.end(JSON.stringify(item));
    } else {
      response.writeHead(404);
      response.end(JSON.stringify({ message: "Item Not Found" }));
    }
  });
};

const addItem = (request, response) => {
  let body = [];
  readFile(itemsDbPath, (err, data) => {
    if (err) {
      response.writeHead(400);
      response.end("An error occurred while reading the data.");
      return;
    }

    let itemsDB;
    try {
      itemsDB = JSON.parse(data);
    } catch (parseError) {
      response.writeHead(400);
      response.end("An error occurred while parsing the JSON.");
      return;
    }

    const lastItemId = itemsDB.length > 0 ? itemsDB[itemsDB.length - 1].id : 0;

    request.on("data", (chunk) => {
      body.push(chunk);
    });

    request.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const newItem = JSON.parse(parsedBody);

      newItem.id = lastItemId + 1;
      itemsDB.push(newItem);

      writeFile(itemsDbPath, JSON.stringify(itemsDB), (err) => {
        if (err) {
          response.writeHead(500);
          response.end(
            "Internal Server Error. Could not save item to database."
          );
          return;
        }
        response.writeHead(201);
        response.end(JSON.stringify(newItem));
      });
    });
  });
};

const updateItem = (request, response) => {
  let body = [];
  readFile(itemsDbPath, (err, data) => {
    if (err) {
      response.writeHead(400);
      response.end("An error occurred while reading the data.");
      return;
    }

    let itemsDB;
    try {
      itemsDB = JSON.parse(data);
    } catch (parseError) {
      response.writeHead(400);
      response.end("An error occurred while parsing the JSON.");
      return;
    }

    request.on("data", (chunk) => {
      body.push(chunk);
    });

    request.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const updatedItem = JSON.parse(parsedBody);

      const itemId = request.url.split("/").pop();
      const itemIndex = itemsDB.findIndex(
        (item) => item.id === parseInt(itemId)
      );

      if (itemIndex !== -1) {
        itemsDB[itemIndex] = { ...itemsDB[itemIndex], ...updatedItem };

        writeFile(itemsDbPath, JSON.stringify(itemsDB), (err) => {
          if (err) {
            response.writeHead(500);
            response.end("Internal Server Error. Could not update the item.");
            return;
          }
          response.writeHead(200);
          response.end(JSON.stringify(itemsDB[itemIndex]));
        });
      } else {
        response.writeHead(404);
        response.end(JSON.stringify({ message: "Item Not Found" }));
      }
    });
  });
};

const deleteItem = (request, response) => {
  const itemId = request.url.split("/").pop();

  readFile(itemsDbPath, (err, data) => {
    if (err) {
      response.writeHead(400);
      response.end("An error occurred while reading the data.");
      return;
    }

    let itemsDB;
    try {
      itemsDB = JSON.parse(data);
    } catch (parseError) {
      response.writeHead(400);
      response.end("An error occurred while parsing the JSON.");
      return;
    }

    const itemIndex = itemsDB.findIndex((item) => item.id === parseInt(itemId));

    if (itemIndex !== -1) {
      itemsDB.splice(itemIndex, 1);

      writeFile(itemsDbPath, JSON.stringify(itemsDB), (err) => {
        if (err) {
          response.writeHead(500);
          response.end("Internal Server Error. Could not delete the item.");
          return;
        }
        response.writeHead(200);
        response.end(JSON.stringify({ message: "Item deleted successfully" }));
      });
    } else {
      response.writeHead(404);
      response.end(JSON.stringify({ message: "Item Not Found" }));
    }
  });
};

module.exports = {
  getAllItems,
  getSingleItem,
  addItem,
  updateItem,
  deleteItem,
};
