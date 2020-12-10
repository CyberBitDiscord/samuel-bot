const Discord = require('discord.js')

exports.sendErrorToChannel = (msg, err) => {
    console.log(err)

    const channels = msg.guild.channels.cache.array()
    const errorChannel = channels.find(c => c.name === 'erros-samuel')

    if(!errorChannel) return

    
    const embed = new Discord.MessageEmbed()
    .setColor("#DC143C")
    .setTitle(err.name)
    .setDescription(err.stack)

    errorChannel.send(embed)
}