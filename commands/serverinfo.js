const Discord = require('discord.js')
module.exports.run = function(bot, message, args) {
    let info = new Discord.RichEmbed()
        .setAuthor(message.guild.name)
        .addField("Name : ", message.guild.name, true)
        .addField("ID : ", message.guild.id, true)
        .addField("Owner : ", `<@${message.guild.owner.id}>`, true)
        .addField("Roles : ", message.guild.roles.size)
        .addField("Members : ", message.guild.memberCount)
        .setThumbnail(message.guild.iconURL);
    message.channel.send(info);
}
module.exports.help = {
    name : "serverinfo"
}