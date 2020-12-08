const Discord = require('discord.js')
const moment = require('moment')
require('moment-precise-range-plugin')

const userInfo = async ({ msg }) => {
    const { author: { id, username, discriminator, createdTimestamp }, guild:{ joinedTimestamp } } = msg

    const user = msg.author
    const profileImage = user.avatarURL()

    const createdDate = new Date(createdTimestamp)
    const joinedDate = new Date(joinedTimestamp)
    const today = new Date()

    const cratedAtDiff = moment.preciseDiff(createdDate, today, true)
    const joinedAtDiff = moment.preciseDiff(joinedDate, today, true)

    let cratedAt = cratedAtDiff.years ?  `${cratedAtDiff.years} ano${cratedAtDiff.years > 1 ? 's' : '' }` : ''
    cratedAt +=  cratedAtDiff.months ? ` ${cratedAtDiff.months} mes${cratedAtDiff.months > 1 ? 'es' : '' }` : ''
    cratedAt +=  cratedAtDiff.days ? ` ${cratedAtDiff.days} dia${cratedAtDiff.days > 1 ? 's' : '' }` : ''
    
    let joinedAt = joinedAtDiff.days ?  `${joinedAtDiff.days} dia${joinedAtDiff.days > 1 ? 's' : '' }` : ''
    joinedAt +=  joinedAtDiff.hours  ? ` ${ joinedAtDiff.hours} hora${ joinedAtDiff.hours > 1 ? 's' : '' }` : ''
    joinedAt +=  joinedAtDiff.minutes  ? ` ${ joinedAtDiff.minutes} minuto${ joinedAtDiff.minutes > 1 ? 's' : '' }` : ''


    const embed = new Discord.MessageEmbed()
    .setColor("#32CD32")
    .setTitle(`:crown: ${username}`)
    .addFields(
		{ name: ':bookmark: Tag do Discord', value: `${username}#${discriminator}`, inline: true },
        { name: ':computer: ID do Discord', value: id, inline: true },
        { name: ':date: Conta criada há', value: cratedAt, inline: true },
        { name: ':star2: Entrou há', value: joinedAt, inline: true }
    )
    .setThumbnail(profileImage)

    msg.channel.send(embed)

    return true
}

module.exports = userInfo