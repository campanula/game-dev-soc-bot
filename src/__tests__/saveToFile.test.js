const { read, write } = require("../functions/misc-functions/saveToFile.js");
const fs = require("fs");

describe("Write", () => {
    test("Will write the content to file after converting it to a JSON string", () => {
        let content = ["Test1", "Test2", "Test3"];
        let path = "src/__tests__/txt/saveToFile.txt";
        const output = write(content, path);

        expect(output).toEqual(fs.writeFileSync(path, JSON.stringify(content)));
    });
});

describe("Read", () => {
    test("When given an array, returns an array", () => {
        let arr = [];
        let path = "src/__tests__/txt/saveToFileArray.txt";
        const output = read(path);

        expect(output).toEqual(arr);
        expect(Array.isArray(output)).toBe(true);
    });

    test("When given a dict, returns a dict", () => {
        let arr = {};
        let path = "src/__tests__/txt/saveToFileDict.txt";
        const output = read(path);

        expect(output).toEqual(arr);
        expect(output).toBeInstanceOf(Object);
        expect(Array.isArray(output)).toBe(false);
    });

    test("Will return the file contents as an object of the file contents", () => {
        let arr = ["Test1", "Test2", "Test3"];
        let path = "src/__tests__/txt/saveToFile.txt";
        const output = read(path);

        expect(output).toEqual(arr);
    });
});
