const { vetamgiac } = require("./../vetamgiac");
const { vehinhvuong } = require("./../vehinhvuong");
module.exports.run =  async function(bot, message, args) {
    let nhap = message.mentions.users;
    let nhungnguoibiluom = [];
    nhap.forEach(function(user) {
        nhungnguoibiluom.push(user.id);
    });
    let caunoi = "";
    if (nhungnguoibiluom.length>0) {
        caunoi = `Ahihi, <@${message.author.id}> đang lườm `;
        //nguoi bi luom
        for (let j = 0; j < nhungnguoibiluom.length; j++) {
            caunoi += `<@${nhungnguoibiluom[j]}>`;
            if (nhungnguoibiluom.length > 1 && j < nhungnguoibiluom.length-2) {
                caunoi += ", ";
            }
            else if (j === nhungnguoibiluom.length-2 && nhungnguoibiluom.length) {
                caunoi += " và ";
            }
        }
        caunoi += ` kìa :"> \n\n`;
    }
    else caunoi = `Lườm ai đó hộ <@${message.author.id}> :grimacing: \n\n`;
    
    let hd; //hinh dang :v
    let rong = parseInt(14);
    if (args.length > 0) rong = parseInt(args[0], 10);
    if (isNaN(rong) || rong > 14 || rong <= 0) {
        hd=args[0].toLowerCase();
        rong = parseInt(14);
    }
    let mynewmsg = caunoi;
    if (args.length > 1 && !args[1].includes('@')) 
        hd = args[1].toLowerCase();
    if (hd === "square"){
        mynewmsg = vehinhvuong("😒", rong);
    }
    else if (hd === "triangle") {
        mynewmsg = vetamgiac("😒", rong);
    } else {
        if (nhungnguoibiluom.length>1)
        mynewmsg = vehinhvuong("😒", 12);
        else mynewmsg = vehinhvuong("😒", rong);
    }
    message.channel.send(caunoi + mynewmsg);
}
module.exports.help = {
    name : "luom"
}

