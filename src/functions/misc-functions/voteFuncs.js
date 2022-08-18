// https://stackoverflow.com/questions/60105631/top-highest-values-in-an-object-more-if-there-are-more-max-values-and-they-are
function getMaxVotes(o, n) { // Get all max values from dictionary
    // Get object values and sort descending
    const values = Object.values(o).sort((a, b) => b - a);

    // Check if more values exit than number required
    if (values.length <= n) return o;

    // Find nth maximum value
    const maxN = values[n - 1];

    // Filter object to return only key/value pairs where value >= maxN
    return Object.entries(o)
        .reduce((o, [k, v]) => v >= maxN ? { ...o, [k]: v } : o, {});
}

function toArray(dict) {
    const arr = [];
    for (const key in dict) {
        arr.push(key);
    }
    return arr;
}

module.exports = { toArray, getMaxVotes }