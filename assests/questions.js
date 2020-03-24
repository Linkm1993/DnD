const inquirer = require('inquirer')

function enterAbilityScores(){
    const questions = [
        {
            type: 'input',
            name: 'STR',
            message: "Enter value for your character's Strength"

        },
        {
            type: 'input',
            name: "DEX",
            message: "Enter value for your characters Dexterity"

        },
        {
            type: 'input',
            name: 'CON',
            message: "Enter value for your character's Constitution"

        },
        {
            type: 'input',
            name: 'WIS',
            message: "Enter value for your character's Wisdom"
        },
        {
            type: 'input',
            name: 'INT',
            message: "Enter value for your character's Intelligence"
        },
        {
            type: 'input',
            name: 'CHA',
            message: "Enter value for your character's Charisma"
        }
    ]

    inquirer.prompt(questions).then(answers => {
        console.log(JSON.stringify(answers, null, '  '));
      });
}


module.exports = enterAbilityScores()