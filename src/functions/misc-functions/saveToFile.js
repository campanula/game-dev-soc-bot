const fs = require("fs");

const read = (path) => {
  let array = null;

  try { // Stopping possible crashing in the case a file is emptied during runtime
    const fileContent = fs.readFileSync(path);
    array = JSON.parse(fileContent);
  } catch (error) {
    console.error(error);
  }

  return array;
}

const write = (array, path) => {
  fs.writeFileSync(path, JSON.stringify(array));
}

const writeNum = (num, path) => {
  fs.writeFileSync(path, num);
}

module.exports = { read, write, writeNum } 
