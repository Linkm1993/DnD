const axios = require('axios');
const fs = require('fs')
const d20 = require('d20');
const dicerolls = require('./assests/dicerolls.js')
const statPlacement = require('./assests/questions.js')
const inquirer = require('inquirer')



axios.get(`http://www.dnd5eapi.co/api/`)
  .then(function (response) {
    // handle success
    // console.log(response);

  })

  