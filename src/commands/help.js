const Discord = require('discord.js');

const help = ({ commands, msg }) => {
    const commandsList = Object.keys(commands).map(c => `${commands[c].description} \n`)
dddd
    embed = new Discord.MessageEmbed()
      .setColor("#5c0fd9")
      .setTitle("Help")
      .setDescription(commandsList)

    msg.channel.send(embed)

    return true
}

module.exports = help