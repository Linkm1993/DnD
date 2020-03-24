const d20 = require('d20');
let abilityRolls = []

function abilityScoreRoll(){
    let score = d20.roll('4d6')
    abilityRolls.push(score)
}

for (i = 0; i < 6; i++){
    abilityScoreRoll()
}

console.log(abilityRolls)

module.exports = abilityScoreRoll()