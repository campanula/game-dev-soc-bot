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

const readTxt = (path) => {
  let fileContent = null;

  try { // Stopping possible crashing in the case a file is emptied during runtime
    fileContent = fs.readFileSync(path);
  } catch (error) {
    console.error(error);
  }

  return fileContent;
}

module.exports = { read, write, readTxt } 
