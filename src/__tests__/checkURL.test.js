const { validUrl } = require("../functions/misc-functions/checkURL.js");

describe("validUrl", () => {
    test("Will return false - no protocol", () => {
        let url = "github.com";
        const output = validUrl(url);

        expect(output).toEqual(false);
    });

    test("Will return false - invalid site address", () => {
        let url = "https://jestjs.io/";
        const output = validUrl(url);

        expect(output).toEqual(false);
    });

    test("Will return true - https://github.com", () => {
        let url = "https://github.com";
        const output = validUrl(url);

        expect(output).toEqual(true);
    });

    test("Will return true - https://campanula.itch.io", () => {
        let url = "https://campanula.itch.io";
        const output = validUrl(url);

        expect(output).toEqual(true);
    });

    test("Will return true - https://gamejolt.com", () => {
        let url = "https://gamejolt.com";
        const output = validUrl(url);

        expect(output).toEqual(true);
    });

    test("Will return true - http://github.com", () => {
        let url = "http://github.com";
        const output = validUrl(url);

        expect(output).toEqual(true);
    });

    test("Will return true - http://campanula.itch.io", () => {
        let url = "http://campanula.itch.io";
        const output = validUrl(url);

        expect(output).toEqual(true);
    });

    test("Will return true - http://gamejolt.com", () => {
        let url = "http://gamejolt.com";
        const output = validUrl(url);

        expect(output).toEqual(true);
    });
});
