const inquirer = require('inquirer')
const axios = require('axios');

axios.get(`http://www.dnd5eapi.co/api/`)
  .then(function (response) {
    // handle success
    console.log(response);

  })



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

// module.exports = chooseRace()
module.exports = characterGen()