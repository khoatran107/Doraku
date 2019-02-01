module.exports.run = function(bot, message, args) {
    let blank=":black_heart:", heart=":heart:", fill=":black_heart:";
    let n = 9;
    let caunoi = "";
    
    if (args.length > 0)
    {
        n = parseInt(args[0]);
        caunoi = "Love you more than I can say \:heart: \n" + draw_heart_coor(n, blank=":black_heart:", heart=":heart:", fill=":black_heart:");
    }else {
        n = parseInt(9);
        caunoi = "Are you ready for loveeee \:kissing_heart: \n" + 
        ":heart: :yellow_heart: :green_heart: :blue_heart: :purple_heart: \n" +
        ":yellow_heart: :green_heart: :blue_heart: :purple_heart: :heart: \n" +
        ":green_heart: :blue_heart: :purple_heart: :heart: :yellow_heart: \n" +
        ":blue_heart: :purple_heart: :heart: :yellow_heart: :green_heart: \n" +
        ":purple_heart: :heart: :yellow_heart: :green_heart: :blue_heart: \n";
    } 
    if (n <= 4 || n >= 13) return message.channel.send("Bạn nhập một số từ 5 đến 12 thôi !");
    message.channel.send(caunoi);
}
module.exports.help = {
    name : "love",
    category: 'Fun',
    description: 'Dùng để thể hiện tình cảm của bạn với người khác :)',
    usage: 'do.love'
}
function draw_heart_coor(n, blank=":black_heart:", heart=":heart:", fill=":black_heart:")
{
    let res = "";
    if (n % 2 === 1)
	{
        X = Math.round((n - 1) / 2);

        for (let y = X; y >= -X ; y--)
        {
            for (let x = -X; x <= X; x++)
				{
                if ( y > 0) {
                    if (X >= 4) 
                    {
                        if (((x=== -X+1 || x === 0 || x === X-1) && y === X - 1) || (y === X &&Math.abs(x) > 0 && Math.abs(x) <=  X - 2) || (Math.abs(x) === X &&y > 0 && y <= X - 2))
							res += heart;
						else if (((x=== -X+1 || x === 0 || x === X-1) && y < X - 1) || (Math.abs(x) > 0 && Math.abs(x) <=  X - 2 && y < X) || (Math.abs(x) < X &&y > 0 && y <= X - 2))  // inner fill
							res += fill;
						else
							res += blank;
                    }
					else{
                        if ((x === 0 && y === X - 1) || (y === X &&Math.abs(x) > 0 && Math.abs(x) <= X - 1) || (Math.abs(x) === X && y > 0 && y <= X - 1))
							res += heart;
						else if ((x === 0 && y < X - 1) || ( Math.abs(x) >0 && Math.abs(x) <= X - 1 && y < X) || (Math.abs(x) < X && y > 0 && y <= X - 1))  // inner fill
							res += fill;
						else
							res += blank;
                    }  // case 2
                    
                }
					
				else  // lower part of the heart  // y <= 0
					if ((Math.abs(x) + Math.abs(y)) === X)
						res += heart;
					else if ((Math.abs(x) + Math.abs(y)) < X)  // inner fill
						res += fill;
					else // outside
						res += blank;
                }
			res += "\n";
        }
    }
			
    else
    {
        X =  Math.round( n / 2);
        for (let y = X; y >= -X; y--)
        {
            if (y !== 0)
            {
                for (let x = -X; x <= X; x++)
				{
                    if (x !== 0 )
                    {
                        if (y > 0)  // upper part of the heart
						{
                            if (X > 4)  // case 1
							{
                                if (((Math.abs(x) === 1 || Math.abs(x) === X-1) && y === X - 1) || (y === X && 1 < Math.abs(x) && Math.abs(x) <= X - 2) || (Math.abs(x) === X && y >= 1 && y <= X - 2))
									res += heart;
								// else if (y < X && 1 <= Math.abs(x) <= X - 2) || (Math.abs(x) < X && y >= 1 && y <= X - 2):  // inner fill
								else if (((Math.abs(x) === 1 || Math.abs(x) === X-1)   && y < X - 1) || (1 < Math.abs(x) && Math.abs(x) <= X - 2 && y < X))  // inner fill
									res += fill;
								else
									res += blank;
                            }
							else  // case 2
							{
                                if ((Math.abs(x) === 1 && y === X - 1) || (y === X && 1 < Math.abs(x) && Math.abs(x) <= X - 1) || (Math.abs(x) === X && y >= 1 && y <= X - 1))
									res += heart;
								// else if (y < X && 1 <= Math.abs(x) <= X - 1) || (Math.abs(x) < X && y >= 1 && y <= X - 1):  // inner fill
								else if ((Math.abs(x) === 1 && y < X - 1) || (1 < Math.abs(x) && Math.abs(x) <= X - 1 && y < X))  // inner fill
									res += fill;
								else
									res += blank;
                            }
                        }
						else  // lower part of the heart  // y < 0
						{
                            if (Math.abs(x) + Math.abs(y) === X + 1)
								res += heart;
							else if (Math.abs(x) + Math.abs(y) < X + 1)  // inner fill
								res += fill;
							else// outside
								res += blank;
                        }
                    }
                }
				res += "\n";
            }
				
        }
			
    }
    return res;
}  // 5 <= n <= 12
