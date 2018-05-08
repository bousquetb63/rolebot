const Discord = require('discord.js');
const settings = require('./settings.json');
const bot = new Discord.Client({disableEveryone: true});
bot.on('ready', async () => {
  console.log(`${bot.user.username} is Reporting for duty!`);
  bot.user.setActivity(`!roles for list of roles`)
  try {
      let link = await bot.generateInvite(["ADMINISTRATOR"]);
      console.log(link);
  } catch(e) {
      console.log(e.stack);
  }
});

bot.on('message', message => {
    if (message.channel.type === 'dm' || !message.content.includes('!')) return;
    let gamerRole = message.guild.roles.find("name", "Gamers");
    let cryptoRole = message.guild.roles.find("name", "Crypto");
    var splitCMD = message.content.split('!');
    if (message.member.roles.has(gamerRole.id) || message.member.roles.has(cryptoRole.id)) {
        if (message.content.includes("gamer") || message.content.includes("crypto")) {
            message.reply("You have already picked a role!");
            return;
        }
    }
    switch (splitCMD[1]) {
        case "roles":
            message.reply('Use !gamer or !crypto to be assigned a role.');
            return;
        case "gamer":
            message.reply('You have been given the gamer role!');
            message.guild.member(message.author).addRole(gamerRole);
            return;
        case "crypto":
            message.reply('You have been given the crypto role!');
            message.guild.member(message.author).addRole(cryptoRole);
            return;
        default:
            return;
    }
});
// login bot with token
bot.login(settings.secret.botToken);