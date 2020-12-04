const Discord = require('discord.js');

const userInfo = async (msg) => {
    const { author: { id, username, discriminator } } = msg

    const user = msg.author
    const profileImage = user.avatarURL()

    const embed = new Discord.MessageEmbed()
    .setColor("#32CD32")
    .setTitle(":crown: Eich")
    .addFields(
		{ name: ':bookmark: Tag do Discord', value: `${username}#${discriminator}`, inline: true },
        { name: ':computer: ID do Discord', value: id, inline: true },
        { name: ':date: Conta criada há', value: '1 ano 10 meses 5 dias', inline: true },
        { name: ':star2: Entrou há', value: '22 horas 38 minutos 36 segundos', inline: true }
    )
    .setThumbnail(profileImage)

    msg.channel.send(embed)
}

module.exports = userInfo