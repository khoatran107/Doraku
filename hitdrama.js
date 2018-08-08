module.exports.run = function() {
    if (message.content.toLowerCase().includes('drama'))
        message.channel.send(`Hít hà, hít hà \:joy:`);
    if (message.content.toLowerCase().includes('hóng')) 
        message.channel.send(`Chúng ta cùng hóng drama nào \:grin:`);
}