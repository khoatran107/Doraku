const { vehinhvuong } = require("./../vehinhvuong");
const Discord = require('discord.js');
module.exports.run = function(bot, message, args) {
    if (args.length>1) {
        wrongCmd();
        return;
    } else if (args.length===0) {
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.username)
            .setColor("#3d87ff")
            .addField("Tên người dùng : ", `${message.author.username}#${message.author.discriminator}`)
            .addField("Mã số :", `${message.author.id}`)
            .addField("Tạo tài khoản lúc : ", `${message.author.createdAt}`)
            .addField("Trạng thái : ", `${message.author.presence.status}` );
        message.channel.sendEmbed(embed);
        return;
    }
    let usermention = message.guild.member(message.mentions.users.first());
    if (usermention){
        let embed = new Discord.RichEmbed()
            .setAuthor(usermention.user.username)
            .setColor("#3d87ff")
            .addField("Tên người dùng : ", `${usermention.user.username}#${usermention.user.discriminator}`)
            .addField("Mã số : ", `${usermention.user.id}`)
            .addField("Tạo tài khoản lúc : ", `${usermention.user.createdAt}`)
            .addField("Trạng thái : ", `${usermention.user.presence.status}`);
        message.channel.sendEmbed(embed);
        return;
    } else{
        wrongCmd();
        return;
    }
}
module.exports.help = {
    name : "userinfo"
}
function wrongCmd() {
    let noti = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor("#3d87ff")
        .addField(`Bạn đang dùng command này sai cách,`, `Hướng dẫn :`)
        .addField("Cách dùng chính xác :", `=)info để biết thông tin chính mình hoặc =)info <tag\_một\_người>`)
        .addField("Ví dụ :", `=)profile @Kuroemon#3193`);
    message.channel.sendEmbed(noti);
}
