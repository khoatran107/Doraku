const Discord = require('discord.js');
//npm i kitsu.js
const Kitsu = require('kitsu');
const kitsu = new Kitsu();

module.exports.run = async(bot,message,args) =>{
//ID server DNH
	  if(message.guild.id === '420246254254030856'){
//ID channel anime và bot-playground
      if(message.channel.id === '456859356382625793' || message.channel.id === '441184600786731008' ){
	        manga(bot,message,args);
      } else return message.channel.send('Bạn chỉ có thể sử dụng câu lệnh này ở <#456859356382625793> và <#441184600786731008>').then(msg =>{
		        msg.delete(5000);
	    });
    } else manga(bot,message,args);
}
async function manga(bot,message,args){
  const search = args.slice().join(" ");
	if(!search) message.channel.send('Bạn phải nhập tên manga đã :v');
//Tìm kiếm manga
	kitsu.searchManga(search)
		.then(result =>{
			if(result.length === 0) { 
				return message.channel.send('Không tìm thấy manga!');
			}
			let manga = result[0];

			const Membed = new Discord.RichEmbed()
				.setTitle(manga.titles.romaji)
				.setColor('#4d8ff9')
				.setThumbnail(manga.posterImage.original)
				.setDescription(`${manga.synopsis.replace(/<[^>]*>/g, '').split('\n')[0]}`)
				.addField(':flag_jp: Tiêu đề tiếng Nhật: ',manga.titles.japanese,true)
				.addField(':page_with_curl: Thể loại: ',manga.mangaType,true)
				.addField(':watch: Tình trạng: ',`từ **${manga.startDate}** đến **${manga.endDate ? manga.endDate : 'Đang hoàn thành'}**`,true)
				.addField(':newspaper: Số chapter: ',`**${manga.chapterCount ? manga.chapterCount : 'N/A'}**`,true)
				.addField(':books: Số tập: ',`**${manga.volumeCount}**`,true)
				.addField(':arrow_up: Độ tuổi: ',`**${manga.ageRating ? manga.ageRating : 'N/A'}**`,true)
				.addField(':star: Số điểm đánh giá: ',`**${manga.averageRating ? manga.averageRating : 'N/A'}/100**`,true)
				.addField(':trophy: Xếp hạng: ',`**TOP ${manga.ratingRank ? manga.ratingRank : 'N/A'}**`,true)
			message.channel.send(Membed);
		});
		.catch((err)=> {
			console.log(err);
			message.channel.send('Không tìm thấy manga! '); 
		});
}
module.exports.help = {
	name : 'manga',
  category: 'Fun',
  description: "Dùng để lấy thông tin manga cần tìm",
  usage: "do.manga [tên manga]"
}
