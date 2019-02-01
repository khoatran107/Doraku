module.exports.run = function() {
    message.channel.sendMessage("My prefix is ``do.``");
}
module.exports.help = {
    name : "prefix",
    category: 'Fun',
    description: 'Cho bạn biết prefix của Doraku Bot',
    usage: 'do.prefix'
}
