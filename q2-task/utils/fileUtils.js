const fs = require("fs");

const readFile = (filePath, callback) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

const writeFile = (filePath, data, callback) => {
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null);
    }
  });
};

module.exports = { readFile, writeFile };
