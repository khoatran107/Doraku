const Discord = require('discord.js');
module.exports.run = function(bot, message, args) {
     if(!args[0]){
        let help = new Discord.RichEmbed()
          .setAuthor('Danh sách các câu lệnh')
          .setThumbnail(bot.user.avatarURL)
          .setColor('#0066ff')
          .addField('Info',`${bot.commands.filter(cmd => cmd.help.category === 'Info').map(cmd => `\`${cmd.help.name}\``).join(" ")} `)
          .addField('Fun',`${bot.commands.filter(cmd => cmd.help.category === 'Fun').map(cmd => `\`${cmd.help.name}\``).join(" ")} `)
          .setFooter('Để kiểm tra công dụng của từng câu lệnh, sử dụng do.help <tên câu lệnh>')
        message.channel.send(help);
     } else {
         try {
        let command = bot.commands.filter(cmd => cmd.help.name === args[0]).map(cmd => `${cmd.help.name}`);
        let description = bot.commands.filter(cmd => cmd.help.name === args[0]).map(cmd => `\`${cmd.help.description}\``);
        let usage = bot.commands.filter(cmd => cmd.help.name === args[0]).map(cmd => `\`${cmd.help.usage}\``);
        let help = new Discord.RichEmbed()
          .setTitle(`Câu lệnh: ${command}`)
          .setColor('#0066ff')
          .setFooter('Không bao gồm các kí tự [] có trong usage')
          .addField(`Tác dụng: `,description)
          .addField(`Cách sử dụng `,usage)
        message.channel.send(help);
        } catch(e){
            message.channel.send('Không tìm thấy câu lệnh!');
        }
     }
}
module.exports.help = {
    name : "help"
}
