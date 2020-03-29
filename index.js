//setting libaries
const fs = require('fs')
const d20 = require('d20');
const inquirer = require('inquirer')
const axios = require('axios');

//Character array that will be used to pass user inputs into fs write


//ability score array
let abilityRolls = []

//calling d20 to roll unique dice
function abilityScoreRoll(){
    let score = d20.roll('4d6')
    abilityRolls.push(score)
}

// function for rolling the dice 6 times
function rollingAS(){
    for (i = 0; i < 6; i++){
        abilityScoreRoll()
    }
}

//calling the dice rolls
rollingAS()

//displaying the user's rolls to the console so they can enter them
console.log(`Your ability score rolls [${abilityRolls}]`)

//Grabs desired race, class, and stat values and then pushes them to the character array
function generateCharacter(){
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
            'Half-Elf',
            'Half-Orc',
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

        //Adding inquirer anwsers to character variable
        character = answers

        //grabbing race value to pass into api call
        let race = character.race.toLowerCase()
        let userClass = character.class.toLowerCase()

        //DND 5e API call for race
        axios.get(`https://www.dnd5eapi.co/api/races/${race}`)
        .then(function (response) {
            // console.log(response.data.starting_proficiencies)
            //array for traits
            traits = []
            //array for starting proficiencies
            raceProficiencies = []

            //for loop grabbing trait names
            for (i = 0; i<response.data.traits.length; i++ ){
                traits.push(response.data.traits[i].name)

            }

            //grabbing prof names
            for (i = 0; i < response.data.starting_proficiencies.length; i++){
                raceProficiencies.push(response.data.starting_proficiencies[i].name)
            }
            
            //adding traits to character object
            character.traits = traits
            //adding starting profs to character object
            character.raceProficiencies = raceProficiencies

            axios.get(`https://www.dnd5eapi.co/api/classes/${userClass}`)
            .then(function (classResponse) {
                // console.log(classResponse.data)
                console.log(character)
                let hitDice = `d${classResponse.hit_die}`
            })
        })
      });
}

generateCharacter()