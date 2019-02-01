const { vetamgiac } = require("./../vetamgiac");
const { vehinhvuong } = require("./../vehinhvuong");
module.exports.run = async function(bot, message, args) {
    let hd;
    let rong = parseInt(14);
    if (args.length > 0) rong = parseInt(args[0], 10);
    if (isNaN(rong) || rong > 14 || rong <= 0) {
        hd=args[0].toLowerCase();
        rong = parseInt(14);
    }
    let mynewmsg = "";
    if (args.length > 1) 
        hd = args[1].toLowerCase();
    if (hd === "square"){
        mynewmsg = vehinhvuong("😂", rong);
    }
    else if (hd === "triangle") {
        mynewmsg = vetamgiac("😂", rong);
    } else mynewmsg = vehinhvuong("😂", rong);
    message.channel.send(mynewmsg);
}
module.exports.help = {
    name : "cuoi",
    category: 'Fun',
    description: 'Dùng để cười :joy:',
    usage: 'do.cuoi'
}
