const d20 = require('d20');

function abilityScoreRoll(){
    let score = d20.verboseRoll('4d6')
    return `These are your dice rolls: [${score}]`
}

abilityScoreRoll()

module.exports = abilityScoreRoll()
