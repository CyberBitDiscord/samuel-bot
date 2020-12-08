
const userInfo = require('./userInfo')
const serverInfo = require('./serverInfo')
const Help = require('./help');
const { play, skip, stop } = require('./playMusic')
const { showRoles, register } = require('./register')
const { playGame, evenOrODDResult } = require('./games')

const commands = {
    "help": {
        action: Help,
        description:'+san help: mostra todos os comandos disponíveis'
    },
    "userinfo": {
        action: userInfo,
        description: "+san userinfo: exibe as informações de usuários"
    },
    "serverinfo": {
        action: serverInfo,
        description: "+san serverinfo: exibe as informações do servidor"
    },
    "registrar": {
        action: showRoles,
        description: "+san registrar @user: abre um painel para dar cargos ao usuário selecionado"
    },
    "jogar": {
        action: playGame,
        description: "+san registrar @user: abre um painel para dar cargos ao usuário selecionado"
    },
    "p": {
        action: play,
        description: "+san cargos: exibe as informações de cargo do usuário"
    },
    "skip": {
        action: skip,
        description: "+san cargos: exibe as informações de cargo do usuário"
    } ,
    "stop": {
        action: stop,
        description: "+san cargos: exibe as informações de cargo do usuário"
    }
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