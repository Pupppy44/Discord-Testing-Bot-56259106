const Discord = require('discord.js')
const Client = new Discord.Client()
const Kprefix = "/"

Client.on('ready', ()=>{
    console.log("Bot is online, fellow.");

    Client.user.setPresence({ game: { name: 'members | /help', type: 2 } });

})

Client.on('message', (message)=>{
    if(!message.content.startsWith(Kprefix)) return;



    if(message.content.startsWith(Kprefix + "play")){
      const args = message.content.split(" ").slice(0);
        const ytdl = require('ytdl-core');
        const streamOptions = { seek: 0, volume: 1 };
        const voiceChannel = message.member.voiceChannel;
        if(!message.guild.name === "10K Development Services") return;
        if(!message.member.voiceChannel) return message.channel.send('```Please connect to a voice channel.```')
        if(!args[1]) return message.channel.send('Please enter a URL to play.')
        voiceChannel.join()
          .then(connection => {
            const stream = ytdl(args[1])
            const info = ytdl.getInfo(args[1]);
            const dispatcher = connection.playStream(stream, streamOptions);
            message.channel.send(`**Song now playing.**`)
          })
          .catch(console.error);
    
        }



    let targs = message.content.split(" ").slice(1);
  
  if(message.content.startsWith(Kprefix + "warn")){
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Sorry, but you don't have permission to use this!") 
     let warnedmember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(targs[0]);
      if(!warnedmember) return ("Please mention a user to warn.");
       let reason = targs.slice(1).join(' ');
      if(!reason) reason = "No reason provided";
     
        message.delete().catch(O_o=>{});
      message.channel.send(`***${warnedmember.user.tag} was warned!***`)
     warnedmember.send(`You have been warned in ${message.guild.name} by ${message.author.username} for: ${reason}.`)
     let ypurgeChannel = message.guild.channels.find(`name`, "10k-logging");
     if(!ypurgeChannel) return;

     const purgeembed = new Discord.RichEmbed()
     .setTitle('**Log**')
     .setDescription('*Warn*')
     .addField(`Warned by:`, `${message.author.tag}`)
     .addField(`Reason:`, `${reason}`)
     .setColor('RANDOM')
     ypurgeChannel.send(purgeembed)
    
    }


if(message.content.startsWith(Kprefix + "stop")){
    if(!message.guild.name === "10K Development Services") return;
  if(!message.member.voiceChannel) return message.channel.send('```You need to be in a voice channel to stop music.```')
  message.member.voiceChannel.leave();
  message.channel.send("Stopped. :thumbsup:")


}

if(message.content.startsWith(Kprefix + "disconnect")){
    if(!message.guild.name === "10K Development Services") return;
  if(!message.member.voiceChannel) return message.channel.send('```You must be in a voice channel to make me leave a channel.```')
  message.member.voiceChannel.leave();
  message.channel.send("**Disconnected!** :thumbsup:")
}

if(message.content.startsWith(Kprefix + "connect")){
    if(!message.guild.name === "10K Development Services") return;
  if(!message.member.voiceChannel) return message.channel.send('```You must be in a voice channel to make me connect to a channel.```')
  message.member.voiceChannel.join();
  message.channel.send('**Connected!** :thumbsup:')

}

if(message.content.startsWith(Kprefix + "ban")){
    //if(!message.guild.name === "10K Development Services") return;
    const banembed = new Discord.RichEmbed()
    .setDescription("- Ban -")
    .setColor('RANDOM')
    .addField(`Successfully banned:`, `${message.user.tag}`)
    .addField(`Banned by:`, `${message.author.username}`)
    .addField(`Reason:`, `${reason}`)
  
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('```You do not have permissions to ban members.```')
   // if(message.author.id("306767358574198786")) return message.channel.send('```You do not have permissions to ban members.```')
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);

      let reason = args.slice(1).join(' ');
      if(!reason) reason = "No reason provided";
      // If the member is in the guild
      if (member) {

        member.ban({
          reason: `Banned by: ${message.author.username} for: ${reason}`,
        }).then(() => {
          // We let the message author know we were able to ban the person
          message.reply({embed: banembed});
        }).catch(err => {

          message.reply('```I was unable to ban the member.```');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('```That user is not in this guild!```');
      }
    } else {
    // Otherwise, if no user was mentioned
      message.reply('```You did not mention the user to ban!```');
    }
  }

  if(message.content.startsWith(Kprefix + "kick")){
    if(!message.guild.name === "10K Development Services") return;
    const kickembed55 = new Discord.RichEmbed()
    .setDescription(" - Kick -")
    .setColor('RANDOM')
    .addField(`Successfully kicked:`, `${member.tag}`)
    .addField(`Kicked by:`, `${message.author.username}`)
    .addField(`Reason:`, `${reason}`)
   if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('```You do not have permissions to kick members.```')
   const user = message.mentions.users.first();

   let reason = args.slice(1).join(' ');
   if(!reason) reason = "No reason provided";

   // Assuming we mention someone in the message, this will return the user
   // If we have a user mentioned
   if (user) {
     // Now we get the member from the user
     const member = message.guild.member(user);
     // If the member is in the guild
     if (member) {
       /**
        * Kick the member
        * Make sure you run this on a member, not a user!
        * There are big differences between a user and a member
        */
       member.kick(`Kicked by: ${message.author.username} for: ${reason}`).then(() => {
         // We let the message author know we were able to kick the person
         message.reply({embed: kickembed55});
         let kickoChannel = message.guild.channels.find(`name`, "10k-logging");
         const kickoembed = new Discord.RichEmbed()
         .setTitle('**Log**')
         .setDescription('*Kick*')
         .addField(`Kicked member: ${member}`)
         .addField(`Kicked by: ${message.author.tag}`)
         .addField(`Reason: ${reason}`)
         .setColor('RANDOM')
         kickchannel.send(kickoembed)

       }).catch(err => {
         // An error happened
         // This is generally due to the bot not being able to kick the member,
         // either due to missing permissions or role hierarchy
         message.reply('```I was unable to kick the member.```');
         // Log the error
         console.error(err);
       });
     } else {
       // The mentioned user isn't in this guild
       message.reply('```That user is not in this guild.```');
     }
   // Otherwise, if no user was mentioned
   } else {
     message.reply('```You did not mention the user to kick.```');
   
 
   }
 }

 if(message.content.startsWith(Kprefix + "purge")){
   // if(!message.guild.name === "10K Development Services") return;
   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do not have permission to purge messages.");
        
    let args = message.content.split(" ").slice(1);

    if(args >= 100) return message.channel.send("You can only delete 100 messages or less.")
        
    if(!args[0]) return message.channel.send("Please enter an amount of messages to purge.")
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`${args[0]} messages purged.`);
        let purgeChannel = message.guild.channels.find(`name`, "10k-logging");
        const purgeembed = new Discord.RichEmbed()
        .setTitle('**Log**')
        .setDescription('*Purge*')
       //.addField(`Purge by: ${message.author.tag}`)
        .addField(`Purge by:`, `${message.author.tag}`)
      //  .addField(`Messages cleared: ${args}`)
        .addField(`Messages cleared:`, `${args}`)
        .setColor('RANDOM')
        purgeChannel.send(purgeembed)
    })

  }

  if(message.content.startsWith(Kprefix + "info")){
    message.channel.send('This is a bot made by Pupppy44#1606 for 10K Development.')


  }

  if(message.content.startsWith(Kprefix + "help")){
    const helpembedo = new Discord.RichEmbed()
    .setTitle('**Help**')
    .setDescription('*Commands*\n')
    .addField('**/help\n/info\n/play\n/connect\n/disconnect\n/stop\n/kick\n/ban\n/purge\n/warn**')
    message.channel.send(helpembedo)
  
  }

  if(message.content.startsWith(Kprefix + "roles")){
    const roleembed = new Discord.RichEmbed()
    .setTitle('**Server Roles**')
    .addField('**Owner/Founder**, **Co-owner/Founder**, Staff, Bots\nServer Developer, Badge Maker, Bot Developer, CAD Developer\nWebsite Developer, Logo Developer\nAdvertiser, Customer, Muted')
    .setColor('RANDOM')
    message.channel.send(roleembed)

  }




})

Client.login(process.env.BOT_TOKEN)
