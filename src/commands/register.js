
const Discord = require('discord.js');

const filterAdm = roles => roles.filter(r => !new Discord.BitField(r[1].permissions.bitfield).has(8) && r[1].name !== '@everyone')

const createDescription = (roles, user) => `
${roles.map((r, i) => `${i}: ${r[1].name} \n`)}
${user}
`.replace(/\,/g, '')

const getRoles = msg => Array.from(msg.guild.roles.cache)

exports.showRoles = ({ msg }) => {
    const roles = filterAdm(getRoles(msg))
    const userId = msg.content.split(' ')[2]
    const user = msg.guild.members.cache.get(userId.replace(/[^0-9]/gi, ''))
    const author = msg.guild.members.cache.get(msg.author.id)
    const registerRole = roles.find(r => r[1].name === 'Registrador')

    if(!registerRole) {
        msg.channel.send(`O cargo de Registrador ainda não existe`)
        return true
    }

    if(!author._roles.find(r => r === registerRole[0][0])) return 401

    const description = createDescription(roles, user)

    const embed = new Discord.MessageEmbed()
    .setColor("#DC143C")
    .setTitle(`Responda com o número para dar o cargo:`)
    .setDescription(description)
    msg.channel.send(embed)

    return true
}

exports.register = ({ msg, msgRef }) => {
    const roles = filterAdm(getRoles(msg))
    const role = roles[msg.content]
    if(!role) return false

    const user = msg.guild.members.cache.get(msg.author.id)
    user.roles.add(role)
    msg.channel.send(`Adicionei o cargo ${role[1].name} para o(a) ${user.user.username}`)

    return true
}