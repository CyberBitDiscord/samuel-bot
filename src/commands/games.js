const Discord = require('discord.js');
const { play } = require('./playMusic');

const games = new Map();

const evenOrODD = msg => {
    const user1ID = msg.content.split(' ')[3]
    const user2ID = msg.content.split(' ')[4]

    const choice = msg.content.split(' ')[5]

    const user1 = msg.guild.members.cache.get(user1ID.replace(/[^0-9]/gi, ''))
    const user2 = msg.guild.members.cache.get(user2ID.replace(/[^0-9]/gi, ''))
    
    const id = Math.random().toString(36).substr(2, 9)
    const game = {
        users: new Object,
        channel: msg.channel
    }

    game.users[user1.id] = {
        choice,
        user: user1,
        val: null
    }
    
    game.users[user2.id] = {
        choice: choice === 'par' ? 'ímpar' : 'par',
        user: user2,
        val: null
    }

    games.set(id, game);
    
    //melhorar
    const embed1 = new Discord.MessageEmbed()
    .setColor("#DC143C")
    .setTitle(`Jogo par ou ímpar:`)
    .setDescription(`${user1.user.username} clique em responder e escolha um número: `)
    .setFooter(id)

    const embed2 = new Discord.MessageEmbed()
    .setColor("#DC143C")
    .setTitle(`Jogo par ou ímpar:`)
    .setDescription(`${user2.user.username} clique em responder e escolha um número: `)
    .setFooter(id)
    
    user1.send(embed1)
    user2.send(embed2)
}

exports.evenOrODDResult = ({ msg, msgRef }) => {
    const text = msgRef.embeds[0].footer.text
    const game = games.get(text)
    const response = parseInt(msg.content)
    const userId = msg.author.id

    game.users[userId].val = response

    const usersInGame = Object.keys(game.users)
    const user1 = game.users[usersInGame[0]]
    const user2 = game.users[usersInGame[1]]
    if(user1.val && user2.val) {
        const number = user1.val + user2.val
        const result = number % 2 == 0 ? 'par' : 'ímpar'

        game.channel.send(`${result} o ganhador é ${user1.choice === result ? user1.user : user2.user }`)
    }

    return true
}

exports.playGame = ({ msg }) => {
    const game = msg.content.split(' ')[2]

    if(game === 'parouimpar') {
        evenOrODD(msg)
    }

    return true
}