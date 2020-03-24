const d20 = require('d20');
let abilityRolls = []

function abilityScoreRoll(){
    let score = d20.roll('4d6')
    abilityRolls.push(score)
}

function rollingAS(){
    for (i = 0; i < 6; i++){
        abilityScoreRoll()
    }
}

rollingAS()

console.log(abilityRolls)


module.exports = rollingAS()