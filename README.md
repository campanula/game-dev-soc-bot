# game-dev-soc-bot

Multipurpose game-jam hosting bot for the Game Dev Society Discord server

# Setting up the bot

- Download the repo
- Create an .env file in the root directory and add the applications client ID (as APP_ID) and token (as TOKEN) to it
- Create a config.json file in /src, and add the guild ID as guildID, and the ID of the welcome channel as channelID
- Then run the bot! Note that command permissions are **currently controlled using server settings** on the Discord app, so to make sure they're set up how you want them, go to Server Settings -> Integrations -> Bots and Apps -> [Your Application Name] -> Manage - > Command Permissions

# Features

A list of all current bot features

## Game Jam commands

### Theme commands

These commands are for adding theme ideas to a list to be chosen from every game jam.

- add-theme [input]: Adds a theme to the list
- themes: Prints the current list of themes

#### Admin only

- choose-theme: Chooses a theme from the list
- remove-theme [input]: Removes the inputted theme from the list
- clear-themes: Clears the themes list

### Submission commands

These commands are for submitting entries for a game jam, and voting for those submissions.

- submit [submission] [team]: Submits a game jam entry to the list. Only allows submission URL's from the sites https://github.com, https://itch.io, and https://gamejolt.com
- submissions: Prints the current list of submissions
- winner: Prints the last game jam winner

#### Admin only

- remove-submission [team]: Removes a submission if the team exists in the current list of submissions
- clear-submissions: Clears the submissions list
- vote: Starts a reaction-based vote with all the current submissions, printing the results and winner after 15 minutes

## Info commands

These commands contain general information about the bot/society/user.

- help: Sends a message with a menu to access info about all commands
- ping: Sends a message with the bot's current uptime, latency, and the API latency
- info society: Sends a message with info about the society
- info bot: Sends a message with info about the bot
- info user | info user [target]: Sends a message with general info about either the user who used the command, or the targeted user. The [target] option is optional.
- events: Sends a message about the society's current events

## Fun commands

- avatar | avatar [user]: Sends a message with the avatar of either the user who used the command, or the targeted user. The [target] option is optional.
- congrats [user]: Sends a message congratulating the targeted user.
- translate [text] [origin] [target]: Translates a piece of text from its origin language to a target language. Can only translate to languages from the Google Translate API.
