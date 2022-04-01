const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token } = require('./config.js');
const { GuildId } = require('./config.js');
const { ClientId } = require('./config.js');
const fs = require('fs');
const commands = [];
const CommandList = new Map();
module.exports = (updateCommands) => {
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// Place your client and guild ids here
const clientId = `${ClientId}`;
const guildId = `${GuildId}`;
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
	CommandList.set(command.data.name, command)
}
const rest = new REST({ version: '9' }).setToken(token);
if(updateCommands) {
	(async () => {
		try {
			console.log('Started refreshing application (/) commands.');
			
		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);
	
			console.log('Successfully reloaded application (/) commands.');
		} catch (error) {
			console.error(error);
		}
	})();

}

}

module.exports.commands = CommandList;
