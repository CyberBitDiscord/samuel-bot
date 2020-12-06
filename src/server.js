const Discord = require('discord.js');
const { execute } = require('./commands')
const { token } = require('../bot.config.json')
const { prefix } = require('../config.json')
const client = new Discord.Client();
//Mensagem quando um boot entrar no servidor
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//Quando for digitado no chat 
client.on('message', async msg => {
  if (msg.content.startsWith(prefix)) {
    const command = msg.content.split(' ')[1]
    const commandReturn = execute({ command, msg })
  
    if(!commandReturn) {
      msg.channel.send(`O comando ${command} não existe!`)
    } else if(commandReturn === 401) {
      msg.channel.send(`Você não tem permissão para usar esse comando!`)
    }

  } else if(msg.reference) {
    const msgRef = await msg.channel.messages.fetch(msg.reference.messageID)

    if(!msgRef.author === 'Samuel Bot') return
    const command = msgRef.embeds[0].title

    const commandReturn = execute({ command, msg, msgRef})
  
    if(!commandReturn) {
      msg.channel.send(`Não entendi a resposta!`)
    } else if(commandReturn === 403) {
      msg.channel.send(`Você não tem permissão para usar esse comando!`)
    }
  }

  return
});

//Message quando o bot disconectar
client.on('disconnect', () => {
  ''
})

client.login(token);