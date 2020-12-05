
const userInfo = require('./userInfo')
const serverInfo = require('./serverInfo')
const Help = require('./help');
const { play, skip, stop } = require('./playMusic')

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
    "cargos": {
        action: () => false,
        description: "+san cargos: exibe as informações de cargo do usuário"
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

exports.execute = args => {
   const commandToBeExecuted = commands[args.command]

   if(!commandToBeExecuted) return false
   
   return commandToBeExecuted.action({ ...args, commands })
}