const Discord = require('discord.js');
//npm i superagent
const superagent = require('superagent');
const reaction_numbers = [":zero:",":one:",":two:",":three:",":four:",":five:", ":six:",":seven:",":eight:",":nine:",":keycap_ten:"];
const trust_level = ['New','Basic','Member','Regular','Leader'];

module.exports.run = async(bot,message,args) =>{
    if(!args[0]) return message.channel.send('Bạn phải nhập link đã!');
    //Tìm kiếm theo link (hoặc theo tên)
    if(args[0] === 'search') {
      try{
        let search = encodeURIComponent(args.join(' ').slice(6));
        let index = 0; 
        let body = await superagent
          .get(`https://daynhauhoc.com/search.json?q=${search}`);
        let data = JSON.parse(body.text);
        let embed = new Discord.RichEmbed()
          .setTitle('Chọn các topic sau (bạn hãy chọn các số từ 1-5 để tiếp tục)')
          .setFooter('Bạn có 20 giây để lựa chọn')
        for(let i=0;i<5;i++){
          embed.addField(`${reaction_numbers[++index]} ${data.topics[i].title.replace(/<[^>]*>/g, '').split('\n')[0]} (ID: ${data.topics[i].id})`,'--------');
        }
        message.channel.send(embed).then(msg =>{
            msg.delete(21000);
        });
        try {
                var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 6, {
                    maxMatches: 1,
                    time: 20000,
                    errors: ['time']
                });
              } catch (err) {
                    console.error(err);
                    return message.channel.send('Bạn đã không nhập kết quả, hủy lựa chọn!');
        } 
        const num = parseInt(response.first().content);
        DNH(message,`https://daynhauhoc.com/t/${data.topics[num-1].id}`);
      } catch(e) {
        console.log(e);
        message.channel.send('Không tìm thấy kết quả!');
      }
     //Tìm kiếm người dùng
    } else if(args[0] === 'user') {
      try{
        if(!args[1]) return message.channel.send('Bạn phải nhập username đã!'); 
        let username = args.join(' ').slice(5);
        //console.log(username);
        let {body} = await superagent 
            .get(`https://daynhauhoc.com/u/${username}.json`);
        let avatar = body.user.avatar_template.replace('{size}','360');
        //console.log(avatar);
        let lpost = body.user.last_posted_at.split('T');
        let lseen = body.user.last_seen_at.split('T');
        let joined = body.user.created_at.split('T');
        let embed = new Discord.RichEmbed()
            .setColor('#56afe2')
            .setAuthor(body.user.username)
            .setThumbnail(`https://daynhauhoc.com${avatar}`)
            .addField('❯ Name:',body.user.name)
            .addField('❯ ID:',body.user.id)
            .addField('❯ Location:',body.user.location)
            .addField('❯ Joined: ',`${joined[0]} (${joined[1].substring(0,joined[1].length-5)})`)
            .addField('❯ Last post: ',`${lpost[0]} (${lpost[1].substring(0,lpost[1].length-5)})`)
            .addField('❯ Last Seen: ',`${lseen[0]} (${lseen[1].substring(0,lseen[1].length-5)})`)
            .addField('❯ Views: ',body.user.profile_view_count)
            .addField('❯ Trust level: ',trust_level[body.user.trust_level])
            .addField('❯ Badges: ',body.user.badge_count)
        return message.channel.send(embed);
      } catch(e) {
          console.log(e);
          message.channel.send('Không tìm thấy thành viên đó!');
      }   
     //Kiểm tra top topics
    } else if(args[0] === 'daily'){
        top(message,'daily',5);
    } else if(args[0] === 'week'){
        top(message,'weekly',10);
    } else if(args[0] === 'month'){
        top(message,'monthly',10);
    } else if(args[0] === 'quarter'){
        top(message,'quarterly',10);
    } else if(args[0] === 'year'){
        top(message,'yearly',10);
    } else if(args[0] === 'all'){
        top(message,'all',10);
    } else {
        DNH(message,args[0]);
    }
}

async function DNH(message,link){
    try{
    let {body} = await superagent
        .get(`${link}.json`);
    let create = body.created_at.split('T');
    let update = body.last_posted_at.split('T');
    let embed = new Discord.RichEmbed()
      .setColor('#56afe2')
      .setTitle(body.title)
      .setDescription(`${body.post_stream.posts[0].cooked.replace(/<[^>]*>/g, '').split('\n')[0]}`)
      .setThumbnail(`https://daynhauhoc.com/${body.post_stream.posts[0].avatar_template.replace('{size}','360')}`)
      .addField('❯ ID: ', body.id)
      .addField('❯ Asker: ',body.post_stream.posts[0].name, true)
      .addField('❯ Replies: ',body.posts_count,true)
      .addField('❯ Views: ',body.views, true)
      .addField('❯ Likes: ',body.like_count,true)
      .addField('❯ Score: ',body.post_stream.posts[0].score, true)
      .addField('❯ Creation Date: ',`${create[0]} (${create[1].substring(0,create[1].length-5)})`)
      .addField('❯ Last Activity: ',`${update[0]} (${update[1].substring(0,update[1].length-5)})`)
    return message.channel.send(embed); 
    } catch(e){
      message.channel.send('Link không hợp lệ, bạn vui lòng thử lại!');
    }
}

async function top(message,time,length){
  try{
    let {body} = await superagent
          .get(`https://daynhauhoc.com/top/${time}.json`)
        let index = 0;
        let embed = new Discord.RichEmbed()
          .setTitle(`Top topics ${time}`)
        for(let i=0;i<length;i++){
            embed.addField(`${reaction_numbers[++index]} ${body.topic_list.topics[i].title} (ID: ${body.topic_list.topics[i].id})`,`Replies: ${body.topic_list.topics[i].posts_count-1} | Views: ${body.topic_list.topics[i].views}`)
        }
     return message.channel.send(embed);
  } catch(e){
      message.channel.send('Có lỗi xảy ra, bạn vui lòng thử lại sau!');
      console.log(e);
  }
}
module.exports.help = {
  name: 'dnh',
  category: 'Search', 
  description: 'Dùng để tìm kiếm thông tin trên https://daynhauhoc.com',
  usage: `do.dnh [link] dùng để xem thông tin topic trên diễn đàn
Ví dụ: do.dnh https://daynhauhoc.com/t/63869

do.dnh search [tên bài viết] dùng để tìm kiếm bài viết trên daynhauhoc
Ví dụ: do.dnh search Vào discord Daynhauhoc

do.dnh user [tên thành viên] dùng để tìm kiếm thành viên trên daynhauhoc
Ví dụ: do.dnh user trankhoa001

do.dnh [daily/week/month/quarter/year/all] dùng để xem top topics
Ví dụ: do.dnh daily`
}  
