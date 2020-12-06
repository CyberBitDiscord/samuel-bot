
const Discord = require('discord.js');


const createDescription = (roles, user) => `
${roles.map((r, i) => `${i}: ${r[1].name} \n`)}
${user}
`.replace(/\,/g, '')

const getRoles = msg => Array.from(msg.guild.roles.cache)

exports.showRoles = ({ msg }) => {
    const roles = getRoles(msg)
    const userId = msg.content.split(' ')[2]
    const user = msg.guild.members.cache.get(userId.replace(/[^0-9]/gi, ''))
    const registerRole = roles.filter(r => r[1].name === 'Registrador')
    
    if(!user._roles.find(r => r === registerRole[0][0])) return 401

    const description = createDescription(roles, user)

    const embed = new Discord.MessageEmbed()
    .setColor("#DC143C")
    .setTitle(`Responda com o número para dar o cargo:`)
    .setDescription(description)
    msg.channel.send(embed)

    return true
}

exports.register = ({ msg, msgRef }) => {
    const roles = getRoles(msg)
    const role = roles[msg.content]
    if(!role) return false

    const user = msg.guild.members.cache.get(msg.author.id)
    user.roles.add(role)
    msg.channel.send(`Adicionei o cargo ${role[1].name} para o(a) ${user.user.username}`)

    return true
}