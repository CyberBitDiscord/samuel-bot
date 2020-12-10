
const meme = require('./meme')
const userInfo = require('./userInfo')
const serverInfo = require('./serverinfo')
const Help = require('./help');
const { play, skip, stop } = require('./playMusic')
const { showRoles, register } = require('./register')
const { playGame, evenOrODDResult } = require('./games')

const commands = {
    "-help": {
        action: Help,
        description:'-help: mostra todos os comandos disponíveis'
    },
    "-userinfo": {
        action: userInfo,
        description: "-userinfo: exibe as informações de usuários"
    },
    "-serverinfo": {
        action: serverInfo,
        description: "-serverinfo: exibe as informações do servidor"
    },
    "-registrar": {
        action: showRoles,
        description: "-registrar @user: abre um painel para dar cargos ao usuário selecionado"
    },
    "-jogar": {
        action: playGame,
        description: "-jogar nome do jogo: inicia um jogo. Jogos atuais: parouimpar"
    },
    "-p": {
        action: play,
        description: "-p nomedamusica: toca uma música com a melhor pesquisa para aquele nome"
    },
    "-skip": {
        action: skip,
        description: "-skip: pula a música tocando atualmente"
    } ,
    "-stop": {
        action: stop,
        description: "-stop: para de tocar todas as músicas"
    },
    "-meme": {
        action: meme,
        description: "-meme: Gera memes, para maiores informações sobre os templates utilize o comando"
    },
}
const replys = {
    "Responda com o número para dar o cargo:": {
        action: register,
        description: "Adiciona a role no usuário"
    },
    "Jogo par ou ímpar:": {
        action: evenOrODDResult,
        description: "Resultado do par ou impar"
    }
}

exports.execute = args => {
   const commandToBeExecuted = commands[args.command] || replys[args.command]

   if(!commandToBeExecuted) return false
   
   return commandToBeExecuted.action({ ...args, commands })
}