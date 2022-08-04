const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildId: String,
    theme: String,
});

module.exports = mongoose.model[("Theme", themeSchema, Themes)];
