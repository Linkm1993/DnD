const axios = require('axios');
const fs = require('fs')
const inquirer = require('inquirer');
const d20 = require('d20');


axios.get(`http://www.dnd5eapi.co/api/`)
  .then(function (response) {
    // handle success
    console.log(response);
  })