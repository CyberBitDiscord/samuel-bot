const Discord = require('discord.js');

function help(commands, msg) {
    let commandWithDescription = []
    Object.keys(commands).map(command => setDescription(command, commandWithDescription))
    let commandWithDescriptionString = ""

    commandWithDescription.forEach(command => {
        commandWithDescriptionString += `${command.command}: ${command.description} \n`
    })

    embed = new Discord.MessageEmbed()
      .setColor("#5c0fd9")
      .setTitle("Help")
      .setDescription(commandWithDescriptionString)

    msg.channel.send(embed)
}
function setDescription(command, commandWithDescription) {
    const commandDescription = {
        Help: 'O comando Help mostra todos os comandos disponíveis',
        Userinfo: "O comando Userinfo devolve as informações de usuários",
        Serverinfo: "O comando Serverinfo devolve as informações do servidor",
        Cargos: "O comando Cargo exibe as informações de cargo do usuário",
        p: "toca uma musica no atual canal de voz, ex: +sam p rebola pro pai",
        skip: "pula a música atual",
        stop: "para de tocar a música",
    }
    const description = commandDescription[command]
    commandWithDescription.push({command: command, description: description ||  ''})
}
module.exports = help