
const userInfo = require('./userInfo')
const Help = require('./help');
const { play, skip, stop } = require('./playMusic')
module.exports = (function() {
    const commands =  {
        "Help": function(msg) {Help(commands, msg)},
        "Userinfo": userInfo,
        "Serverinfo": function() {console.log("serverinfo")},
        "Cargos": function() {console.log("cargos")},
        "p": play,
        "skip": skip,
        "stop": stop
    }

    function execute(command, msg, client) {
       const commandToBeExecuted = commands[command]
       if(!commandToBeExecuted) return false
       return  commandToBeExecuted(msg, client)
    }

    return {
        execute: execute
    }

})()