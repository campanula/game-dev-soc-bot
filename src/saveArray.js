const fs = require("fs");

read = (path) => {
    const fileContent = fs.readFileSync(path);
    const array = JSON.parse(fileContent);
    return array;
}

write = (array, path) => {
    fs.writeFileSync(path, JSON.stringify(array));
}

module.exports = {read, write} 
