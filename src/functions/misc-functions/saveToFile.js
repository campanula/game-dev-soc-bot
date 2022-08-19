const fs = require("fs");

// For reading files into an object
const read = (path) => {
  let obj = null;

  try { // Stopping possible crashing in the case a file is emptied during runtime
    const content = fs.readFileSync(path);
    obj = JSON.parse(content);
  } catch (error) {
    console.error(error);
  }

  return obj;
}

// For writing objects to files
const write = (content, path) => {
  fs.writeFileSync(path, JSON.stringify(content));
}

module.exports = { read, write };
