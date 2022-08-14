const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const translate = require("google-translate-api-x");
const { getCode } = require("../../misc/languages.js");

// Command to translate a users input
module.exports = {
    data: new SlashCommandBuilder()
        .setName("translate")
        .setDescription("Translates a word or sentence")
        .addStringOption(option =>
            option.setName("text")
                .setDescription("The input to translate")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("origin")
                .setDescription("The language to translate from")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("target")
                .setDescription("The language to translate to")
                .setRequired(true)),
    async execute(interaction, client) {
        client.log.interinfo(`${interaction.user.tag} used the /translate command in #${interaction.channel.name}`);

        const text = interaction.options.getString("text"); // Get the text to be translated from user input

        // Get the languages to be used from user input
        // Use getCode to convert the input languages into their ISO 639-1 codes
        const origin = getCode(interaction.options.getString("origin"));
        const target = getCode(interaction.options.getString("target"));

        if (origin === false || target === false) { // If either the origin or target language doesn't return an ISO 639-1 code
            await interaction.reply({ content: "One or both of the languages you entered are not supported.\n Please see https://github.com/campanula/game-dev-soc-bot/blob/main/src/misc/languages.js for supported languages.", ephemeral: true });
        } else {
            try {
                // Translate the text from origin to target language using autocorrect
                const res = await translate(text, { from: origin, to: target, autoCorrect: true });

                // If autocorrected text exists return it, else return normal text
                let input = null;
                res.from.text.value.length === 0 ? input = text : input = res.from.text.value;

                const translation_Embed = new EmbedBuilder()
                    .setTitle("Translation")
                    .setDescription(`Translating ${input} from ${res.from.language.iso}...\n\nResult: ${res.text}`)
                    .setColor("#5865F2")
                    .setTimestamp()
                    .setFooter({
                        text: `Triggered by ${interaction.user.tag}`
                    })

                await interaction.reply({ embeds: [translation_Embed] });
            } catch (error) {
                client.log.error(error);
                await interaction.reply({ content: "The API could not process this request", ephemeral: true });
                throw error;
            }
        }
    }
};
