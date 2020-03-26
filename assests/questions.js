const inquirer = require('inquirer')
const axios = require('axios');
let character = []

axios.get(`http://www.dnd5eapi.co/api/`)
  .then(function (response) {
    // handle success
    // console.log(response);

  })

//Going to have to cast race and class into lower case for api call

function characterGen(){
    const questions = [
    {
        type: 'list',
        name: 'race',
        message: 'Please select a race',
        choices: [
            'Dragonborn',
            'Dwarf',
            'Elf',
            'Gnome',
            'Half Elf',
            'Half Orc',
            'Halfling',
            'Human',
            'Tiefling'
        ]
    },
    {
        type: 'list',
        name: 'class',
        message: 'Please select a class',
        choices: [
            'Barbarian',
            'Bard',
            'Cleric',
            'Druid',
            'Fighter',
            'Monk',
            'Paladin',
            'Ranger',
            'Rogue',
            'Sorcerer',
            'Warlock',
            'Wizard'
        ]
    },

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
        // console.log(JSON.stringify(answers, null, '  '));
        character.push(answers)
        console.log(character)
      });
}

// module.exports = chooseRace()
module.exports = characterGen()
module.exports = character