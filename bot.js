const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const fs = require("fs");
const bad_words_file = require('./badwords.json');
const hit = require('./hitdrama');
let bad_words = bad_words_file.bad_words;
const prefix = botSettings.prefix;

const bot = new Discord.Client({disableEveryone : true});
bot.commands = new Discord.Collection();

require("dotenv/config");

fs.readdir ("./commands/", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log("Khong co lenh nao heeeet !");
        return;
    }

    console.log(`Dang tai ${jsfiles.length} lenh`);

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i+1}: ${f} da xong`);
        bot.commands.set(props.help.name, props);
    })
});
bot.on("ready", async () => {
    console.log(`Bot is ready ! ${bot.user.username}`);
    try{
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    }catch(e) {
        console.log(e.stack);
    }
    
});
bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    
    ///////////////////////////////////////////////
    let tmsg = " " + message.content.toLowerCase() + " ";
    tmsg = tmsg.replace(/[`~!@#$%^&*()_|+\-=÷¿?;:'",.<>\{\}\[\]\\\/]/gi, ' ');
    if ((args.length===0)&&((tmsg.includes(' dm '))||(tmsg.includes(' đù ')))) {
        send_noti(message);
        return;
    }
    for (let i = 0; i< bad_words.length; i++) {
        if (tmsg.includes(' '+bad_words[i]+' ') || tmsg.includes('dmdm')) {
            send_noti(message);
            return;
        }
    }
    
    /////////////////////////////////////////////////
    hit.run(bot, message, args);
    if (!command.startsWith(prefix)) return;
    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot, message, args);

});

bot.login(process.env.token);

function send_noti(message) {
    let ntfct1 = new Discord.RichEmbed()
        .setColor("#ff463d")
        .setDescription(`Đề nghị các mod xử lí thành viên <@${message.author.id}> vì đã có hành vi nói tục !!`)
        .addField("Lý do : ", `<@${message.author.id}> đã nói : "${message.content}"`)
        .addField("Thời gian : ", `${message.createdAt}`);
    message.channel.sendEmbed(ntfct1);
    message.react("🏴");
    return;
}
