const fs = require("fs");

read = (path) => {
    try { // Stopping possible crashing in the case a file is emptied during runtime
        const fileContent = fs.readFileSync(path);
        const array = JSON.parse(fileContent);
        return array;
    } catch (error) {
        console.error(error);
    }
}

write = (array, path) => {
    fs.writeFileSync(path, JSON.stringify(array));
}

readTxt = (path) => {
    try { // Stopping possible crashing in the case a file is emptied during runtime
      const fileContent = fs.readFileSync(path);
      return fileContent;
    } catch (error) {
      console.error(error);
    }
  
  }

module.exports = { read, write, readTxt } 
