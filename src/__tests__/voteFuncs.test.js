const { getMaxVotes, toArray } = require("../functions/misc-functions/voteFuncs.js");

describe("getMaxVotes", () => {
    test("Check the output is a dict", () => {
        dict = {};
        const output = getMaxVotes(dict, 1);

        expect(output).toBeInstanceOf(Object);
        expect(Array.isArray(output)).toBe(false);
    });

    test("Check the output is the highest value pairs", () => {
        dict = { "key": 1, "key2": 1, "key3": 0 };
        let resultDict = { "key": 1, "key2": 1 }
        const output = getMaxVotes(dict, 1);

        expect(output).toEqual(resultDict);
    });
});

describe("toArray", () => {
    test("Check that the output returns an array", () => {
        const dict = { "key": "val", "key2": "val2" };
        const output = toArray(dict);

        expect(Array.isArray(output)).toBe(true);
    });

    test("Check that all the keys are converted to an array", () => {
        const dict = { "key": "val", "key2": "val2" };
        const arr = ["key", "key2"]
        const output = toArray(dict);

        expect(output).toEqual(arr);
    });
});
