const Discord = require('discord.js');
//npm i node-osu
const node_osu = require('node-osu');
require("dotenv/config");
const osu_api = process.env.osu_api_key;

const api = new node_osu.Api(osu_api,{
	  notFoundAsError: true,
    completeScores: false 
});

module.exports.run = async(bot,message,args) =>{
  if(message.guild.id === '420246254254030856'){
      if(message.channel.id === '456859356382625793' || message.channel.id === '473725146067238952' ){
	        osu(bot,message,args);
      } else return message.channel.send('Bạn chỉ có thể sử dụng câu lệnh này ở <#456859356382625793> và <#473725146067238952>').then(msg =>{
		        msg.delete(3000);
	     });
    } else osu(bot,message,args);
}

async function osu(bot,message,args) {
  let username = args[0];

	if(!args[0]) return message.channel.send('Bạn phải nhập tên người chơi đã :3').then(msg =>{
		msg.delete(3000);
	});

	api.getUser({u: username}).then(user =>{
		let flag = String(user.country).toLowerCase();
		const OsuEmbed = new Discord.RichEmbed()
			.setTitle('Tìm kiếm thông tin người chơi')
			.setThumbnail(`http://s.ppy.sh/a/${user.id}}`)
			.setColor("#f442ce")
			.addField(':large_blue_diamond: Nickname: ',user.name,true)
			.addField(':large_blue_diamond: PP: ',Math.round(user.pp.raw),true)
			.addField(':large_blue_diamond: Rank: ',user.pp.rank,true)
			.addField(':large_blue_diamond: Level: ',Math.round(user.level),true) 
			.addField(`:large_blue_diamond: Quốc gia: `,`:flag_${flag}:`,true)
			.addField(`:large_blue_diamond: Rank :flag_${flag}: :`, `${user.pp.countryRank}`,true)
			.addField(':large_blue_diamond: Số lần chơi: ',user.counts.plays,true)
			.addField(':large_blue_diamond: Độ chính xác: ',user.accuracyFormatted,true);
		message.channel.send(OsuEmbed);
	});
}
module.exports.help ={
	name: 'osu',
  category: 'Search',
  description: "Dùng để lấy thông tin của người chơi trong osu",
  usage: "do.osu [tên người chơi]"
}
