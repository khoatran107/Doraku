const Discord = require('discord.js');
const bad_words_file = require('./badwords.json');
const bad_words = bad_words_file.bad_words;
module.exports.run = function(bot, message, args) {
    let tmsg = message.content.toLowerCase();
    for (let i = 0; i< bad_words.length; i++) {
        if (tmsg.includes(' '+bad_words[i]+' ') || tmsg.includes('dmdm')) {
            let ntfct = new Discord.RichEmbed()
                .setColor("#ff463d")
                .setDescription(`Đề nghị các mod xử lí thành viên <@${message.author.id}> vì đã có hành vi nói tục !!`)
                .addField("Lý do : ", `<@${message.author.id}> đã nói : "${message.content}"`)
                .addField("Thời gian : ", `${message.createdAt}`);
            message.channel.sendEmbed(ntfct);
            message.react("🏴");
        }
    }
    if ((args.length===0)&&((tmsg.includes(' dm '))||(tmsg.includes(' đù ')))) {
        let ntfct1 = new Discord.RichEmbed()
            .setColor("#ff463d")
            .setDescription(`Đề nghị các mod xử lí thành viên <@${message.author.id}> vì đã có hành vi nói tục !!`)
            .addField("Lý do : ", `<@${message.author.id}> đã nói : "${message.content}"`)
            .addField("Thời gian : ", `${message.createdAt}`);
        message.channel.sendEmbed(ntfct1);
        message.react("🏴");
    }
}