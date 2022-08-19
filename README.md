# game-dev-soc-bot

Multipurpose game-jam hosting bot for the Game Dev Society Discord server

# Setting up the bot

- Download the repo
- Create an .env file in the root directory and add the applications client ID (as APP_ID) and token (as TOKEN) to it
- Create a config.json file in /src, and add the guild ID as guildID, and the ID of the welcome channel as channelID
- Then run the bot!

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

- signup: Access a form within Discord to sign up to the current game jam
- submit [submission] [team]: Submits a game jam entry to the list. Only allows submission URL's from the sites https://github.com, https://itch.io, and https://gamejolt.com
- submissions: Prints the current list of submissions

#### Admin only

- remove-submission [team]: Removes a submission if the team exists in the current list of submissions
- clear-submissions: Clears the submissions list
- vote: Starts a reaction-based vote with all the current submissions, printing the results and winner after 15 minutes
- winner: Prints the last game jam winner

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

# Logging

All logging is done using Winston, and can be seen in the terminal. All logs relating to the process are logged as process, logs relating to interactions are logged as interinfo, while logs relating to the bots main functions are logged as botinfo.<br>
For easy access to any errors, all error messages are logged both in the terminal and saved in a file as src/txt/logs/error_logs.log. Logs relating specifically to the process are saved in a file as src/txt/logs/process_logs.log.

# Updating commands and their info

**Help, I'm hosting the bot and need to update its info!**<br>
All variables and info subject to changing often are stored in text files to make changing them easier without having to hardcode them in.

#### Events

To change the info fields printed by the /events command, go to events.txt under src/txt/info/events.txt. The field contents are stored as a dictionary. <br>
To change the name of a field, change the key of the dictionary. To change the main contents (the value option) of a field, change the value of the dictionary. <br>
To add a new field to the command, just add a new entry to the dictionary.

#### Current Jam

To change the name of the current jam printed by commands, go to currentJam.txt under src/txt/jam-misc/currentJam.txt. The variable is stored as a string. <br>
To change the variable, just replace the string in the file with whatever the current jam is called.
