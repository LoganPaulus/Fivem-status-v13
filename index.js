const Discord = require ('discord.js')
const bot = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILDS]})
const fs = require("fs"); 
const fivem = require("discord-fivem-api"); 
const server = new fivem.DiscordFivemApi('65.108.4.221:30183');
const Gamedig = require('gamedig'); 
const { token } = require('./config.js');
const { channel } = require('diagnostics_channel');
const { host } = require('./config.js');
const { port } = require('./config.js');
const { GuildId } = require('./config.js');
const { AopChannelId } = require('./config.js');
const { PlayerCountChannelId } = require('./config.js');
let commands = require("./slash-commands").commands;
require("./slash-commands")()

bot.on('ready', () => {
    bot.user.setStatus('dnd')
    console.log('Bot is now online')
   
})

bot.on("interactionCreate",  async interaction =>{
  if(!interaction.isCommand()) return;
  
  let name = interaction.commandName;
  let options = interaction.options;

  let CommandMethod = commands.get(name);
  if(!CommandMethod) return;
  await interaction.deferReply();

  CommandMethod.run(bot, interaction, options)


})
bot.on('ready', () => {
   
  
  setInterval(() => {
    Gamedig.query({
      type: 'fivem',
      host: `${host}`,
      port: `${port}`,
    })
      .then((updatedState) => {
        state = updatedState;

        const joueursmax = state.maxplayers;
        const joueurs = state.players.length;

        bot.user.setActivity(`${joueurs}/${joueursmax} Players`);
      })
      .catch((e) => {
        console.log(e);
      });
  }, 6000);
});

bot.on("ready", () => {
  const guild = bot.guilds.cache.get(`${GuildId}`);
Gamedig.query({
  type: 'fivem',
  host: `${host}`, 
  port: `${port}` 
}).then(async(state) => {
 setInterval(() => {
 
      const channel = guild.channels.cache.get(`${AopChannelId}`)
      channel.setName(`Current AOP: ${state.map}`)
  }, 300000);
    
}).catch(async(err) => {
 return console.log("The server is offline or something broke")
})
})

bot.on('ready', () => {
  setInterval(() => {
    Gamedig.query({
      type: 'fivem',
      host: `${host}`, 
      port: `${port}` 
    }).then(async(state)  => {
       
        const maxplayers = state.maxplayers;
        const players = state.players.length;
      
      
        bot.channels.cache.get(`${PlayerCountChannelId}`).setName(`Players online: ${players}/${maxplayers}`) 
      })
      .catch((e) => {
        console.log(e);
      });
  }, 300000);
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7

bot.login(token)