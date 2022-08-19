const { validUrl } = require("../functions/misc-functions/checkURL.js");

describe("validUrl", () => {
    test("Will return false - no protocol", () => {
        const url = "github.com";
        const output = validUrl(url);

        expect(output).toEqual(false);
    });

    test("Will return false - invalid site address", () => {
        const url = "https://jestjs.io/";
        const output = validUrl(url);

        expect(output).toEqual(false);
    });

    test("Will return true - https://github.com", () => {
        const url = "https://github.com";
        const output = validUrl(url);

        expect(output).toEqual(true);
    });

    test("Will return true - https://campanula.itch.io", () => {
        const url = "https://campanula.itch.io";
        const output = validUrl(url);

        expect(output).toEqual(true);
    });

    test("Will return true - https://gamejolt.com", () => {
        const url = "https://gamejolt.com";
        const output = validUrl(url);

        expect(output).toEqual(true);
    });

    test("Will return true - http://github.com", () => {
        const url = "http://github.com";
        const output = validUrl(url);

        expect(output).toEqual(true);
    });

    test("Will return true - http://campanula.itch.io", () => {
        const url = "http://campanula.itch.io";
        const output = validUrl(url);

        expect(output).toEqual(true);
    });

    test("Will return true - http://gamejolt.com", () => {
        const url = "http://gamejolt.com";
        const output = validUrl(url);

        expect(output).toEqual(true);
    });
});
