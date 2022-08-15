function validUrl(string) {
    let url = null;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    // Only allow urls including these domains
    // There's probably more infallible ways of doing this, but the submissions are person-moderated anyway
    if (string.includes("github.com") || string.includes("itch.io") || string.includes("gamejolt.com")) {
        return url.protocol === "http:" || url.protocol === "https:";
    }

    return false;
}

module.exports = { validUrl }
