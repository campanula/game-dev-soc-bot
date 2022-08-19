const { getCode } = require("../functions/misc-functions/languages.js");

describe("getCode", () => {
    test("Will return false as it doesn't match a ISO 639-1 code", () => {
        const lang = "JDKJDJ";
        const output = getCode(lang);

        expect(output).toEqual(false);
    });

    test("Will return output as a lowercase string", () => {
        const lang = "English";
        const output = getCode(lang);

        expect((output) === output.toLowerCase());
        expect(typeof output === "string");
    });

    test("Will return the ISO 639-1 code of the language", () => {
        const lang = "English";
        const output = getCode(lang);

        expect((output) === output.toLowerCase());
        expect(output).toEqual("en");
    });
});
