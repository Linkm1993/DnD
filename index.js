//setting libaries
const fs = require('fs')
const d20 = require('d20');
const inquirer = require('inquirer')
const axios = require('axios');
let character = {}

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
        type: 'input',
        name: 'charName',
        message: "Enter your character's name",
    },
    {  type: 'list',
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
            //array for race ability bonus
            raceAbilityBonus = []

            let charSpeed = response.data.speed

            //for loop grabbing trait names
            for (i = 0; i<response.data.traits.length; i++ ){
                traits.push(response.data.traits[i].name)

            }

            //grabbing prof names
            for (i = 0; i < response.data.starting_proficiencies.length; i++){
                raceProficiencies.push(response.data.starting_proficiencies[i].name)
            }
            //grabbing race abilitie bonus
            for (i = 0; i < response.data.ability_bonuses.length; i++){
                raceAbilityBonus.push(`${response.data.ability_bonuses[i].name}: ${response.data.ability_bonuses[i].bonus}`)
            }
            
            //addig speed
            character.speed = charSpeed
            //adding traits to character object
            character.traits = traits
            //adding starting profs to character object
            character.raceProficiencies = raceProficiencies
            //adding racial ability bous to character object
            character.raceAbilityBonus = raceAbilityBonus

            axios.get(`https://www.dnd5eapi.co/api/classes/${userClass}`)
            .then(function (classResponse) {
                // console.log(classResponse.data)
                //Setting class hitdice, saving throws
                let hitDice = `d${classResponse.data.hit_die}`
                let savingThrows = []
                //Grabbig the saving throws for specified class
                for (i = 0; i < classResponse.data.saving_throws.length; i++){
                    let grabSaving = classResponse.data.saving_throws[i].name
                    savingThrows.push(grabSaving)
                }

                character.hitdice = hitDice
                character.savingThrows = savingThrows
            })
            //setting a empty string to be modified based on the user's class to make the equipment api call
                let equimentNumber = ""
                function findEquipNumber(){
                    if (userClass === 'barbarian'){
                        equimentNumber = "1"
                    }
                    else if (userClass === "bard"){
                        equimentNumber = "2"
                    }
                    else if (userClass === "cleric"){
                        equimentNumber = "3"
                    }
                    else if (userClass === "druid"){
                        equimentNumber = "4"
                    }
                    else if (userClass === "fighter"){
                        equimentNumber = "5"
                    }
                    else if (userClass === "monk"){
                        equimentNumber = "6"
                    }
                    else if (userClass === "paladin"){
                        equimentNumber = "7"
                    }
                    else if (userClass === "ranger"){
                        equimentNumber = "8"
                    }
                    else if (userClass === "rogue"){
                        equimentNumber = "9"
                    }
                    else if (userClass === "sorcerer"){
                        equimentNumber = "10"
                    }
                    else if (userClass === "warlock"){
                        equimentNumber = "11"
                    }
                    else{
                        equimentNumber ="12"
                    }
                }
            
                findEquipNumber()

                //axios call for starting equipment
                axios.get(`https://www.dnd5eapi.co/api/starting-equipment/${equimentNumber}`)
                .then(function (equipResponse) {
                    // console.log(equipResponse.data)
                    let startingEquipment = []
                    for (i =0; i <  equipResponse.data.starting_equipment.length; i++){

                        startingEquipment.push(JSON.stringify(equipResponse.data.starting_equipment[i].item.name))
                    }
                    character.startingEquipment = startingEquipment
                    console.log(character)
                })

            })
      });
}

generateCharacter()