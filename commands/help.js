const Discord = require('discord.js');
module.exports.run = function(bot, message, args) {
    let newms = new Discord.RichEmbed()
        .setColor("#3d87ff")
        .addField("info : ", `Hiện thông tin người dùng của bạn, nếu tag ai vào thì sẽ hiện thông tin người đó`)
        .addField("ping : ", `Chỉ là chơi`)
        .addField("prefix : ", `Cho bạn biết prefix của Conan Bot`)
        .addField("help : ", `Yêu cầu trợ giúp về bot này :grin:` )
        .addField("say : ", `Yêu cầu bot nói điều gì đó ` )
        .addField("luom : ", `Dùng để lườm ai đó :"> `)
        .addField("cuoi : ", `Dùng để cười :joy:`)
        .addField("love : ", `Dùng để thể hiện tình cảm của bạn với người khác :)`)
        .addField("Một khi bạn nói tục bạn sẽ bị mách với các mod :grin: ", `Hết`);
    
    if (args.length>0){
        newms.addField("Bạn đang dùng command này sai đấy nhé !!");
    }
    message.channel.sendEmbed(newms);
}
module.exports.help = {
    name : "help"
}
