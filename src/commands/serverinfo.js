const Discord = require('discord.js');

const serverInfo = ({ msg }) => {
    const date = new Date(msg.guild.createdAt)
    const createdAt = new Date(msg.guild.createdTimestamp)
    const month = date.toLocaleDateString('en-US', {dateStyle: 'medium'}).split(' ')[0]
    
    const dateString = `${date.getDay()} de ${month} ás, ${date.getHours()}:${date.getMinutes()}
    (${createdAt.getHours()} horas ${createdAt.getMinutes()} minutos 
    ${createdAt.getSeconds()} segundos) `

    const memberOfTheGuild = msg.guild.memberCount
    let textChannelNumber = 0
    let voiceChannelNumber = 0

    msg.channel.guild.channels.cache.forEach(value => {
        if(Object(value).type === 'text') textChannelNumber += 1;
        if(Object(value).type === 'voice') voiceChannelNumber += 1;
    })
    
    embed = new Discord.MessageEmbed()
    .setColor("#5c0fd9")
    .setTitle("Samuel hackiou essas infos :eyes: ")
    .addFields(
        { name: ':computer: ID', value: `${msg.guild.id}`, inline: true },
        { name: ':crown: Dono', value: `**${msg.guild.owner ? msg.guild.owner : 'Não econtrei :('}**`, inline: true },
        { name: ':earth_americas: Região', value: `${msg.guild.region}`, inline: true },
        { name: `:speech_balloon: Canais (${textChannelNumber + voiceChannelNumber})`, value: `:pencil: **Texto**: ${textChannelNumber} \n :speaking_head: **Voz**: ${voiceChannelNumber} \n`, inline: true },
        { name: ':date: Criado em', value: `${dateString}`, inline: true },
        { name: ':busts_in_silhouette: Membros ', value: `${memberOfTheGuild}`, inline: true },
    )

    msg.channel.send(embed)

    return true
}

module.exports = serverInfo