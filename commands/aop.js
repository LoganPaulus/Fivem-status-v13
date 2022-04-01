const {MessageEmbed, MessageActionRow, MessageButton} = require ('discord.js')
const Gamedig = require('gamedig');
const { aopCommandName } = require('../config.js');
const { aopColor } = require('../config.js');
const { host } = require('../config.js');
const { port } = require('../config.js');
const { aopUrl } = require('../config.js');
const {SlashCommandBuilder} = require("@discordjs/builders")
module.exports.data = new SlashCommandBuilder()
.setName(aopCommandName)
.setDescription("sends FiveM AOP to Discord(channel)");
module.exports.run = (bot, interaction, options) => {
  Gamedig.query({
        type: 'fivem',
        host: `${host}`, 
        port: `${port}` // Server Port here              
    }).then(async(state) => {

 let embed = new MessageEmbed()
    .setDescription(`The current AOP is ${state.map}`)
    .setColor(aopColor) 
    .setTimestamp();
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setLabel("Connect to the server")
        .setStyle("LINK")
        .setURL(`${aopUrl}`)
   
    )
    return interaction.editReply({
        ephemeral: true,
        embeds: [embed],
        components: [row]
        
   
    }).then(msg => { setTimeout(() => msg.delete(), 10000)})
      })
    
}



