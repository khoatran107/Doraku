const Discord = require('discord.js');
//npm i kitsu.js
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();

module.exports.run = async(bot,message,args) =>{
//ID server DNH
	  if(message.guild.id === '420246254254030856'){
//ID channel anime và bot-playground
      if(message.channel.id === '456859356382625793' || message.channel.id === '441184600786731008' ){
	        anime(bot,message,args);
      } else return message.channel.send('Bạn chỉ có thể sử dụng câu lệnh này ở <#456859356382625793> và <#441184600786731008>').then(msg =>{
		        msg.delete(3000);
	  });
    } else anime(bot,message,args);
}
async function anime(bot,message,args){
  const search = args.slice().join(" ");
	if(!search) message.channel.send('Bạn phải nhập tên anime đã :v');
//Tìm kiếm anime
	kitsu.searchAnime(search)
		.then(result =>{
			if(result.length === 0) { 
				return message.channel.send('Không tìm thấy anime cần tìm!');
			}
			let anime = result[0];

			const embed = new Discord.RichEmbed()
				.setTitle(anime.titles.romaji)
				.setColor('#4d8ff9')
				.setThumbnail(anime.posterImage.original)
				.setDescription(`${anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0]}`)
				.addField(':flag_jp: Tiêu đề tiếng Nhật: ',anime.titles.japanese,true)
				.addField(':page_with_curl: Thể loại: ',anime.showType,true)
				.addField(':watch: Tình trạng: ',`từ **${anime.startDate}** đến **${anime.endDate ? anime.endDate : 'Đang hoàn thành'}**`,true)
				.addField(':dvd: Số tập: ',`**${anime.episodeCount ? anime.episodeCount : 'N/A'}**`,true)
				.addField(':arrow_up: Độ tuổi: ',`**${anime.ageRating ? anime.ageRating : 'N/A'}**`,true)
				.addField(':star: Số điểm đánh giá: ',`**${anime.averageRating ? anime.averageRating : 'N/A'}/100**`,true)
				.addField(':trophy: Xếp hạng: ',`**TOP ${anime.ratingRank ? anime.ratingRank : 'N/A'}**`,true)
			message.channel.send(embed);
		})
		.catch((err)=> {
			console.log(err);
			message.channel.send('Không tìm thấy anime! '); 
		});
}
module.exports.help = {
	name : 'anime',
  category: 'Fun',
  description: "Dùng để lấy thông tin anime cần tìm",
  usage: "do.anime [tên anime]"
}
