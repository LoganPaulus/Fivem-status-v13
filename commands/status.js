const {MessageEmbed, MessageActionRow, MessageButton} = require ('discord.js')
const Gamedig = require('gamedig');
const fivem = require("discord-fivem-api");
const { statusCommandName } = require('../config.js');
const { statusColor } = require('../config.js');
const { host } = require('../config.js');
const { port } = require('../config.js');
const { statusUrl } = require('../config.js');
const { serverIp } = require('../config.js');
const server = new fivem.DiscordFivemApi(serverIp);
const {SlashCommandBuilder} = require("@discordjs/builders")
module.exports.data = new SlashCommandBuilder()
.setName(statusCommandName)
.setDescription("sends FiveM AOP to Discord(channel)");


module.exports.run = (bot, interaction, options) => {
    Gamedig.query({
        type: 'fivem',
        host: `${host}`, // Server IP here
        port: `${port}` // Server Port here             
      }).then(async(state) => {
        const maxplayers = state.maxplayers;
      server.getPlayers().then((data) => {
        let result  = [];
        let index = 1;
        for (let player of data) {
          result.push(`**${index++}**. ${player.name} | ${player.id} ID\n`);
        }
 let embed = new MessageEmbed()
    .setColor(statusColor)
    .setTitle(`Players currently online (${data.length}/${maxplayers})`)
    .setDescription(result.length > 0 ? result : 'No players online!')
    .setTimestamp();
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setLabel("Connect to the server")
        .setStyle("LINK")
        .setURL(`${statusUrl}`)
   
    )
    return interaction.editReply({
        ephemeral: true,
        embeds: [embed],
        components: [row]
        
   
    }).then(msg => { setTimeout(() => msg.delete(), 10000)})
      })
    
    })
}



