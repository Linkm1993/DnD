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

        }
    ]
}