const Discord = require('discord.js');
const settings = require('./settings.json');
const bot = new Discord.Client({disableEveryone: true});
const prefix = '!';
bot.on('ready', async () => {
  console.log(`${bot.user.username} is Reporting for duty!`);
  bot.user.setActivity(`${prefix}help for list of cmds`)
  try {
      let link = await bot.generateInvite(["ADMINISTRATOR"]);
      console.log(link);
  } catch(e) {
      console.log(e.stack);
  }
});

bot.on('message', message => {
	if (message.channel.type === 'dm') return;
    if (message.content.includes(prefix + 'gamer')){
        let gamerRole = message.guild.roles.find("name", "Gamer");
        let cryptoRole = message.guild.roles.find("name", "Crypto");
        if(!message.member.roles.has(gamerRole.id) && !message.member.roles.has(cryptoRole.id)){
            message.reply('You have been given crypto role!');
			message.guild.member(message.author).addRole(message.guild.roles.find("name", "Gamer"));
        }
    } else if (message.content.includes(prefix + 'crypto')){
        let gamerRole = message.guild.roles.find("name", "Gamer");
        let cryptoRole = message.guild.roles.find("name", "Crypto");
        if(!message.member.roles.has(gamerRole.id) && !message.member.roles.has(cryptoRole.id)){
            message.reply('You have been given gamer role!');
			message.guild.member(message.author).addRole(message.guild.roles.find("name", "Crypto"));
        }
    }
});
// login bot with token
bot.login(settings.secret.botToken);