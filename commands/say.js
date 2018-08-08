const Discord = require('discord.js');
module.exports.run = function (bot, message, args) {
    let says = new Discord.RichEmbed()
        .setColor("#3d87ff")
        .addField(message.author.username,`${message.content.substring(6)}`);
    message.channel.sendEmbed(says);
}
module.exports.help = {
    name: "say"
}